import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo JSON
const jsonPath = join(__dirname, 'src', 'data', 'mock-profiles.json');
const profiles = JSON.parse(readFileSync(jsonPath, 'utf-8'));

// Convertir a formato JavaScript
let jsContent = 'export const mockProfiles = [\n';

profiles.forEach((profile, index) => {
  jsContent += '  {\n';
  jsContent += `    id: '${profile.id}',\n`;
  jsContent += `    nombre: '${profile.nombre}',\n`;
  jsContent += `    apellidos: '${profile.apellidos}',\n`;
  jsContent += `    foto_url: '${profile.foto_url}',\n`;
  jsContent += `    organismo: '${profile.organismo}',\n`;
  jsContent += `    cargo: '${profile.cargo}',\n`;
  jsContent += `    cv: '${profile.cv}',\n`;
  jsContent += `    linkedin_url: '${profile.linkedin_url}',\n`;
  jsContent += `    github_url: '${profile.github_url}',\n`;
  jsContent += '  }';
  
  if (index < profiles.length - 1) {
    jsContent += ',\n';
  } else {
    jsContent += '\n';
  }
});

jsContent += '];\n';

// Guardar en archivo JS
const outputPath = join(__dirname, 'src', 'services', 'mockProfiles.js');
writeFileSync(outputPath, jsContent, 'utf-8');

console.log(`✅ Generados ${profiles.length} perfiles en formato JavaScript: ${outputPath}`);

