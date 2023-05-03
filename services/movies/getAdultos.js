document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom
    getMoviesAdulto();
})

async function getMoviesAdulto() {
    for (let pagina = 1; pagina < 501; pagina ++ ) {

        const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX&page=${pagina}`;

        try {
            const response = await fetch(URL_API);
            //console.log(response);

            if (response.status === 200) {
                const data = await response.json();
                cargarPeliculasAdulto(data);

            } else if (response.status === 401) {
                console.log("Pusiste la llave mal");

            } else if (response.status === 404) {
                console.log("La pelicula para adultos que estas buscando no existe");
            } 
            
        } catch (error) {
            console.log(error);
        }
    }
}

function cargarPeliculasAdulto(peliculasAdulto) {

    let adultoPeliculas = [];
    peliculasAdulto.results.forEach((pelicula, posi) => {

       if (pelicula.adult == true) {
            adultoPeliculas.push(peliculasAdulto.results[posi]);

       } else {
        console.log("No se econtraron peliculas para adultos");
       }
    });
    console.log(adultoPeliculas);

    let adultosHTML = '';
    adultoPeliculas.forEach(pelicula => {
        adultosHTML += /* html */ `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"/>
                <h3 class="titulo">${pelicula.title}</h3>
                <h3 class="titulo">${pelicula.adult}</h3>
            </div>
       `; 
    });

    document.querySelector('#contenedor').innerHTML = adultosHTML;
}

