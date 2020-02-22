var canvas;
var ctx;
var img = new Image;
var x = 30
var y = 10
var copy
// img.crossOrigin = "Anonymous";

window.onload = () => {

    img.src = 'img/stef2.jpg';

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.onload = drawimage

    canvas.addEventListener('mousemove', executeGlitch);
    // setInterval(executeGlitch, 100)
}

var executeGlitch = (e) => {
    if(e != undefined) {
        x = e.clientX;
        y = e.clientY;
    }
    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // invertColors(imageData.data)
    glitch7(imageData)

    ctx.putImageData(imageData, 0, 0)
}

var drawimage = () => {

    canvas.height = img.height;
    canvas.width = img.width;

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // deep clone the image
    copy = JSON.parse(JSON.stringify(imageData.data))

}

var glitch7 = (imageData) => {
    imageData.data.forEach((b, i) => {
        imageData.data[i] = i%4 == 3 ? b : copy[i^x]
    });
}

var glitch5 = (imageData) => {
    
    let percy = 1// 1, 2, 5, (y % 4) + 1

    var r = 4 * parseInt(Math.random() * 2) + percy
    let percx = 4 * (parseInt(x / imageData.width * 10) + 1)

    imageData.data.forEach((b, i) => {
        imageData.data[i] = i%r == 3 ? b : imageData.data[i+percx]
    });
}

var glitch4 = (imageData) => {
    
    let perc = parseInt(x/imageData.width*20)+1

    imageData.data.forEach((c, i) => {
        imageData.data[i] = imageData.data[i+perc]
    });
}

var glitch3 = (imageData) => {
    var r = 4 * parseInt(Math.random()*2)+1
    let perc = parseInt(x/imageData.width*10)+1

    imageData.data.forEach((c, i) => {
        imageData.data[i] = i%r == 3 ? c : imageData.data[i+perc]
    });
}

var glitch2 = (data) => {
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