export default function generateCharacter() {
  const character = createCharacter();
  return formatCharacter(character);
}

function roll3d6() {
  return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6 + 1)).reduce((a, b) => a + b);
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
    abilityNames.map(name => {
      const value = roll3d6();
      return [name, { value, mod: getModifier(value) }];
    })
  );

  return {
    name: generateName(),
    class: className,
    level: 1,
    abilities,
  };
}

function formatCharacter(char) {
  let output = `Nome: ${char.name}\nClasse: ${char.class} (Nível ${char.level})\n\n`;
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
    "Brim", "Kor", "Thol", "Or", "Koz", "Erd", "Dur", "Fen", "Mug", "Nir"
  ];
  const last = [
    "dor", "min", "rin", "thas", "dran", "ros", "zek", "mon",
    "rak", "grom", "dil", "gar", "zon", "muk", "grim", "kul", "nok", "tir", "mog", "ban",
    "dur", "neth", "kash", "mod", "zod", "rend", "brod", "lun", "gred", "rith"
  ];
  return (
    first[Math.floor(Math.random() * first.length)] +
    last[Math.floor(Math.random() * last.length)]
  );
}
