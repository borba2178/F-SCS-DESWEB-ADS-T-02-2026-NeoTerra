---
description: JavaScript interativo e validação no NeoTerra
globs: public/js/**/*.js
alwaysApply: false
---

# JavaScript interativo – NeoTerra

## 1. Objetivo
Garantir interatividade fluida, validação correta de formulários e lógica da calculadora.

## 2. Contexto do projeto
JavaScript puro (Vanilla JS) executado no lado do cliente, integrado aos arquivos HTML do diretório public/.

## 3. Regras detalhadas
- Certifique-se de que o DOM esteja totalmente carregado antes de manipular elementos (`DOMContentLoaded`).
- Valide os campos da página de contato e os valores de entrada da calculadora antes do processamento[cite: 1].
- Trate erros e exceções de forma amigável para o usuário.

## 4. Exemplo
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form-contato');
  if (form) {
    // Lógica de manipulação
  }
});
```

## 5. Erros a evitar
- Não insira scripts diretamente em atributos inline no HTML (como `onclick=""`).
- Não deixe entradas da calculadora sem tratamento para valores vazios ou inválidos.

## 6. Perguntas
Na dúvida sobre o comportamento esperado de scripts ou regras de negócio, pergunte antes.
