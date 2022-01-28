const contenedorTarjetas = document.querySelector("#tarjetas")
const contenedorSinResultados = document.querySelector(".contenedor-sin-resultados")
const header = document.getElementById("header");
const main = document.getElementById("main");


// Paginado
const firstPage = document.getElementById("first-page");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const lastPage = document.getElementById("last-page");

//Buscador
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//Menu desplegable 
const burgerMenu = document.querySelector(".burger-menu");
const modalBg = document.querySelector(".modal-bg");
const closeMenu = document.querySelector(".close-menu");

//Carta individual
const modalCartaIndividual = document.getElementById("modal-carta-individual");
const botonIrAtrasModal = document.querySelector(".boton-modal-ir-atras");
const botonCerrarModalCarta = document.querySelector(".boton-cerrar-modal-carta");

// Switch toggle 
const switchToggle = document.querySelector(".switch-toggle-pokaballs");
const pokeball = document.getElementById("pokeball");
const ultraball = document.getElementById("ultraball");

//Mode dark menu desktop 
const desktopPokeball = document.getElementById("toggle"); 

//Funcionalidad Menu desplegable 
burgerMenu.addEventListener('click', () => {
    modalBg.classList.add('open-aside');
})

closeMenu.addEventListener('click', () => {
    modalBg.classList.remove('open-aside')
})

let paginaActual = 1
let ultimaPagina = 0

// FUNCIONES REDUCE A HTML

const aHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc +
            `
        <div class="item" id="${elemento.id}">
        <img class="card-img" src="${elemento.images.large}" alt="${elemento.name}">
        </div>`

    }, "")

    return arrayAHtml
}

const attacks = (data) => data.data.attacks.reduce((acc, attack) => {
    return acc + `
    <div class="attacks-container"> 
        <div class="energía-y-nombre-ataque>
            <div class"energy-attack">
                ${energy(attack)}        
            </div>
            <div>
                <p class="attack-damage-name"> ${attack.name} - <span>${attack.damage}</span></p>
            <div>
        </div>
        <div class="ataque-text">
            <p>
                ${attack.text}
            </p>
        </div>
    </div>
    `
}, "")

const energy = (attack) => {
    let acc = ""
    for(let i = 0; i < attack.cost.length; i++){
        acc += `<img class="img-energy" src="https://raw.githubusercontent.com/SmeraldaKa0s/Pokemon-TCG-API/master/assets/${attack.cost[i].toLowerCase()}.png">`
    }
    return acc
}

const habilidades = (data) => {
    return `
    <div class="">
        <div class="type-name>
            <p>${data.data.abilities[0].type}</p>    
            <p>${data.data.abilities[0].name}</p>
        </div>
        <p>${data.data.abilities[0].text}</p>
    </div>
    `
}  

const debilidad = (data) => data.data.weaknesses.reduce((acc, debilidad) => {
    return acc + `
    <div class="container-habilidades">
        <img src="https://raw.githubusercontent.com/SmeraldaKa0s/Pokemon-TCG-API/master/assets/${debilidad.type.toLowerCase()}.png">
        <p class="resistencia-text">${debilidad.value}</p>
    </div>
    `
}, "")

const resistencia = (data) => data.data.resistances.reduce((acc, resistencia) => {
    return acc + `
    <div class="container-habilidades">
        <img src="https://raw.githubusercontent.com/SmeraldaKa0s/Pokemon-TCG-API/master/assets/${resistencia.type.toLowerCase()}.png">
        <p class="resistencia-text">${resistencia.value}</p>
    </div>
    `
}, "")

const costoRetirada = (data) => data.data.retreatCost.reduce((acc, retirada) => {
    return acc + `
       <img src="https://raw.githubusercontent.com/SmeraldaKa0s/Pokemon-TCG-API/master/assets/${retirada.toLowerCase()}.png">
    `
}, "")

modalCartaIndividual.style.display = "none"

