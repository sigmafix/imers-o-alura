document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton'); // Pega o novo botão
    const cardContainer = document.getElementById('card-container');
    const loader = document.getElementById('loader');
    const initialContent = document.querySelector('.egypt-article');
    const themeToggle = document.getElementById('theme-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const clockElement = document.getElementById('clock');
    const historyContainer = document.getElementById('history-container');
    const historyList = document.getElementById('history-list');
    const backgroundMusic = document.getElementById('background-music');
    let allData = []; // Variável para armazenar os dados do JSON

    // --- Lógica de Busca ---
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            loader.style.display = 'none';
            renderHistory(); // Renderiza o histórico assim que os dados carregam
            initialContent.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            loader.innerHTML = 'Erro ao carregar dados. Tente novamente mais tarde.';
        });

    // Função de Debounce: Atrasa a execução de uma função para evitar sobrecarga
    let debounceTimeout;
    function debounce(func, delay) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(func, delay);
    }

    // Função principal de busca
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Função para remover acentos de uma string
        const normalizeString = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        const normalizedSearchTerm = normalizeString(searchTerm);

        if (searchTerm.length > 0) {
            initialContent.style.display = 'none'; // Esconde o conteúdo inicial
            historyContainer.style.display = 'none'; // Esconde o histórico
            cardContainer.style.display = 'grid'; // Mostra o container de cards

            const filteredData = allData.filter(item => {
                const normalizedItemName = normalizeString(item.nome.toLowerCase());
                // CORREÇÃO: Usando 'descricao' (minúsculo) em vez de 'Descrição'
                const normalizedItemDesc = normalizeString(item.descricao.toLowerCase());
                // MELHORIA: Buscando também nas tags
                const tagsMatch = item.tags.some(tag => normalizeString(tag.toLowerCase()).includes(normalizedSearchTerm));

                return normalizedItemName.includes(normalizedSearchTerm) || normalizedItemDesc.includes(normalizedSearchTerm) || tagsMatch;
            });

            // Salva no histórico apenas se a busca retornar resultados
            if (filteredData.length > 0) {
                saveSearchTerm(searchTerm);
            }
            renderCards(filteredData);
        } else {
            cardContainer.innerHTML = '';
            cardContainer.style.display = 'none';
            initialContent.style.display = 'block'; // Mostra o conteúdo inicial se a busca estiver vazia
            renderHistory(); // Mostra o histórico se a busca estiver vazia
        }
    };

    // --- Eventos de Busca ---
    searchInput.addEventListener('input', () => {
        // Usa o debounce para buscar 300ms após o usuário parar de digitar
        debounce(performSearch, 300);
    });

    searchButton.addEventListener('click', performSearch); // Busca ao clicar no botão

    searchInput.addEventListener('keyup', (event) => { // Busca ao pressionar Enter
        if (event.key === 'Enter') performSearch();
    });

    function renderCards(data) {
        cardContainer.innerHTML = '';
        if (data.length === 0) {
            cardContainer.innerHTML = '<p class="not-found">Nenhum resultado encontrado.</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card'; // Usa a classe 'card' para estilização
            card.innerHTML = /*html*/`
                <h3>${item.nome}</h3>
                {/* CORREÇÃO: Usando 'descricao' (minúsculo) */}
                <p>${item.descricao}</p>
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="egypt-button">Saiba Mais</a>
            `;
            cardContainer.appendChild(card);
        });
    }

    // --- Lógica do Tema Escuro ---
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        // Salva a preferência no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Verifica a preferência de tema ao carregar a página
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // --- Lógica da Música ---
    const toggleMusic = () => {
        // A propriedade 'paused' indica o estado atual do áudio.
        if (backgroundMusic.paused) {
            // Tenta tocar a música. O navegador só permitirá isso se a função for chamada por um evento do usuário (como um clique).
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Se a música tocar com sucesso, muda o ícone.
                        musicToggle.textContent = '🔇';
                    })
                    .catch(error => {
                        // Se houver um erro (ex: arquivo não encontrado), ele será exibido no console.
                        console.error("Erro ao tentar tocar a música:", error);
                    });
            }
        } else {
            // Se a música já estiver tocando, simplesmente pausa.
            backgroundMusic.pause();
            musicToggle.textContent = '🔊';
        }
    };

    musicToggle.addEventListener('click', toggleMusic);

    // Define um volume mais baixo para a música de fundo
    backgroundMusic.volume = 0.2;

    // --- Lógica do Relógio na Ampulheta ---
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Chama uma vez para não esperar 1 segundo para aparecer

    // --- Lógica do Histórico de Pesquisa ---
    function getSearchHistory() {
        return JSON.parse(sessionStorage.getItem('searchHistory')) || [];
    }

    function saveSearchTerm(term) {
        let history = getSearchHistory();
        // Remove o termo se ele já existir para movê-lo para o topo
        history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
        // Adiciona o novo termo no início da lista
        history.unshift(term);
        // Limita o histórico aos últimos 20 itens
        if (history.length > 20) {
            history.pop();
        }
        sessionStorage.setItem('searchHistory', JSON.stringify(history));
    }

    function renderHistory() {
        const history = getSearchHistory();
        historyList.innerHTML = '';

        if (history.length > 0) {
            historyContainer.style.display = 'block';
            history.forEach(term => {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.className = 'history-button';
                button.textContent = term;
                button.onclick = () => {
                    searchInput.value = term;
                    // Aciona a busca diretamente
                    performSearch();
                };
                li.appendChild(button);
                historyList.appendChild(li);
            });
        } else {
            historyContainer.style.display = 'none';
        }
    }
});