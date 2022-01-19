//const contenedorTarjetas = document.querySelector(".tarjetas");
const contenedorSets = document.querySelector(".cotenedor-sets");
const contenedorTarjetas = document.querySelector("#tarjetas");
const tablaInfoPokemon = document.querySelector("#tabla-resultados");
const inputBusquedaCartaIndividual = document.querySelector(
	"#input-busqueda-carta-individual"
);
const selectorVerComo = document.querySelector("#selector-ver-como");
const selectorOrdenarPorNombreYNumero = document.querySelector(
	"#selector-ordenar-nombre-numero"
);
const selectorOrdenarPorAscDesc = document.querySelector(
	"#selector-ordenar-asc-desc"
);
const contenedorCartas = document.querySelector("#contenedor-cartas");
const cajaasdasd = document.querySelector("#cartas-indi");

// Paginado
const firstPage = document.getElementById("first-page");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const lastPage = document.getElementById("last-page");

let paginaActual = 1;
let ultimaPagina = 0;

//Sets

const setsPokemon = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/sets?pageSize=20&page=${paginaActual}`
	);
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
                         <p> Total number of cards: ${elemento.total} </p>
				         <p> Serie: ${elemento.series} </p>
               </div>
           </div>
			  	
			
			</div>
			`
		);
	}, "");

	return arraySets;
};

const urlPokemon = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${paginaActual}`
	);
	const data = await respuesta.json();
	contenedorTarjetas.innerHTML = aHTML(data);
};

//urlPokemon()

const fetchTablas = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/cards?pageSize=20&page=${paginaActual}`
	);
	const data = await respuesta.json();
	tablaInfoPokemon.innerHTML = tablasHTML(data);
};

//fetchTablas()

const fetchImagenes = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/cards?pageSize=20&page=${paginaActual}`
	);
	const data = await respuesta.json();
	//contenedorCartas.innerHTML = aHTML(data)
	console.log(data.data[6]);
	//console.log(crearCartasIndividuales(data))
};

fetchImagenes();

const tablasHTML = (data) => {
	const arrayAHtml = data.data.reduce(
		(acc, elemento) => {
			return (
				acc +
				`
        <tbody>
            <tr>
                <td>${elemento.name}</td>
                <td>${elemento.nationalPokedexNumbers}</td>
                <td>${elemento.set.name}</td>
                <td>${elemento.rarity}</td>
                <td>${elemento.types[0]}</td>
                <td>${elemento.subtypes[0]}</td>
                <td>${
									elemento.resistances &&
									elemento.resistances.length &&
									elemento.resistances[0].type
										? elemento.resistances[0].type
										: "None"
								}</td>
                <td>${
									elemento.weaknesses &&
									elemento.weaknesses.length &&
									elemento.weaknesses[0].type
										? elemento.weaknesses[0].type
										: "None"
								}</td>            
            </tr>
        </tbody>
        `
			);
		},
		`
    <thead>
           <tr>
                <th>Name</th>
                <th>National Pokedex</th>
                <th>Set</th>
                <th>Rarity</th>
                <th>Types</th>
                <th>Subtypes</th>
                <th>Resistances</th>
                <th>Weaknesses</th>
            </tr>
    </thead> `
	);

	return arrayAHtml;
};

const aHTML = (data) => {
	const arrayAHtml = data.data.reduce((acc, elemento) => {
		return (
			acc +
			`
        <div class="item" id="${elemento.id}">
        <img class="card-img" src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
		);
	}, "");

	return arrayAHtml;
};

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

const attacks = (elemento) =>
	elemento.attacks.reduce((acc, attack) => {
		console.log(attack);
		return (
			acc +
			`
 <p>${attack.name}</p>
 `
		);
	}, "");

const crearCartasIndividuales = (data) => {
	const html = data.data.reduce((acc, elemento, i) => {
		return (
			acc +
			`
        <article>
            <div class="container">
                <div class="card-info">
                    <h2>${elemento.name}</h2>
                    <div class="card-info-title">
                        <p>${elemento.supertype} - ${elemento.supertype}</p>
                        <div class="card-info-txt">
                            <p>HP</p>
                            <p>${elemento.hp}</p>
                        </div>             
                    </div>
                    <img src="${elemento.images.large}" alt="">
                </div>
                <div class="card-info-container">
                    <div class="card-info-left">
                        <div>
                            <div>
                                <h3>ATTACKS</h3>
                                <div class="card-info-left-primary">
                                    <p>☀☀☀</p><!-- img -->
                                    ${attacks(elemento)}
                                </div>
                            </div>                        
                            <div>
                                <h3>RULES</h3>
                                <p class="card-info-txt-font">${
																	elemento.attacks.text
																}</p>
                            </div>
                        </div>
                    <div>
                        <div class="card-info-left-secondary">                        
                            <div class="card-info-left-mr">
                                <h3>WEAKNESS</h3>
                                <div>
                                    <p>${elemento.attacks.weakness.type}</p>
                                    <p>${elemento.attacks.weakness.value}</p>
                                </div>
                            </div>
                            <div  class="card-info-left-mr">
                                <h3>RESISTANCE</h3>
                                <div>
                                    <p>${elemento.attacks.resistances.type}</p>
                                    <p>${elemento.attacks.resistances.value}</p>
                                </div>
                            </div>
                            <div class="card-info-left-mr">
                                <h3>RETRAT COST</h3>
                                <div>
                                    <p>${elemento.attacks.retreatCost}</p>
                                </div>
                            </div>        
                        </div>                        
                        <div class="card-info-left-terciary">        
                            <div class="card-info-left-mr">
                                <h3>ARTIST</h3>
                                <p>${elemento.artist}</p>
                            </div>
                            <div class="card-info-left-mr">
                                <h3>RARITY</h3>
                                <p>${elemento.rarity}</p>
                            </div>
                            <div class="card-info-left-mr">
                                <h3>SET</h3>
                                <div>
                                    <p>${elemento.set}/p>
                                </div>                    
                            </div>        
                            </div> 
                        </div>
                    </div>    
                </div>
            </div>
        </article>
    `
		);
	}, "");
	return html;
};

// FORMULARIO BÚSQUEDA Y SORTS DE CARTA-INDIVIDUAL.HTML

// Paginado

const primeraPagina = (boton, funcion) => {
	boton.onclick = () => {
		paginaActual = 1;
		firstPage.disabled = true;
		prev.disabled = true;
		next.disabled = false;
		lastPage.disabled = false;
		funcion();
	};
};

primeraPagina(firstPage, urlPokemon);

const paginaSiguiente = (boton, funcion) => {
	boton.onclick = () => {
		paginaActual++;
		console.log(paginaActual);
		firstPage.disabled = false;
		prev.disabled = false;
		if (paginaActual === 1441) {
			next.disabled = true;
			lastPage.disabled = true;
		}
		funcion();
	};
};

paginaSiguiente(next, urlPokemon);

const paginaAnterior = (boton, funcion) => {
	boton.onclick = () => {
		paginaActual--;
		next.disabled = false;
		lastPage.disabled = false;
		if (paginaActual === 1) {
			prev.disabled = true;
			firstPage.disabled = true;
		}
		funcion();
	};
};

paginaAnterior(prev, urlPokemon);

const paginaUltima = (boton, funcion) => {
	boton.onclick = () => {
		paginaActual = 1441;
		prev.disabled = false;
		firstPage.disabled = false;
		if (paginaActual === 1441) {
			next.disabled = true;
			lastPage.disabled = true;
		}
		funcion();
	};
};

paginaUltima(lastPage, urlPokemon);