const mostrarCartaIndividual = (data) => {
    header.style.display = "none"
    main.style.display = "none"
    modalCartaIndividual.style.display = "flex"
    return `
    <div class="modal-container-carta">
        <div class="modal-botones">
            <div class="modal-left-top">
                <button class="boton-modal boton-modal-ir-atras" id="boton-modal-ir-atras">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="modal-dibujo-pokedex">
                    <div class="modal-dibujo-pokedex-circulo">
                        <div class="modal-dibujo-pokedex-circulodoble"></div>
                        <div class="modal-dibujo-pokedex-circulointerior"></div>
                    </div>
                    <div class="container-modal-dibujos">
                        <div class="modal-dibujo-pokedex-circulo-rojo">
                            <div class="modal-dibujo-pokedex-circulo-rojoblanco"></div>
                        </div>
                        <div class="modal-dibujo-pokedex-circulo-amarillo">
                            <div class="modal-dibujo-pokedex-circulo-amarilloblanco"></div>
                        </div>
                        <div class="modal-dibujo-pokedex-circulo-verde">
                            <div class="modal-dibujo-pokedex-circulo-verdeblanco"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-right-top">
                    <h2 class="modal-container-txt-name">${data.data.name}</h2>
                    <h2 class="modal-container-txt-primary">${data.data.subtypes} - HP: ${data.data.hp}</h2>
                </div>
            </div>
        </div>
        <div class="cartas-individuales">
            <div class="modal-img-carta" >
                <div class="container-circles">
                    <div class="circle-red"></div>
                    <div class="circle-red"></div>
                </div>
                <div class="modal-img-carta-background">
                    <img src="${data.data.images.large}" alt="${data.data.name}">
                </div>
                <div class="container-volume">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </div>
        <div class="container-line">
            <div class="line-red"></div>
            <div class="line-blue"></div>
        </div>
        <div class="container-icons">
            <i class="fas fa-circle"></i>
            <div class="rectangle"></div>
            <i class="fas fa-plus"></i>
        </div>
    </div>
    <div class="modal-container-carta-txt">
        <div class="modal-container-carta-boton">
            <button class="boton-modal boton-cerrar-modal-carta" id="boton-cerrar-modal-carta">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-container-carta-info-txt">
            <h2 class="modal-container-carta-info-title">ATTACKS</h2>
            <p class="modal-container-carta-info-habilties">${data.data.abilities ? habilidades(data) : ""} ${attacks(data)}</p>
        </div>      
        <div class="modal-right-center">
            <div class="modal-right-center-bot">
                <div>
                    <h2 class="modal-container-carta-info-title">WEAKNESS</h2>
                    <p class="modal-right-center-txt">${data.data.weaknesses ? debilidad(data) : "N/A"}</p>
                </div>
                <div>
                    <h2 class="modal-container-carta-info-title">RESISTANCE</h2>
                    <p class="modal-right-center-txt">${data.data.resistances ? resistencia(data) : "N/A"}</p>
                </div>
                <div>
                    <h2 class="modal-container-carta-info-title">RETRAT COST</h2>
                    <p class="modal-right-center-txt">${data.data.retreatCost ? costoRetirada(data) : "None"}</p>
                </div>
            </div>
        </div>
        <div class="modal-right-bottom">
            <div class="modal-right-bottom-txt">
                <h2 class="modal-container-carta-info-titles">ARTIST</h2>
                <p>${data.data.artist}</p>
            </div>
            <div class="modal-right-bottom-txt">
                <h2 class="modal-container-carta-info-titles">RARITY</h2>
                <p>${data.data.rarity ? data.data.rarity : "None"}</p>
            </div>
            <div class="modal-right-bottom-txt">
                <h2 class="modal-container-carta-info-titles">SET</h2>
                <p>${data.data.set.name}</p>
            </div>
        </div>
    </div>
    `
}

