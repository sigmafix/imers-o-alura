# 📜 Projeto -- Interface com Tema Egípcio

**Estudo prático de Front-End com foco em UI/UX, responsividade,
animações e alternância de tema**

Este projeto é uma interface web desenvolvida para estudos, explorando
técnicas modernas de CSS, responsividade avançada, uso de variáveis,
animações e criação de um tema visual inspirado no Antigo Egito,
incluindo texturas, dourado, hieróglifos e elementos estilizados.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

### **HTML5**

-   Uso semântico para melhor acessibilidade e estrutura.
-   Separação clara entre header, main e footer.

### **CSS3 (Avançado)**

O projeto faz uso intenso de recursos modernos de estilização:

-   Variáveis CSS (`:root`) para padronização do design system.
-   Flexbox e CSS Grid para um layout responsivo.
-   Animações com `@keyframes`.
-   Transições suaves e efeitos de hover.
-   Pseudo-elementos (`::before` e `::after`) para decoração.
-   Media Queries otimizadas para mobile e tablets.
-   Modo escuro totalmente funcional.

### **Google Fonts**

-   Fonte **Quicksand**, garantindo visual limpo e moderno.

### **Texturas e imagens externas**

-   Texturas de papiro e hieróglifos integradas via CDN.
-   Imagem temática no cabeçalho e no fundo.

------------------------------------------------------------------------

## 🎨 Design System (Variáveis Globais)

``` css
:root {
    --primary-color: #ffc002;
    --secondary-color: #343a40;
    --tertiary-color: #c5a572;
    --bg-color: #f5f5f5;
    --hieroglyph-color: #8d6e63;
}
```

------------------------------------------------------------------------

## 🧱 Estrutura Visível da Interface

### **📌 Cabeçalho (Header)**

-   Título estilizado com sombra.
-   Campo de busca responsivo.
-   Botões customizados.
-   Textura e gradiente dourado.
-   Barras decorativas com pseudo-elementos.
-   Estilo "sticky".

### **📌 Área Principal (Main)**

#### ▸ Cards

-   Estilização em papiro.
-   Animação de fade-in.
-   Elevação no hover.
-   Layout fluído com CSS Grid.

#### ▸ Artigos

-   Fundo texturizado.
-   Emoji decorativo via `::before`.
-   Títulos com borda dourada.
-   Interação suave com transformações.

------------------------------------------------------------------------

## 🌙 Tema Escuro (Dark Mode)

-   Alteração do fundo com hieróglifos dourados.
-   Ajustes completos de componentes, textos e sombras.
-   Implementação via classe `dark-mode`.

------------------------------------------------------------------------

## 📱 Responsividade

-   Ajustes para tablets (≤768px).
-   Ajustes para celulares (≤480px).
-   Campos expandidos, reorganização de layout e fontes adaptadas.

------------------------------------------------------------------------

## 🎶 Recursos Extras

-   Cursor personalizado em formato de pena.
-   Botão para música/sons.
-   Relógio estilizado no topo.
-   Histórico visual.

------------------------------------------------------------------------

## 📂 Organização Sugerida do Projeto

    /css
       └── style.css
    /js
       └── script.js
    /assets
       ├── imagens
       ├── ícones
       └── texturas
    index.html
    README.md

------------------------------------------------------------------------

## 🛠 Boas Práticas Adotadas

-   Uso de variáveis CSS.
-   Código comentado.
-   Separação entre HTML / CSS / JS.
-   Layout pensado com responsividade.
-   Classe única para dark mode.
-   Texturas via CDN.
-   Transições suaves em interações.

------------------------------------------------------------------------

## 🎯 Objetivo do Projeto

-   Praticar design temático.
-   Aprender CSS avançado.
-   Desenvolver UI/UX moderno.
-   Explorar responsividade e dark mode.

------------------------------------------------------------------------

## ▶ Como Executar

Basta abrir:

    index.html

Não é necessário servidor ou dependências.
