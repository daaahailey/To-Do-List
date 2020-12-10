const background = document.querySelector(".outline_container");




const IMG_NUMBER = 9;


function handleImageLoad() {
    const wait = document.querySelector(".waitTillLoaded");
    wait.classList.toggle("loadImage");
};

// give random number to the image and display it
function displayBackground(imgNum) {
    const image = new Image();
    image.src = `img/${imgNum}.jpg`;
    background.prepend(image);
    image.classList.add("backgroundImg");

    image.classList.add("waitTillLoaded");
    image.addEventListener("load", handleImageLoad);
};

// create random number 
function genRandomNum() {
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
};


function init() {
    const randomNumber = genRandomNum();
    displayBackground(randomNumber);
};

init();