let peliculasApi = [];
let f = '';
peliculasApi = JSON.parse(localStorage.getItem("peliculasApi"));

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom

    cargarPeliculasFecha(peliculasApi);

});

//--------------------------------------------------------------
document.querySelector('#selectFecha').addEventListener('change', (ff) => {
    f = ff.target.value;
    localStorage.setItem("f", JSON.stringify(f))
    console.log(f);
    cargarPeliculasFecha(peliculasApi);
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function cargarPeliculasFecha(peliculasFecha) {

    f = JSON.parse(localStorage.getItem("f"));

    let fechaPeliculas = [];
    peliculasFecha.forEach(pagina => {
        pagina.forEach((pelicula, posi) => {
            //console.log(pelicula.release_date.substring(0,7))
            if (pelicula.release_date.substring(0,7) == f) {
                fechaPeliculas.push(pagina[posi]);
            }
        });
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