
// needs jimp version 0.22.1
const jsQR = require('jsqr');
const Jimp = require('jimp');

async function decodeQR(imagePath){
    // P1a
    let img = (await Jimp.read(imagePath));
    let bmp = img.bitmap;
    const data = bmp.data;
    const width = bmp.width;
    const height=bmp.height;

    // P1b

    const result =jsQR(data,width,height);

    if(result===null){
        throw new Error('No QR code found');
    }
    return result.data;
    

}

if(require.main === module){
    decodeQR('test.png')
        .then(data => console.log("QR Code Contents:",data))
        .catch(err => console.log("Extraction Failed:",err));
}

module.exports = { decodeQR };
