var canvas;
var ctx;
var img = new Image;
// img.crossOrigin = "Anonymous";

window.onload = () => {

    img.src = 'img/xcvbnm.jpg';

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.onload = drawimage

    canvas.addEventListener('mousemove', onClick);
}

var onClick = (e) => {
    // console.log(e)
    var x = e.clientX;
    var y = e.clientY;
    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // invertColors(imageData.data)
    glitch5(imageData, x, y)

    ctx.putImageData(imageData, 0, 0)
}

var drawimage = () => {

    canvas.height = img.height;
    canvas.width = img.width;

    ctx.drawImage(img, 0, 0);

}

var glitch5 = (imageData, x, y) => {
    var r = 4 * parseInt(Math.random()*2)+1
    let perc = 4 * (parseInt(x/imageData.width*10)+1)

    imageData.data.forEach((c, i) => {
        imageData.data[i] = i%r == 3 ? c : imageData.data[i+perc]
    });
}

var glitch4 = (imageData, x, y) => {
    
    let perc = parseInt(x/imageData.width*20)+1

    imageData.data.forEach((c, i) => {
        imageData.data[i] = imageData.data[i+perc]
    });
}

var glitch3 = (imageData, x, y) => {
    var r = 4 * parseInt(Math.random()*2)+1
    let perc = parseInt(x/imageData.width*10)+1

    imageData.data.forEach((c, i) => {
        imageData.data[i] = i%r == 3 ? c : imageData.data[i+perc]
    });
}

var glitch2 = (data, x, y) => {
    for(w = 0; w< data.width; w++) {
        for(h = 0; h< data.height; h++) {
            let r = 4 * parseInt(Math.random()*10)+1
            p = getPixel(data, w+r, h)
            setPixel(data, w, h, p)
        }
    }
}

var invertColors = (data) => {
    for (var i = 0; i < data.length; i+= 4) {
      data[i] = data[i] ^ 255; // Invert Red
      data[i+1] = data[i+1] ^ 255; // Invert Green
      data[i+2] = data[i+2] ^ 255; // Invert Blue
    }
}

var setPixel = (imageData, x, y, p) => {
    imageData.data[((y * (imageData.width * 4)) + (x * 4))] = p.r
    imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1] = p.g
    imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2] = p.b
} 
var getPixel = (imageData, x, y) => {
    return {
        r: imageData.data[((y * (imageData.width * 4)) + (x * 4))],
        g: imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1],
        b: imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2]
    }
} 