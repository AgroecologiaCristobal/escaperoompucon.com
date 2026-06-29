const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream('escape-room-pucon-website.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
  console.log('✅ Proyecto exportado exitosamente!');
  console.log(`📦 Archivo creado: escape-room-pucon-website.zip (${archive.pointer()} bytes)`);
  console.log('🔽 Puedes descargar el archivo desde el explorador de archivos');
});

archive.on('error', function (err) {
  console.error('❌ Error al crear el archivo:', err);
});

archive.pipe(output);

// Empaquetar solo el contenido de dist/ (el sitio compilado listo para subir)
archive.directory('dist/', false);

console.log('📦 Creando archivo ZIP del sitio compilado (carpeta dist/)...');
archive.finalize();
