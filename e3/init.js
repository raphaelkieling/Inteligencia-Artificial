const {
    colocarImagensEmPretoEBranco,
    getBinary,
    pegaImagensDaPasta
} = require('./image-binary');

const {
    init
} = require('./brain');

// Inicialização
colocarImagensEmPretoEBranco();

pegaImagensDaPasta('./src', (imagens) => {
    // imagens.forEach((imagem) => {
    //     getBinary(imagem, binario => {
    //         init(binario);
    //     });
    // })

    getBinary(imagens[0], binario => {
        init(binario);
    })
})