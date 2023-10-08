let palabraElegida;
let errores = 0;
let aciertos = 0;

const palabras = ['CURSO','PROGRAMACION','JAVASCRIPT','DESARROLLO','TECNOLOGIA','FRONTEND','BACKEND','SERVIDOR','NAVEGADOR','SITIO','WEB','HTML','CSS','FRAMEWORK','DISEÑO','DATOS','RESPONSIVE','INTERFAZ','API','DOM','FUNCION','CODERHOUSE','OBJETOS','CONDICION','ARREGLOS','ESTILOS','DOCUMENTO','INTERVALO','LOGICA','RENDERIZAR','BOOTSTRAP'];

function id (str){
    return document.getElementById(str);
}

const palabraAleatoria = id('palabraAleatoria');
const imagen  = id ('imagenAhorcado');
const botonLetras = document.querySelectorAll('#letras button');

palabraAleatoria.addEventListener('click', iniciarAleatorio);

function iniciarAleatorio(event){
    imagen.src = '../img/0_fallos.png'
    palabraAleatoria.disabled=true;
    for(let i=0; i<botonLetras.length; i++){
        botonLetras[i].disabled=false;
    }
    errores = 0;
    aciertos = 0;
    const palabraOculta = id('palabraOculta');
    palabraOculta.innerHTML = '';
    const valor = Math.floor(Math.random() * palabras.length);
    palabraElegida = palabras[valor];
    console.log(palabraElegida);
    for(let i=0; i<palabraElegida.length; i++){
        palabraOculta.appendChild(document.createElement('span'));
    }
}

for(let i=0; i<botonLetras.length; i++){
    botonLetras[i].addEventListener('click', clickLetras);
}

function clickLetras (event){
    const posicion = document.querySelectorAll('#palabraOculta span')
    const botonLetra = event.target;
    botonLetra.disabled = true;
    const letra = botonLetra.innerHTML.toUpperCase( );
    const palabra = palabraElegida.toUpperCase( );

    let intento = false;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            posicion[i].innerHTML = letra;
            aciertos++;
            intento = true;
        }
    }

    if(intento==false){
        errores++;
        imagen.src = `../img/${errores}_fallos.png`;
    }

    if(errores == 7){
        id('resultado').innerHTML = 'Perdiste, la palabra era '+palabraElegida;
        gameOver();
    }else if(aciertos == palabraElegida.length){
        id('resultado').innerHTML = 'FELICIDADES, GANASTE!!!';
        imagen.src = `../img/ganador.png`;
        gameOver();
    }

    console.log('La letra ' + letra + ' en la palabra ' + palabra + ' ¿existe?: ' + intento);
}

function gameOver(){
    for(let i=0; i<botonLetras.length; i++){
        botonLetras[i].disabled=true;
    }
    palabraAleatoria.disabled=false;
}

gameOver();

