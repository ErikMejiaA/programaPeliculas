let puntosPopular = 500; //puntuacion para clasificar las peliculas mas populares de la API
let pagina = 1;

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom

    getPelicula();
});

const botonSiguiente = document.querySelector('#btnSiguiente');
const botonAnterior = document.querySelector('#btnAnterior');

botonSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        getPelicula();
    }
});

botonAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        getPelicula();
    }
});

//funcion async utilizando try cath y await
async function getPelicula() {
    const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX&page=${pagina}`;

    try {
        const response = await fetch(URL_API);
        console.log(response);
        if (response.status === 200) {
            const data = await response.json();
            cargarPeliculasPopular(data);

        } else if (response.status === 401) {
            console.log("Pusiste la llave mal");

        } else if (response.status === 404) {
            console.log("La pelicula popular que decea buscar no esta en la lista");
        }
        
    } catch (error) {
        console.log();
    }
}

function cargarPeliculasPopular(peliculasPopular) {

    let popularPeliculas = []; //arreglo para almacenar peliuculas mas populares
    
    peliculasPopular.results.forEach((pelicula, posi) => {
        if (pelicula.popularity >= puntosPopular) {
            console.log(pelicula.popularity)
            
            popularPeliculas.push(peliculasPopular.results[posi]);
            document.querySelector(".popularidad-rango").innerHTML = `peliculas con una puntuación: >${puntosPopular}`;

        } 
    });

    let popularesHTML = '';
    popularPeliculas.forEach(pelicula => {
        popularesHTML += /* html */ `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"/>
            <h3 class="titulo">${pelicula.title}</h3>
            <h3 class="titulo">Puntos: ${pelicula.popularity}</h3>
        </div>
        `;
    });
    document.querySelector('#contenedor').innerHTML = popularesHTML;
}