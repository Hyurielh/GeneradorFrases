let contenedor_poema = document.querySelector('.poema-contenedor');
let titulo = document.querySelector('#titulo-poema');
let poema = document.querySelector('#poema');
let libro = document.querySelector('#libro');
let boton = document.querySelector('#generador');
let copiar = document.querySelector('.copiar');
let lastIndex = -1;


let arrayPoemas = [];
leerPoemas();

async function leerPoemas() {
    const response = await fetch('data/poemas.json');
    const poemas = await response.json();
    arrayPoemas = poemas;

    boton.addEventListener('click', mostrarPoema);
    copiar.addEventListener('click', copiarPoema);
    
    mostrarPoema();
}

function mostrarPoema() {
    let indice;
    do {
        
        indice = Math.floor(Math.random() * arrayPoemas.length)    
    } 
    while (indice === lastIndex)
    
    lastIndex = indice;    
    contenedor_poema.style.opacity = 0;

    setTimeout(() => {
        contenedor_poema.style.opacity = 1;
        titulo.textContent = arrayPoemas[indice].titulo;
        poema.textContent = arrayPoemas[indice].texto;
        libro.textContent = arrayPoemas[indice].libro;
    }, 500);
}

function copiarPoema() {
    let textoACopiar = `${titulo.textContent}\n\n${poema.textContent}\n\n${libro.textContent}`;
    navigator.clipboard.writeText(textoACopiar).then(() => {
        copiar.textContent = '¡Copiado!';
        setTimeout(() => {
            copiar.textContent = 'Copiar';
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}