const urlPokemon = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=20&page=1`)
    const data = await respuesta.json()
    contenedorTarjetas.innerHTML = aHTML(data)    
    cartaIndividualClickleable()   
}

urlPokemon()

//Carta individual

const cartaIndividualClickleable = () => {
    const cartasIndividuales = document.querySelectorAll(".item")

    for(let i = 0; i < cartasIndividuales.length; i++){
        cartasIndividuales[i].onclick = () => {
            const idNumerico = cartasIndividuales[i].id
            infoCartaIndividual(idNumerico)        
        }
    }
}

const infoCartaIndividual = async (id) => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
    const data = await respuesta.json()
    modalCartaIndividual.innerHTML = mostrarCartaIndividual(data)
    const botonModalIrAtras = document.getElementById("boton-modal-ir-atras")
    const botonModalCerrarCarta = document.getElementById("boton-cerrar-modal-carta")
    cerrarModal(botonModalCerrarCarta)
    cerrarModal(botonModalIrAtras)
}

// Boton modal carta

const cerrarModal = (boton) => {
    boton.onclick = () => {
        header.style.display = "flex"
        main.style.display = "flex"
        modalCartaIndividual.style.display = "none"
    }
}


// PAGINADO

/* const ultimaPaginaBusqueda = (data) => {
    let valorUltimaPagina = Math.ceil(data.totalCount/20)
    botonUltimaPaginaTablasCard.onclick = () => {
        const fetchBusquedaTablasEImagenes = async () => {
            const respuesta = await fetch(``)
            const data = await respuesta.json()
            tablaInfoPokemon.innerHTML = tablasHTML(data)
        }
        return fetchBusquedaTablasEImagenes()
    }   
}

botonPrimeraPaginaTablasCard.onclick = () => {
    paginadoActual = 1
    botonPrimeraPaginaTablasCard.disabled = true
    botonAnteriorTablasCard.disabled = true
    fetchBusquedaTablasEImagenes()
}

botonSiguienteTablasCard.onclick = () => {
    paginadoActual++
    fetchBusquedaTablasEImagenes()
}

botonAnteriorTablasCard.onclick = () => paginadoActual !== 1 && (paginadoActual -- && fetchBusquedaTablasEImagenes()) */


// const primeraPagina = (boton, funcion) => {
// 	boton.onclick = () => {
// 		paginaActual = 1;
// 		firstPage.disabled = true;
// 		prev.disabled = true;
// 		next.disabled = false;
// 		lastPage.disabled = false;
// 		funcion();
// 	};
// };

//     boton.onclick = () => {
//         paginaActual = 1
//         firstPage.disabled = true
//         prev.disabled = true
//         next.disabled = false
//         lastPage.disabled = false
//         funcion()
//     }


// //primeraPagina(firstPage, urlPokemon())

// const paginaSiguiente = (boton, funcion) => {
// 	boton.onclick = () => {
// 		paginaActual++;
// 		console.log(paginaActual);
// 		firstPage.disabled = false;
// 		prev.disabled = false;
// 		if (paginaActual === 1441) {
// 			next.disabled = true;
// 			lastPage.disabled = true;
// 		}
// 		funcion();
// 	};
// };



// paginaAnterior(prev, urlPokemon())

// const paginaUltima = (boton, funcion) => {
// 	boton.onclick = () => {
// 		paginaActual = 1441;
// 		prev.disabled = false;
// 		firstPage.disabled = false;
// 		if (paginaActual === 1441) {
// 			next.disabled = true;
// 			lastPage.disabled = true;
// 		}
// 		funcion();
// 	};
// };

//     boton.onclick = () => {
//         paginaActual = 1441
//         prev.disabled = false
//         firstPage.disabled = false
//         if (paginaActual === 1441) {
//             next.disabled = true
//             lastPage.disabled = true
//         }
//         funcion()
//     }


// paginaUltima(lastPage, urlPokemon())

//Búsqueda 

let busquedaPorInput = ""

const inputBusquedaPokemon = async () => {
    const tieneParametro = busquedaPorInput.includes(':')
    if (!tieneParametro) busquedaPorInput = 'name:' + busquedaPorInput
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${busquedaPorInput}&pageSize=20&page=${paginaActual}`)
    const data = await res.json()
    contenedorTarjetas.innerHTML = aHTML(data)
    if(!data.data.length){ 
        contenedorTarjetas.style.display= "none"
        contenedorSinResultados.style.display= "flex"
    }
    else{ 
        contenedorTarjetas.style.display= "flex"
        contenedorSinResultados.style.display= "none"
    }
    cartaIndividualClickleable()   
}

searchForm.onsubmit = (e) => {
    e.preventDefault()
    busquedaPorInput = searchInput.value
    inputBusquedaPokemon()
}

//Desktop switch toggle

desktopPokeball.onclick = () => {
    document.body.classList.toggle("dark-mode")
    
    const isDark = document.body.className === "light-mode dark-mode"
    
    desktopPokeball.classList.toggle("active", isDark)
    pokeball.classList.toggle("pokeball-hide", isDark)
    ultraball.classList.toggle("ultraball-hide", !isDark)
}

// Switch toggle pokeballs tablet-mobile 
/* 
pokeball.onclick = () => {
    pokeball.classList.add("pokeball-hide")
    ultraball.classList.remove("ultraball-hide")
}

ultraball.onclick = () => {
    pokeball.classList.remove("pokeball-hide")
    ultraball.classList.add("ultraball-hide")
}  */

//Dark mode

switchToggle.onclick = () => {
    document.body.classList.toggle("dark-mode")
    const isDark = document.body.className === "light-mode dark-mode"

    desktopPokeball.classList.toggle("active", isDark)
    pokeball.classList.toggle("pokeball-hide", isDark)
    ultraball.classList.toggle("ultraball-hide", !isDark)
};

