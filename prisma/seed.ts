import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as never);

const teams = [
  { name: "Argentina", flag: "ar" },
  { name: "Australia", flag: "au" },
  { name: "Austria", flag: "at" },
  { name: "Belgium", flag: "be" },
  { name: "Bosnia and Herzegovina", flag: "ba" },
  { name: "Brazil", flag: "br" },
  { name: "Canada", flag: "ca" },
  { name: "Cape Verde", flag: "cv" },
  { name: "Colombia", flag: "co" },
  { name: "Croatia", flag: "hr" },
  { name: "Curaçao", flag: "cw" },
  { name: "Czech Republic", flag: "cz" },
  { name: "Ecuador", flag: "ec" },
  { name: "Egypt", flag: "eg" },
  { name: "England", flag: "GB-ENG" },
  { name: "France", flag: "fr" },
  { name: "Germany", flag: "de" },
  { name: "Ghana", flag: "gh" },
  { name: "Haiti", flag: "ht" },
  { name: "Iran", flag: "ir" },
  { name: "Iraq", flag: "iq" },
  { name: "Ivory Coast", flag: "ci" },
  { name: "Japan", flag: "jp" },
  { name: "Jordan", flag: "jo" },
  { name: "Mexico", flag: "mx" },
  { name: "Morocco", flag: "ma" },
  { name: "Netherlands", flag: "nl" },
  { name: "New Zealand", flag: "nz" },
  { name: "Norway", flag: "no" },
  { name: "Panama", flag: "pa" },
  { name: "Paraguay", flag: "py" },
  { name: "Portugal", flag: "pt" },
  { name: "Qatar", flag: "qa" },
  { name: "Saudi Arabia", flag: "sa" },
  { name: "Scotland", flag: "GB-SCT" },
  { name: "Senegal", flag: "sn" },
  { name: "South Africa", flag: "za" },
  { name: "South Korea", flag: "kr" },
  { name: "Spain", flag: "es" },
  { name: "Sweden", flag: "se" },
  { name: "Switzerland", flag: "ch" },
  { name: "Tunisia", flag: "tn" },
  { name: "Turkey", flag: "tr" },
  { name: "United States", flag: "us" },
  { name: "Uruguay", flag: "uy" },
  { name: "Uzbekistan", flag: "uz" },
];

// [team name, player name]
const playersByTeam: [string, string][] = [
  // France
  ["France", "Kylian Mbappé"],
  ["France", "Antoine Griezmann"],
  // England
  ["England", "Harry Kane"],
  ["England", "Jude Bellingham"],
  ["England", "Bukayo Saka"],
  // Norway
  ["Norway", "Erling Haaland"],
  // Argentina
  ["Argentina", "Lionel Messi"],
  ["Argentina", "Lautaro Martínez"],
  ["Argentina", "Julián Álvarez"],
  // Brazil
  ["Brazil", "Raphinha"],
  ["Brazil", "Vinícius Júnior"],
  ["Brazil", "Rodrygo"],
  // Spain
  ["Spain", "Lamine Yamal"],
  ["Spain", "Pedri"],
  ["Spain", "Álvaro Morata"],
  ["Spain", "Ferran Torres"],
  // Portugal
  ["Portugal", "Cristiano Ronaldo"],
  ["Portugal", "Bruno Fernandes"],
  ["Portugal", "João Félix"],
  ["Portugal", "Bernardo Silva"],
  // Germany
  ["Germany", "Jamal Musiala"],
  ["Germany", "Florian Wirtz"],
  ["Germany", "Kai Havertz"],
  // Belgium
  ["Belgium", "Kevin De Bruyne"],
  ["Belgium", "Romelu Lukaku"],
  // Netherlands
  ["Netherlands", "Cody Gakpo"],
  ["Netherlands", "Memphis Depay"],
  // Egypt
  ["Egypt", "Mohamed Salah"],
  // Senegal
  ["Senegal", "Sadio Mané"],
  // South Korea
  ["South Korea", "Son Heung-min"],
  // Japan
  ["Japan", "Kaoru Mitoma"],
  ["Japan", "Ritsu Doan"],
  // United States
  ["United States", "Christian Pulisic"],
  // Canada
  ["Canada", "Jonathan David"],
  ["Canada", "Alphonso Davies"],
  // Uruguay
  ["Uruguay", "Darwin Núñez"],
  ["Uruguay", "Federico Valverde"],
  // Colombia
  ["Colombia", "Luis Díaz"],
  ["Colombia", "James Rodríguez"],
  // Sweden
  ["Sweden", "Viktor Gyökeres"],
  // Turkey
  ["Turkey", "Arda Güler"],
  ["Turkey", "Hakan Çalhanoğlu"],
  // Morocco
  ["Morocco", "Achraf Hakimi"],
  // Switzerland
  ["Switzerland", "Granit Xhaka"],
  ["Switzerland", "Breel Embolo"],
  // Mexico
  ["Mexico", "Raúl Jiménez"],
  // Czech Republic
  ["Czech Republic", "Patrik Schick"],
  // Ecuador
  ["Ecuador", "Enner Valencia"],
  // Scotland
  ["Scotland", "Scott McTominay"],
  // Ghana
  ["Ghana", "Mohammed Kudus"],
  // Ivory Coast
  ["Ivory Coast", "Sébastien Haller"],
  // Saudi Arabia
  ["Saudi Arabia", "Salem Al-Dawsari"],
  // Iran
  ["Iran", "Mehdi Taremi"],
  // New Zealand
  ["New Zealand", "Chris Wood"],
  // Australia
  ["Australia", "Mathew Leckie"],
];

async function main() {
  const client = prisma as PrismaClient;

  const teamResult = await client.team.createMany({
    data: teams,
    skipDuplicates: true,
  });
  console.log(`Inserted ${teamResult.count} teams`);

  const allTeams = await client.team.findMany({
    select: { id: true, name: true },
  });
  const teamMap = Object.fromEntries(allTeams.map((t) => [t.name, t.id]));

  let playerCount = 0;
  for (const [teamName, playerName] of playersByTeam) {
    const teamId = teamMap[teamName];
    if (!teamId) {
      console.warn(`Team not found: ${teamName}`);
      continue;
    }
    await client.player.upsert({
      where: { name: playerName },
      create: { name: playerName, teamId },
      update: {},
    });
    playerCount++;
  }
  console.log(`Upserted ${playerCount} players`);
}

main()
  .catch(console.error)
  .finally(() => (prisma as PrismaClient).$disconnect());
