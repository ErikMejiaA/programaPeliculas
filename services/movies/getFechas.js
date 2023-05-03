document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom

    getFechas();
});

let agregarFechas = [];
 //total de registros 500
 //se van hacer para solo 4 registros mas 1
let numeroRegistros = 4;

async function getFechas() {
   
    for (let pagina = 1; pagina < numeroRegistros + 1; pagina ++ ) {

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

        if (pagina == numeroRegistros) {
            mostrarFechas();
        }
    }
}

//para fecha de ejemplo h = "2023-02-15" => AA/MM/DD
//para obtener el año h.substring(0,4) = "2023"
//para obtener el año y mes h.substring(0,7) = "2023-02"

function cargarFechas(fechas) {

    fechas.results.forEach(pelicula => {
        
        if (agregarFechas.length == 0){
            agregarFechas.push(pelicula.release_date.substring(0,7));//obtenemos solo el año y el mes

        } else {
            let existeFecha = agregarFechas.some(fecha => fecha === pelicula.release_date.substring(0,7));

            if (existeFecha == false) {
                agregarFechas.push(pelicula.release_date.substring(0,7));
            }
        }
    });
    
}

console.log(agregarFechas);

function mostrarFechas() {
    const selectFecha = document.querySelector('#selectFecha');

    agregarFechas.forEach(itemdate => {
        const item = document.createElement('option');
        item.innerHTML = itemdate;
        selectFecha.appendChild(item);
    });
}
