# Desafio VAR — Codecon

A partir de um lance congelado no momento do passe, decidir se há algum jogador
do time atacante em **posição de impedimento**.

A função **não decide o lance** — ela entrega o veredito da posição. O árbitro
decide o resto.

A regra do impedimento vocês já conhecem. O desafio é traduzir ela em código a
partir das posições dos jogadores.

## Como rodar

### Interface Visual (recomendado)

Abra o `index.html` por um servidor local (necessário para o `fetch()` dos arquivos JSON):

```bash
# Com Python (qualquer versão)
python -m http.server 8000

# Com Node.js (npx)
npx serve .

# Com VS Code: instale a extensão Live Server e clique em "Go Live"
```

Acesse `http://localhost:8000` no navegador, selecione um lance no painel lateral e clique em **ANÁLISE VAR**.

### Linha de Comando (Node.js)

```bash
node solucao.js
```

## O que você implementa

A função `checkOffside` está implementada em **JavaScript** no arquivo `solucao.js`
e embutida diretamente no `index.html`:

```js
function checkOffside(play) {
  // sua lógica aqui
  return {
    hasOffside: false,
    offsidePlayers: [],       // ids dos atacantes em posição irregular
    offsideLineDefender: null // id do defensor que define a linha
  };
}
```

## O objeto `play`

```jsonc
{
  "field": { "width": 68, "length": 105 },
  "attackingTeam": "A",
  "attackDirection": "right",  // o time atacante SEMPRE ataca o gol da direita (x maior = mais perto do gol)
  "passInstant": true,         // as posições estão congeladas no momento do passe
  "passer": "A9",              // quem deu o passe
  "players": [
    { "id": "A11", "team": "A", "x": 88, "y": 34 },
    { "id": "B1",  "team": "B", "x": 103, "y": 34, "goalkeeper": true }
    // ... 22 jogadores no total
  ],
  "ball": { "x": 60, "y": 30 }
}
```

Coordenadas em metros. `x` cresce para a direita (0 = linha de fundo esquerda,
105 = linha de fundo direita). `y` cresce de uma lateral à outra (0 a 68).
Goleiros vêm com `"goalkeeper": true`.

## Os lances de teste

Cada arquivo é um objeto `play` pronto para passar à função. O `index.json` lista todos.

## Retorno esperado

```js
{ hasOffside: true, offsidePlayers: ["A11"], offsideLineDefender: "B4" }
```

- `hasOffside` — tem algum atacante em posição irregular?
- `offsidePlayers` — a lista de quem está
- `offsideLineDefender` — o defensor que define a linha (usado para desenhar o resultado)

## Arquivos

| Arquivo | Descrição |
|---|---|
| `index.html` | Interface visual com campo, seleção de lances e botão ANÁLISE VAR |
| `solucao.js` | Implementação da `checkOffside` + runner Node.js |
| `index.json` | Lista dos lances de teste |
| `lance-*.json` | Dados de cada lance (posições dos jogadores e bola) |


### Minha Solução

#### Funções

1. **Separar os jogadores por time**:

   Separa os jogadores em duas listas: `defenders` e `attackers`.

2. **Ordenar os defensores**:

   Ordena os defensores pela posição X (crescente).

3. **Identificar a linha de impedimento**:

   O penúltimo defensor define a linha de impedimento (2º mais perto da linha de fundo x=105).

4. **Identificar os atacantes em posição irregular**:

   Verifica se algum atacante está em posição irregular (posição X maior que a linha de impedimento, maior que a bola e maior que o meio de campo).

#### Resultado
```json
{
  "hasOffside": true,
  "offsidePlayers": ["A11"],
  "offsideLineDefender": "B4"
}
```