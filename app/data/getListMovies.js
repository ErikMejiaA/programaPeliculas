document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom
    datosPeliculas();
});

let peliculasApi = [];
//total de registros 500
//se van hacer para solo 4 registros mas 1
let numeroRegistros = 4;

async function datosPeliculas() {
    
    for (let pagina = 1; pagina < numeroRegistros + 1; pagina ++ ) {

        const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX&page=${pagina}`;

        try {
            const response = await fetch(URL_API);
            //console.log(response);

            if (response.status === 200) {
                const data = await response.json();
                
                //guardamos la data en el local storage
                peliculasApi.push(data.results)
                localStorage.setItem("peliculasApi", JSON.stringify(peliculasApi));

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
console.log(peliculasApi);