document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom
    getPelicula();

});

let pagina = 1;
let e = '';
//+++++++++++++++++++++++++++selector--------------------------------------
document.querySelector('#selectGenero').addEventListener('change', (a) => {
    e = a.target.value;
    localStorage.setItem("e", JSON.stringify(e))
    getPelicula()
});
//++++++++++++++++++++++++++++---------------------------------------------

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

//funcion async utilizando try catch y el await
async function getPelicula() {
    const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX&page=${pagina}`;

    try {
        const response = await fetch(URL_API);
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarPeliculasGenero(data);

        } else if (response.status === 401) {
            console.log("Pusiste la llave mal");

        } else if (response.status === 404) {
            console.log("La pelicula perteneciente a ese genero no existe");
        }
        
    } catch (error) {
        console.log(error);
    }
}

function cargarPeliculasGenero(peliculasGenero) {
    
    e = JSON.parse(localStorage.getItem("e"));
    let generoPeliculas = [];
    peliculasGenero.results.forEach((pelicula, posi) => {
        pelicula.genre_ids.forEach(peliculaId => {
            if (peliculaId == e) {
                generoPeliculas.push(peliculasGenero.results[posi])
            }
        });
    });
    console.log(generoPeliculas);

    let peliculasHTML = '';
    generoPeliculas.forEach(pelicula => {
        peliculasHTML += /* html */ `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"/>
                <h3 class="titulo">${pelicula.title}</h3>
            </div>
        `;
    });

    document.querySelector('#contenedor').innerHTML = peliculasHTML;
}


