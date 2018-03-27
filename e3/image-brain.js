let Jimp = require("jimp");
let fs = require('fs');

async function colocarImagensEmPretoEBranco() {
    pegaImagensDaPasta('./src', (imagens) => {
        imagens.forEach(async (image) => {
            let imageRes = await Jimp.read(image);
            imageRes.grayscale().write(image);
        })
    });
}

async function pegaImagensDaPasta(path, imagens) {
    let files = [];
    let list = fs.readdirSync(path);

    list.forEach((l) => {
        let filesName = fs.readdirSync(`${path}/${l}`);

        filesName.forEach((fileName) => {
            files.push(`${path}/${l}/${fileName}`);
        })
    })

    imagens(files);
}

function isWhite(rgba) {
    if (rgba.r > 220 && rgba.g > 220 && rgba.b > 220) {
        return 1;
    } else {
        return 0;
    }
}

function lerImagensEPegarBinario(imagens) {
    Jimp.read(imagens[0], function (err, image) {
        if (err) throw err;
        const cX = 50;
        const cY = 80;
        const jump = 5;
        let binary = [];

        for (let y = jump; y <= cY; y += jump) {
            let lineBinary = [];
            for (let x = jump; x <= cX; x += jump) {
                let pretos = 0;

                for (let xDentro = (x - jump); xDentro < x; xDentro++) {
                    for (let yDentro = (y - jump); yDentro < y; yDentro++) {
                        let pixelColor = Jimp.intToRGBA(image.getPixelColor(xDentro, yDentro));

                        if (!isWhite(pixelColor)) {
                            pretos++;
                        }
                    }
                }

                if (pretos > 1) {
                    lineBinary.push(1)
                } else {
                    lineBinary.push(0);
                }
            }

            binary.push(lineBinary);
        }
        console.log(binary);
    });
}

colocarImagensEmPretoEBranco();

pegaImagensDaPasta('./src', (imagens) => {
    lerImagensEPegarBinario(imagens);
})
