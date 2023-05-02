export { NavBarMenu };
class NavBarMenu extends HTMLElement {
    constructor() {
        super();
        this.barraMenu();
    }
    barraMenu() {
        this.innerHTML = /* html */ `
        <div class="contEncabezado">
            <div class="logo">
                <img src="img/hackstore.jpg" alt="logo Hackstore"/>			
            </div>
            <ul class="contenedorLinks">
                <li class="links-item"><a href="index.html">PELICULAS</a></li>
                <li class="links-item"><a href="movieGenero.html">GENERO</a></li>
                <li class="links-item"><a href="movieAdultos.html">ADULTOS</a></li>
                <li class="links-item"><a href="movieFecha.html">POR FECHA</a></li>
                <li class="links-item"><a href="moviePopularidad.html">POPULARIDAD</a></li>
                <li class="links-item"><a href="movieVotacion.html">MAYOR VOTACIÓN</a></li>
            </ul>
            <div>
                <!--<input type="search" placeholder="Buscar" aria-label="Buscar">-->
                <button type="submit">BUSCAR</button>
            </div>
        </div>
        `;
    }
    
}
customElements.define('nav-bar-menu', NavBarMenu);