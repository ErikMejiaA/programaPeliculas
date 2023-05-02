document.addEventListener("DOMContentLoaded", () => {
    //aqui van las funciones que se ejecutan cuando se cargue el dom
    getGeneros();

});

const URL_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=6a6033037b480b67f52b2cb780b8e3a2&language=es-MX";

// funcion async y try catch y el await 
async function getGeneros() {
    try {
        const response = await fetch(URL_API);
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            cargarGeneros(data);

        } else if (response.status === 401) {
            console.log("Pusiste la llave mal");

        } else if (response.status === 404) {
            console.log("El genero que buscas no existe");

        } else {
            console.log("Hubo un error y no sabemos que ocurrio")
        }

    } catch (error) {
        console.log(error);
    }
}

function cargarGeneros(generos) {
    const selectGenero = document.querySelector('#selectGenero');

    generos.genres.forEach(itemGenero => {
        console.log(itemGenero.name)
        const item = document.createElement('option');
        item.value = itemGenero.id;
        item.innerHTML = itemGenero.name;
        selectGenero.appendChild(item);
    });

}

