import imageAsset from "../img/stef2.jpg"
import _ from "lodash"
import {glitch2, glitch3, glitch4, glitch5, glitch7, invertColors} from "./effects"

console.log(imageAsset)

var canvas;
var ctx;
var img = new Image;
var copy

var loadImageBuffer = () => {

    canvas.height = img.height;
    canvas.width = img.width;

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // deep clone the image
    copy = _.cloneDeep(imageData.data)
}


var executeGlitch = (e) => {
    let x, y
    if(e != undefined) {
        x = e.clientX;
        y = e.clientY;
    }
    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // invertColors(imageData.data)
    glitch7(imageData, copy, x, y)

    ctx.putImageData(imageData, 0, 0)
}

var init = () => {

    img.src = imageAsset
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.onload = loadImageBuffer
    img.onerror = console.log

    canvas.addEventListener('mousemove', executeGlitch);
    // setInterval(executeGlitch, 100)
}

init()