export default function generateCharacter() {
  const character = createCharacter();
  return formatCharacter(character);
}

function roll3d6() {
  return Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 6 + 1),
  ).reduce((a, b) => a + b);
}

function getModifier(score) {
  if (score >= 15) return +1;
  if (score <= 6) return -1;
  return 0;
}

function createCharacter() {
  const classes = ["Guerreiro", "Clérigo", "Arcanista", "Ladrão"];
  const className = classes[Math.floor(Math.random() * classes.length)];

  const abilityNames = ["FOR", "DES", "CON", "INT", "SAB", "CAR"];
  const abilities = Object.fromEntries(
    abilityNames.map((name) => {
      const value = roll3d6();
      return [name, { value, mod: getModifier(value) }];
    }),
  );

  // Define os requisitos principais por classe
  const primeRequisites = {
    "Guerreiro": "FOR",
    "Clérigo": "SAB",
    "Arcanista": "INT",
    "Ladrão": "DES",
  };

  let xpBonus = 0;

  // Verifica se o requisito principal é 15 ou mais
  const primeReq = primeRequisites[className];
  if (abilities[primeReq].value >= 15) xpBonus += 5;

  // Bônus adicionais por SAB e CAR altos
  if (abilities["SAB"].value >= 15) xpBonus += 5;
  if (abilities["CAR"].value >= 15) xpBonus += 5;

  return {
    name: generateName(),
    class: className,
    level: 1,
    abilities,
    xpBonus
  };
}

function formatCharacter(char) {
  let output = `Nome: ${char.name}\nClasse: ${char.class} (Nível ${char.level})\nBônus de XP: ${char.xpBonus}%\nOuro: ${roll3d6()*10} po\n\n`;
  for (const [ability, data] of Object.entries(char.abilities)) {
    const mod = data.mod > 0 ? `+${data.mod}` : `${data.mod}`;
    output += `${ability}: ${data.value} (${mod})\n`;
  }
  return output;
}

function generateName() {
  const first = [
  "Ar", "Bel", "Dra", "El", "Fa", "Gar", "Ka", "Lor", "Mor", "Tha",
  "Urd", "Zan", "Brok", "Dum", "Kel", "Nar", "Rim", "Tor", "Vul", "Zul",
  "Brim", "Kor", "Thol", "Or", "Koz", "Erd", "Dur", "Fen", "Mug", "Nir",
  // Elvish-sounding additions
  "Ael", "Lia", "Eli", "Syl", "Thel", "Cal", "Ny", "Sael", "Val", "Thia",
  "Isil", "My", "Elar", "Il", "Ser", "Tali", "Alu", "Yll", "Nym", "Lae",
  // Human-fantasy additions
  "Hal", "Ced", "Jon", "Wil", "Ed", "Rav", "Mat", "Torin", "Bran", "Jor",
  "Roder", "Gav", "Thom", "Alar", "Dar", "Hen", "Quin", "Luth", "Garr", "Roan"
];
  const last = [
  "dor", "min", "rin", "thas", "dran", "ros", "zek", "mon",
  "rak", "grom", "dil", "gar", "zon", "muk", "grim", "kul", "nok", "tir", "mog", "ban",
  "dur", "neth", "kash", "mod", "zod", "rend", "brod", "lun", "gred", "rith",
  // Feminine-sounding additions:
  "ia", "elle", "ira", "wyn", "ara", "lin", "ora", "etha", "issa", "aria",
  "ela", "ena", "ina", "is", "irae", "ira", "rielle", "mera", "thiel", "una",
  "yra", "alyn", "ael", "eira", "aleth", "nyss", "lyra", "syra"
];

  return (
    first[Math.floor(Math.random() * first.length)] +
    last[Math.floor(Math.random() * last.length)]
  );
}
