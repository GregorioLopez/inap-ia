import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const profiles = [];

const nombres = [
  'Ana', 'Carlos', 'María', 'Juan', 'Laura', 'Pedro', 'Carmen', 'Luis', 
  'Isabel', 'Miguel', 'Elena', 'David', 'Rosa', 'Antonio', 'Lucía', 'José', 
  'Patricia', 'Francisco', 'Marta', 'Manuel', 'Sofía', 'Javier', 'Teresa', 
  'Raúl', 'Beatriz', 'Alberto', 'Cristina', 'Fernando', 'Pilar', 'Sergio'
];

const apellidos = [
  'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 
  'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 
  'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez',
  'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez',
  'Serrano', 'Blanco', 'Molina', 'Castro', 'Ortiz', 'Rubio', 'Marín'
];

const organismos = [
  'Ministerio de Hacienda y Función Pública',
  'Ministerio de Educación y Formación Profesional',
  'Ministerio de Sanidad',
  'Ministerio de Justicia',
  'Ministerio del Interior',
  'Ministerio de Defensa',
  'Ministerio de Trabajo y Economía Social',
  'Ministerio de Industria, Comercio y Turismo',
  'Ministerio de Agricultura, Pesca y Alimentación',
  'Ministerio de Transición Ecológica',
  'Agencia Tributaria',
  'Seguridad Social',
  'SEPE - Servicio Público de Empleo Estatal',
  'INAP - Instituto Nacional de Administración Pública',
  'Ayuntamiento de Madrid',
  'Ayuntamiento de Barcelona',
  'Junta de Andalucía',
  'Generalitat de Catalunya',
  'Comunidad de Madrid',
  'Xunta de Galicia',
  'Gobierno Vasco',
  'Generalitat Valenciana',
  'Junta de Castilla y León',
  'Diputación Provincial de Valencia',
  'Consejería de Educación'
];

const cargos = [
  'Director/a General',
  'Subdirector/a General',
  'Jefe/a de Servicio',
  'Jefe/a de Sección',
  'Técnico/a Superior',
  'Técnico/a de Gestión',
  'Analista de Sistemas',
  'Coordinador/a de Proyectos',
  'Responsable de Área',
  'Gestor/a Administrativo',
  'Especialista en Recursos Humanos',
  'Consultor/a Técnico',
  'Responsable de Calidad',
  'Jefe/a de Departamento',
  'Asesor/a Técnico',
  'Inspector/a de Servicios',
  'Secretario/a General',
  'Interventor/a',
  'Tesorero/a',
  'Arquitecto/a de Soluciones'
];

const especialidades = [
  'gestión de proyectos',
  'coordinación de equipos',
  'análisis de datos',
  'planificación estratégica',
  'desarrollo de políticas públicas',
  'transformación digital',
  'recursos humanos',
  'gestión financiera',
  'calidad y mejora continua',
  'atención ciudadana',
  'contratación pública',
  'gestión presupuestaria',
  'innovación administrativa',
  'sistemas de información',
  'procedimientos administrativos'
];

// Generar 100 perfiles
for (let i = 1; i <= 100; i++) {
  const genero = i % 2 === 0 ? 'men' : 'women';
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const apellido1 = apellidos[Math.floor(Math.random() * apellidos.length)];
  const apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)];
  const organismo = organismos[Math.floor(Math.random() * organismos.length)];
  const cargo = cargos[Math.floor(Math.random() * cargos.length)];
  const especialidad = especialidades[Math.floor(Math.random() * especialidades.length)];
  const años = 5 + (i % 20);
  
  profiles.push({
    id: String(i),
    nombre: nombre,
    apellidos: `${apellido1} ${apellido2}`,
    foto_url: `https://randomuser.me/api/portraits/${genero}/${(i % 70) + 1}.jpg`,
    organismo: organismo,
    cargo: cargo,
    cv: `Profesional con más de ${años} años de experiencia en administración pública. Especializado en ${especialidad}. Amplio conocimiento en gestión de servicios públicos y coordinación de equipos multidisciplinares.`,
    linkedin_url: 'https://linkedin.com',
    github_url: 'https://github.com'
  });
}

// Guardar en archivo JSON
const outputPath = join(__dirname, 'src', 'data', 'mock-profiles.json');
writeFileSync(outputPath, JSON.stringify(profiles, null, 2), 'utf-8');

console.log(`✅ Generados ${profiles.length} perfiles en: ${outputPath}`);

