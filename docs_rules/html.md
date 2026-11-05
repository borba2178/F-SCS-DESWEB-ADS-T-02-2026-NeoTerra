---
description: HTML5 semântico e acessível no NeoTerra
globs: public/**/*.html
alwaysApply: false
---

# HTML semântico – NeoTerra

## 1. Objetivo
Páginas semânticas, acessíveis e padronizadas conforme a estrutura do projeto.

## 2. Contexto do projeto
HTML5 + CSS3 puros, sem frameworks. Páginas localizadas em public/, estruturadas com foco em acessibilidade.

## 3. Regras detalhadas
- Copie header, menu e footer padronizados do projeto.
- Um único `<h1>`; cada section com aria-labelledby.
- Toda `<img>` com alt descritivo; `lang="pt-BR"`.

## 4. Exemplo
```html
<section aria-labelledby="t-proj"><h2 id="t-proj">
```[cite: 11]

## 5. Erros a evitar
- Não use `<div>` no lugar de header, nav, main e footer.
- Não use CSS inline nem frameworks.

## 6. Perguntas
Na dúvida sobre conteúdo ou estrutura da página, pergunte antes.