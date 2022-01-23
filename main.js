const contenedorTarjetas = document.querySelector("#tarjetas")
const firstPage = document.getElementById("first-page");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const lastPage = document.getElementById("last-page");

let paginaActual = 1;
let ultimaPagina = 0;

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

const mostrarCartaIndividual = (data) => {
    return `
    <div class="modal-container">
        <div class="title-img-modal">
            <h2>${data.data.name}</h2>
            <div class="container-img">
                <span>
                ${data.data.subtypes} - HP: ${data.data.hp}
                </span>
                <img src="${data.data.images.large} alt="${data.data.name}">
            </div>
        </div>  
        <div class="container-info">
            <div class="info-ataques">
                <h2>
                    ATTACKS
                </h2>
                ${data.data.abilities ? habilidades(data) : ""}
                ${attacks(data)}
            </div>
            <div class="info-secundaria">
                <div class="debilidad">
                    <h2>
                        WEAKNESSES
                    </h2>
                    ${data.data.weaknesses ? debilidad(data) : "N/A"}                                        
                </div>
                    <h2>
                        RESISTANCES
                    </h2>                    
                <div class="resistencia">
                    ${data.data.resistances ? resistencia(data) : "N/A"}
                <div>
                <div class="costo-retirada">
                    <h2>
                        RETREAT COST
                    </h2>
                    ${data.data.retreatCost ? costoRetirada(data) : "None"}
                </div>
            </div>
        </div>
        <div class="info-adicional">
            <div>
                <h2>
                    ARTIST
                </h2>   
                <span>
                    ${data.data.artist}
                </span>
            </div>
            <div>
                <h2>
                    RARITY
                </h2>   
                <span>
                    ${data.data.rarity ? data.data.rarity : "None"}
                </span>
            </div>
            <div>
                <h2>
                    SET
                </h2>   
                <span>
                    ${data.data.set.name}
                </span>
            </div>
        </div>  
    </div>
    `
}


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
