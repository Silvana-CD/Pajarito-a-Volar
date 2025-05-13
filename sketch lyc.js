let letras = [];
let score=0;
let gameover = false;
let imgPOU

let abecedario = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
function setup(){      
    createCanvas(500,500);
}
    function preload(){

        imgPOU=loadImage("leo.png")
}



function draw(){
    background ("addImage(imgPOU)");
    
    
    fill(255);
    textSize(20);
    text("SCORE: "+ score,20, 30);
    
    if(!gameover) {
        if(frameCount % 60 === 0) {

            let indice = int(random(26)); // o floor(random(26));
            let letra = abecedario[indice];
            let x = random(50, width - 50);
            letras.push({letra: letra, x: x, y: 50});
        }
       for (let i = 0; i < letras.length; i++){
        letras[i].y+= 3;
        text(letras[i].letra, letras[i].x, letras[i].y);

        if (letras[i].y > height) {
            gameover = true;
        }
    }
    } else {
        textSize(30);
        text("¡Game over!",180, height / 2);


    }
}
 
function keyPressed(){
    for (let i = 0; i < letras.length; i++){
        if (key.toUpperCase() === letras[i].letra) {
            letras.splice(i, 1);
            score++;
            break;
        }
    }
}