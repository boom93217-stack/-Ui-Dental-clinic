const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// One-off script that generates simple initials-avatar PNG placeholders for the
// About Us team section (public/team/*.png). Re-run if the team roster changes.

const outDir = path.join(__dirname, 'public', 'team');

const people = [
  { file: 'elena-marsh.png', initials: 'EM', color: '#0284c7' },
  { file: 'marcus-cole.png', initials: 'MC', color: '#06b6d4' },
  { file: 'priya-anand.png', initials: 'PA', color: '#0369a1' },
  { file: 'sofia-bennett.png', initials: 'SB', color: '#0891b2' },
];

function avatarSvg(initials, bgColor) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="480">
    <rect width="480" height="480" rx="240" fill="${bgColor}"/>
    <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, sans-serif" font-size="180" fill="white" font-weight="600">${initials}</text>
  </svg>`;
}

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const person of people) {
    const svg = avatarSvg(person.initials, person.color);
    const outPath = path.join(outDir, person.file);
    await sharp(Buffer.from(svg)).png().toFile(outPath);
    console.log(`✓ ${person.file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
