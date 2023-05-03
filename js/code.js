//este es el codigo de listMovieFecha que se puede pegar en ese archvio para registrar todas las paginas
document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom
    getPelicula();

});

let pagina = 1;
let f = '';
//-------------------------------------------------------------------------------
document.querySelector('#selectFecha').addEventListener('change', (ff) => {
    f = ff.target.value;
    localStorage.setItem("f", JSON.stringify(f))
    console.log(f);
    getPelicula();
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

async function getPelicula() {
    const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX&page=${pagina}`;

    try {
        const response = await fetch(URL_API);
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarPeliculasFecha(data);

        } else if (response.status === 401) {
            console.log("Pusiste la llave mal");

        } else if (response.status === 404) {
            console.log("La pelicula perteneciente a esa fecha no existe");
        }
        
    } catch (error) {
        console.log(error);
    }
}

function cargarPeliculasFecha(Peliculasfecha) {

    f = JSON.parse(localStorage.getItem("f"));

    let fechaPeliculas = [];
    Peliculasfecha.results.forEach((pelicula, posi) => {
        //console.log(pelicula.release_date.substring(0,7))
        if (pelicula.release_date.substring(0,7) == f) {
            fechaPeliculas.push(Peliculasfecha.results[posi]);
        }
    });

    let peliculasHTML = '';
    fechaPeliculas.forEach(pelicula => {
        peliculasHTML += /* html */ `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"/>
                <h3 class="titulo">${pelicula.title}</h3>
                <h3 class="titulo">${pelicula.release_date}</h3>
            </div>
        `;
    });
    document.querySelector('#contenedor').innerHTML = peliculasHTML;
}