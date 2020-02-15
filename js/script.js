
window.onload = () => {

    var img = new Image;
    img.src = 'https://visualhunt.com/photos/2/portrait-of-beautiful-cat-with-blue-eyes.jpg';

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
    }
        


}