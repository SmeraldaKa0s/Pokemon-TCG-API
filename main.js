const contenedorTarjetas = document.querySelector(".tarjetas");
const contenedorSets = document.querySelector(".cotenedor-sets");

// Paginado
const firstPage = document.getElementById("first-page");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const lastPage = document.getElementById("last-page");

let paginaActual = 1;
let ultimaPagina = 0;

const urlPokemon = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${paginaActual}`
	);
	const data = await respuesta.json();
	console.log(data);
	console.log(data.data);
	contenedorTarjetas.innerHTML = aHTML(data);
};

urlPokemon();

const aHTML = (data) => {
	const arrayReduc = data.data.reduce((acc, elemento) => {
		return (
			acc +
			`
        <div class="item" id="${elemento.id}">
        <img class="card-img" src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
		);
	}, "");

	return arrayReduc;
};

//Sets

const setsPokemon = async () => {
	const respuesta = await fetch(`https://api.pokemontcg.io/v2/sets`);
	const data = await respuesta.json();
	console.log(data);
	console.log(data.data);

	contenedorSets.innerHTML = setsHTML(data);
};

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
				         <p> ${elemento.name} </p>
				         <p> ${elemento.id} </p>
						     <p> ${elemento.releaseDate} </p>
				        <p> ${elemento.series} </p>
               </div>
           </div>
			  	
			
			</div>
			`
		);
	}, "");

	return arraySets;
};

// Paginado

firstPage.onclick = () => {
	paginaActual = 1;
	firstPage.disabled = true;
	prev.disabled = true;
	next.disabled = false;
	lastPage.disabled = false;
	urlPokemon();
};

next.onclick = () => {
	paginaActual++;
	firstPage.disabled = false;
	prev.disabled = false;
	if (paginaActual === 1441) {
		next.disabled = true;
		lastPage.disabled = true;
	}
	urlPokemon();
};

prev.onclick = () => {
	paginaActual--;
	next.disabled = false;
	lastPage.disabled = false;
	if (paginaActual === 1) {
		prev.disabled = true;
		firstPage.disabled = true;
	}
	urlPokemon();
};

lastPage.onclick = () => {
	paginaActual = 1441;
	prev.disabled = false;
	firstPage.disabled = false;
	if (paginaActual === 1441) {
		next.disabled = true;
		lastPage.disabled = true;
	}
	urlPokemon();
};
