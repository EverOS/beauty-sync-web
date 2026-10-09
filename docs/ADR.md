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

## ADR-002: Guardar o token JWT no `localStorage`

- **Data:** 09/10/2026
- **Status:** Aceito (solução provisória)

### Contexto
Depois do login, a API devolve um token JWT. O frontend precisa guardá-lo
para usar nas próximas requisições às rotas protegidas.

### Decisão
Guardar o token no `localStorage` do navegador.

### Por quê
Funciona só com o frontend, usando a resposta que a API já devolve hoje.
A alternativa mais segura (cookie `httpOnly`) exige mudar também a API
(gravar o cookie, ajustar CORS e `SameSite`), o que não cabia nesta tarefa.

### Alternativa considerada
Cookie `httpOnly`: o JavaScript da página não consegue ler o token, o que
protege melhor contra XSS. Fica mais seguro, porém mais complexo.

### Consequências
- Qualquer script que rodar na página consegue ler o token. Se houver uma
  falha de XSS, o token pode ser roubado.
- É uma solução provisória. Migrar para cookie `httpOnly` fica como card futuro.