# Architecture Decision Records (ADR) - BeautySync Web

Registro das decisões técnicas do frontend: o que foi escolhido, por quê, e o que ficou de fora.

## ADR-001: Usar `fetch` nativo para chamar a API

- **Data:** 08/10/2026
- **Status:** Aceito

### Contexto
O formulário de login precisa enviar e-mail e senha para a API (`POST /login`).
Era preciso escolher como fazer essa chamada HTTP no frontend.

### Decisão
Usar o `fetch`, que já vem integrado ao navegador.

### Por quê
Não precisa instalar nada, o que deixa o projeto mais simples. Também ajuda a
entender como uma requisição HTTP funciona por baixo, sem uma biblioteca
escondendo os detalhes.

### Alternativa considerada
`axios`: trata erros HTTP automaticamente e tem interceptors, mas é mais uma
dependência pra manter.

### Consequências
- Preciso checar `response.ok` manualmente, porque o `fetch` não dá erro em 401.
- Se as chamadas ficarem repetitivas (ex.: enviar o token em toda requisição),
  vale reavaliar o `axios`.