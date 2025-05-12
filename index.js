const fs = require('fs');

function loadPlayersFromFile(path = './players.json') {
  const raw = fs.readFileSync(path, 'utf-8');
  const allPlayers = JSON.parse(raw);

  // Filter out players missing basic data
  return allPlayers.filter(player =>
    player.firstName &&
    player.lastName &&
    player.playerId &&
    player.teamId
  );
}

function getRandomLineup(players, count = 13) {
  const shuffled = players.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Load and run
const players = loadPlayersFromFile();

if (players.length < 13) {
  console.error("❌ Not enough valid players found.");
  process.exit(1);
}

const lineup = getRandomLineup(players, 13);
console.log("🏀 Random NBA Lineup:");
lineup.forEach((player, i) => {
  console.log(`${i + 1}. ${player.firstName} ${player.lastName} (Player ID: ${player.playerId}, Team ID: ${player.teamId})`);
});
