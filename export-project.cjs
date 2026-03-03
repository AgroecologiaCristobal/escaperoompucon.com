const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Crear el archivo ZIP
const output = fs.createWriteStream('escape-room-pucon-website.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Nivel de compresión
});

// Manejar eventos
output.on('close', function() {
  console.log('✅ Proyecto exportado exitosamente!');
  console.log(`📦 Archivo creado: escape-room-pucon-website.zip (${archive.pointer()} bytes)`);
  console.log('🔽 Puedes descargar el archivo desde el explorador de archivos');
});

archive.on('error', function(err) {
  console.error('❌ Error al crear el archivo:', err);
});

// Conectar el archivo de salida con el archivador
archive.pipe(output);

// Agregar archivos y carpetas, excluyendo node_modules y otros archivos innecesarios
const excludePatterns = [
  'node_modules',
  '.git',
  'dist',
  '.vite',
  '*.log',
  '.DS_Store',
  'escape-room-pucon-website.zip',
  'export-project.js'
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      return filePath.includes(pattern.replace('*', ''));
    }
    return filePath.includes(pattern);
  });
}

function addDirectory(dirPath, zipPath = '') {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const zipItemPath = zipPath ? path.join(zipPath, item) : item;
    
    if (shouldExclude(fullPath)) {
      return; // Saltar archivos/carpetas excluidos
    }
    
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      addDirectory(fullPath, zipItemPath);
    } else {
      archive.file(fullPath, { name: zipItemPath });
    }
  });
}

console.log('📦 Creando archivo ZIP del proyecto...');
addDirectory('.');

// Finalizar el archivo
archive.finalize();