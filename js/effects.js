
export var glitch7 = (imageData, copy, x, y) => {
    imageData.data.forEach((b, i) => {
        imageData.data[i] = i%4 == 3 ? b : copy[i^(4*x)]
    });
}

export var glitch5 = (imageData, copy, x, y) => {
    
    let percy = 1// 1, 2, 5, (y % 4) + 1

    var r = 4 * parseInt(Math.random() * 2) + percy
    let percx = 4 * (parseInt(x / imageData.width * 10) + 1)

    imageData.data.forEach((b, i) => {
        imageData.data[i] = i%r == 3 ? b : imageData.data[i+percx]
    });
}

export var glitch4 = (imageData, copy, x, y) => {
    
    let perc = parseInt(x/imageData.width*20)+1

    imageData.data.forEach((c, i) => {
        imageData.data[i] = imageData.data[i+perc]
    });
}

export var glitch3 = (imageData, copy, x, y) => {
    var r = 4 * parseInt(Math.random()*2)+1
    let perc = parseInt(x/imageData.width*10)+1

    imageData.data.forEach((c, i) => {
        imageData.data[i] = i%r == 3 ? c : imageData.data[i+perc]
    });
}

export var glitch2 = (imageData, copy, x, y) => {
    for(w = 0; w< data.width; w++) {
        for(h = 0; h< data.height; h++) {
            let r = 4 * parseInt(Math.random()*10)+1
            p = getPixel(data, w+r, h)
            setPixel(data, w, h, p)
        }
    }
}

export var invertColors = (data) => {
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
