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

function getBinary(imagemPath, cb) {

    Jimp.read(imagemPath, function (err, image) {
        if (err) throw err;

        const cX = image.bitmap.width;
        const cY = image.bitmap.height;

        const jumpX = parseInt(cX / 25);
        const jumpY = parseInt(cY / 20);

        let binary = [];

        for (let y = jumpY; y <= cY; y += jumpY) {
            let lineBinary = [];
            for (let x = jumpX; x <= cX; x += jumpX) {
                let pretos = 0;

                for (let xDentro = (x - jumpX); xDentro < x; xDentro++) {
                    for (let yDentro = (y - jumpY); yDentro < y; yDentro++) {
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

        cb(binary);
    });
}


module.exports = {
    colocarImagensEmPretoEBranco,
    pegaImagensDaPasta,
    getBinary
}