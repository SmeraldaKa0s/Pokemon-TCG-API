const header = document.getElementById("header");
const main = document.getElementById("main");

const contenedorTarjetas = document.querySelector("#tarjetas");

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
const switchToggle = document.getElementById("switch-toggle");
const pokeball = document.getElementById("pokeball");
const ultraball = document.getElementById("ultraball");

//Funcionalidad Menu desplegable 
burgerMenu.addEventListener('click', () => {
    modalBg.classList.add('open-aside');
})

closeMenu.addEventListener('click', () => {
    modalBg.classList.remove('open-aside')
})

let paginaActual = 1
let ultimaPagina = 0

const tablasHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc + `
        <tbody>
            <tr>
                <td>${elemento.name}</td>
                <td>${elemento.nationalPokedexNumbers}</td>
                <td>${elemento.set.name}</td>
                <td>${elemento.rarity}</td>
                <td>${elemento.types[0]}</td>
                <td>${elemento.subtypes[0]}</td>
                <td>${elemento.resistances && elemento.resistances.length && elemento.resistances[0].type ? elemento.resistances[0].type : "None"}</td>
                <td>${elemento.weaknesses && elemento.weaknesses.length && elemento.weaknesses[0].type ? elemento.weaknesses[0].type : "None"}</td>            
            </tr>
        </tbody>
        `
    }, `<thead>
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
    )

    return arrayAHtml
}


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

const urlPokemon = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=20&page=1`)
    const data = await respuesta.json()
    contenedorTarjetas.innerHTML = aHTML(data)    
    const cartasIndividuales = document.querySelectorAll(".item")
    cartaIndividualClickleable(cartasIndividuales)   
}

urlPokemon()

//Carta individual

const cartaIndividualClickleable = (variable) => {

    for(let i = 0; i < variable.length; i++){
        variable[i].onclick = () => {
            const idNumerico = variable[i].id
            infoCartaIndividual(idNumerico)        
        }
    }
}

const infoCartaIndividual = async (id) => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
    const data = await respuesta.json()
    modalCartaIndividual.innerHTML = mostrarCartaIndividual(data)
    console.log(mostrarCartaIndividual(data))
}

const attacks = (data) => data.data.attacks.reduce((acc, attack) => {
    return acc + `
    <div class="energía-y-nombre-ataque>
        <div>
            ${energy(attack)}        
        </div>
        <div>
            ${attack.name}
            ${attack.damage}
        <span>
    </div>
    <div class="ataque-text">
        <span>
            ${attack.text}
        </span>
    </div>
    `
}, "")

const energy = (attack) => {
    let acc = ""
    for(let i = 0; i < attack.cost.length; i++){
        acc += `<img src="${attack.cost[i].toLowerCase()}.jpg">`
    }
    return acc
}

const habilidades = (data) => {
    return `
    <div class="habilidad">
        <div class="type-name>
            <span>
                ${data.data.abilities[0].type}
            </span>    
            <span>
                ${data.data.abilities[0].name}
            </span>
        </div>
        <span>
            ${data.data.abilities[0].text}
        </span>
    </div>
    `
}  

const debilidad = (data) => data.data.weaknesses.reduce((acc, debilidad) => {
    return acc + `
    <div class="img-debilidad">
    <img src="${debilidad.type.toLowerCase()}.jpg" alt="debilidad">
    </div>
    <span>
        ${debilidad.value}
    </span>
    `
}, "")

const resistencia = (data) => data.data.resistances.reduce((acc, resistencia) => {
    return acc + `
    <div class="img-debilidad">
    <img src="${resistencia.type.toLowerCase()}.jpg" alt="resistencia">
    </div>
    <span>
        ${resistencia.value}
    </span>
    `
}, "")

const costoRetirada = (data) => data.data.retreatCost.reduce((acc, retirada) => {
    return acc + `
    <div class="container-img">
       <img src="${retirada.toLowerCase()}.jpg" alt="retreat-cost">
    </div>
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
                <button class="boton-modal boton-modal-ir-atras">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="modal-dibujo-pokedex">
                    <div class="modal-dibujo-pokedex-circulo">
                        <div class="modal-dibujo-pokedex-circulodoble"></div>
                    </div>
                    <div class="container-modal-dibujos">
                        <div class="modal-dibujo-pokedex-circulo-rojo">
                            <div class="modal-dibujo-pokedex-circulo-rojoblanco"></div>
                        </div>
                        <div class="modal-dibujo-pokedex-circulo-amarillo">
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
                <div class="modal-img-carta-background">
                    <img src="${data.data.images.large} alt="${data.data.name}">
                </div>
            </div>
        </div>
    </div>
    <div class="modal-container-carta-txt">
            <div class="modal-container-carta-boton">
                <button class="boton-modal boton-cerrar-modal-carta">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        <div>
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
                    <h2>ARTIST</h2>
                    <p>${data.data.artist}</p>
                </div>
                <div class="modal-right-bottom-txt">
                    <h2>RARITY</h2>
                    <p>${data.data.rarity ? data.data.rarity : "None"}</p>
                </div>
                <div class="modal-right-bottom-txt">
                    <h2>SET</h2>
                    <p>${data.data.set.name}</p>
                </div>
            </div>
        </div>
    </div>
    `
}

// Boton modal carta

/* botonCerrarModalCarta.onclick = () => {
    header.style.display = "flex"
    main.style.display = "flex"
    modalCartaIndividual.style.display = "none"
}

botonIrAtrasModal.onclick = () => {
    header.style.display = "flex"
    main.style.display = "flex"
    modalCartaIndividual.style.display = "none"
    // buscar si esta en una pagina en especifico 
}  */

// PAGINADO

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

//     boton.onclick = () => {
//         paginaActual++
//         console.log(paginaActual)
//         firstPage.disabled = false
//         prev.disabled = false
//         if (paginaActual === 1441) {
//             next.disabled = true
//             lastPage.disabled = true
//         }
//         funcion()
//     }


// paginaSiguiente(next, urlPokemon())


//     boton.onclick = () => {
//         paginaActual--
//         //next.disabled = false
//         //lastPage.disabled = false
//         if (paginaActual === 1) {
//             prev.disabled = true
//             firstPage.disabled = true
//         }
//         funcion()
//     }


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
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${busquedaPorInput}&pageSize=10&page=${paginaActual}`)
    const data = await res.json()
    contenedorTarjetas.innerHTML = aHTML(data)
}

searchForm.onsubmit = (e) => {
    e.preventDefault()
    busquedaPorInput = searchInput.value
    inputBusquedaPokemon()
}

// Switch toggle

toggle.onclick = () => {
    toggle.classList.toggle("active");
    body.classList.toggle("active"); 
}

/* pokeball.onclick = () => {
    pokeball.classList.add("pokeball-hide")
    ultraball.classList.remove("ultraball-hide")

}

ultraball.onclick = () => {
    pokeball.classList.remove("pokeball-hide")
    ultraball.classList.add("ultraball-hide")
} 
 */
