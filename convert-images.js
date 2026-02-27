// convert-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// MUDANÇA: Configure aqui onde estão suas imagens (ex: public/assets ou src/assets)
const inputDir = path.join(__dirname, 'public', 'assets'); 
const outputDir = inputDir; // Salva na mesma pasta

// Cria a pasta de saída se não existir
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// Lê todos os arquivos da pasta
fs.readdir(inputDir, (err, files) => {
    if (err) {
        return console.error('Erro ao ler diretório:', err);
    }

    // Filtra apenas JPG e PNG
    const imagesToConvert = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
    });

    console.log(`Encontradas ${imagesToConvert.length} imagens para converter...`);

    // Processa cada imagem
    imagesToConvert.forEach(file => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

        // OTimização Master: WebP com 80% de qualidade e lossless para PNGs
        sharp(inputPath)
            .webp({ 
                quality: 80, // Mantém ótima qualidade reduzindo muito o tamanho
                effort: 6,   // Gasta mais CPU na conversão para compactar mais
                lossless: path.extname(file).toLowerCase() === '.png' // Mantém transparência e nitidez se for PNG original
            })
            .toFile(outputPath)
            .then(() => {
                console.log(`✅ Convertida: ${file} -> ${path.parse(file).name}.webp`);
                // OPCIONAL: Descomente a linha abaixo para apagar o arquivo original após converter
                // fs.unlinkSync(inputPath); 
            })
            .catch(err => {
                console.error(`❌ Erro ao converter ${file}:`, err);
            });
    });
});