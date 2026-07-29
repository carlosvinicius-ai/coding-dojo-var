// ---- checkOffside: verifica impedimento em um lance ----
function checkOffside(play) {
  const { attackingTeam, ball, field, players } = play;
  const halfFieldX = field.length / 2;

  // Separa os jogadores por time
  const defenders = players.filter((p) => p.team !== attackingTeam);
  const attackers = players.filter((p) => p.team === attackingTeam);

  // Ordena os defensores pela posição X (crescente)
  const sortedDefenders = [...defenders].sort((a, b) => a.x - b.x);

  // O penúltimo defensor define a linha de impedimento (2º mais perto da linha de fundo x=105)
  const offsideLineDefender = sortedDefenders[sortedDefenders.length - 2];
  const offsideLineX = offsideLineDefender.x;

  // Identifica os atacantes em posição irregular
  const offsidePlayers = attackers
    .filter(
      (a) =>
        a.x > offsideLineX &&
        a.x > ball.x &&
        a.x > halfFieldX
    )
    .map((a) => a.id);

  return {
    hasOffside: offsidePlayers.length > 0,
    offsidePlayers,
    offsideLineDefender: offsideLineDefender.id,
  };
}

// ---- runner: roda os lances do index.json. Rode com: node solucao.js ----
if (typeof require !== "undefined") {
  const fs = require("fs");
  const path = require("path");

  const index = JSON.parse(
    fs.readFileSync(path.join(__dirname, "index.json"), "utf8")
  );

  for (const { nome, arquivo } of index) {
    const play = JSON.parse(
      fs.readFileSync(path.join(__dirname, arquivo), "utf8")
    );
    console.log(`--- ${nome} ---`);
    console.log(checkOffside(play));
    console.log("");
  }
}

// Exporta para uso no navegador (index.html)
if (typeof module !== "undefined") {
  module.exports = { checkOffside };
}
