document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom

    getFechas();
});

async function getFechas() {
    for (let pagina = 1; pagina < 501; pagina ++ ) {

        const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX&page=${pagina}`;

        try {
            const response = await fetch(URL_API);
            //console.log(response);

            if (response.status === 200) {
                const data = await response.json();
                cargarFechas(data);

            } else if (response.status === 401) {
                console.log("Pusiste la llave mal");

            } else if (response.status === 404) {
                console.log("La Fecha que estas buscando no existe");
            } 
            
        } catch (error) {
            console.log(error)
        }
    }
}

function cargarFechas(fechas) {

    let agregarFechas = [];
    fechas.results.forEach(pelicula => {
        
        if (agregarFechas.length == 0){
            agregarFechas.push(pelicula.release_date);

        } else {
            let existeFecha = agregarFechas.some(fecha => fecha === pelicula.release_date)

            if (existeFecha == false) {
                agregarFechas.push(pelicula.release_date);
            }
        }
        
        
    });
}

