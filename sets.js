const contenedorSets = document.querySelector(".cotenedor-sets")

let paginaActual = 1;
let ultimaPagina = 0;

//Sets

const setsPokemon = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/sets?pageSize=20&page=${paginaActual}`
	);
	const data = await respuesta.json();
	// console.log(data);
	// console.log(data.data);
	contenedorSets.innerHTML = setsHTML(data);
}

setsPokemon();

const setsHTML = (data) => {
    const arraySets = data.data.reduce((acc, elemento) => {
        return (
            acc +
            `
			<div class="tarjetas-sets">
            <div class="cotenedor-imagen-sets">
                  <img src="${elemento.images.logo}">
            </div>
				   <div class="contenedor-logo-texto-sets">
                   
						 <div class="contenedor-logo-sets">
              <img src="${elemento.images.symbol}">
              </div>
							<div class="contenedor-texto-sets">
				         <p> Name: ${elemento.name} </p>
						 <p> Date: ${elemento.releaseDate} </p>
                         <p> Total number of cards: ${elemento.total} </p>
				         <p> Serie: ${elemento.series} </p>
                         <p> Legalities: ${elemento.legalities.unlimited} </p>
                         <p> Code: ${elemento.ptcgoCode} </p>
               </div>
           </div>		  	
			</div>
			`
        );
    }, "");

    return arraySets;
};

//paginado sets
const firstPageSets = document.getElementById("first-page-sets");
const prevSets = document.getElementById("prev-sets");
const nextSets = document.getElementById("next-sets");
const lastPageSets = document.getElementById("last-page-sets");


firstPageSets.onclick = () => {
	paginaActual = 1;
	firstPageSets.disabled = true;
	prevSets.disabled = true;
	nextSets.disabled = false;
	lastPageSets.disabled = false;
	setsPokemon();
};

nextSets.onclick = () => {
	paginaActual++;
	firstPageSets.disabled = false;
	prevSets.disabled = false;
	if (paginaActual === 7) {
		nextSets.disabled = true;
		lastPageSets.disabled = true;
	}
	setsPokemon();
};

prevSets.onclick = () => {
	paginaActual--;
	nextSets.disabled = false;
	lastPageSets.disabled = false;
	if (paginaActual === 1) {
		prevSets.disabled = true;
		firstPageSets.disabled = true;
	}
	setsPokemon();
};

lastPageSets.onclick = () => {
	paginaActual = 7;
	prevSets.disabled = false;
	firstPageSets.disabled = false;
	if (paginaActual === 7) {
		nextSets.disabled = true;
		lastPageSets.disabled = true;
	}

	setsPokemon();
};

