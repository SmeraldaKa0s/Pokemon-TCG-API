const contenedorTabla = document.querySelector(".tablas")
const contenedorMensaje = document.querySelector("#contenedor-busqueda")
const tablaInfoPokemon = document.querySelector("#tabla-resultados")
const inputBusquedaCartaIndividual = document.querySelector("#input-busqueda-carta-individual")
const selectorOrdenarPorAscDesc = document.querySelector("#selector-ordenar-asc-desc")
const formularioCartaIndividual = document.querySelector(".formularios")
const botonSiguienteTablasCard = document.querySelector("#button-siguiente")
const botonAnteriorTablasCard = document.querySelector("#button-anterior")
const botonPrimeraPaginaTablasCard = document.querySelector("#boton-primera-pagina")
const botonUltimaPaginaTablasCard = document.querySelector("#boton-ultima-pagina")
const divPaginadoListasCartas = document.querySelector(".paginado-listas-cartas")
const modalCartaFlotante = document.querySelector(".modal-tablas")

//Menu desplegable 
const burgerMenu = document.querySelector(".burger-menu")
const modalBg = document.querySelector(".modal-bg")
const closeMenu = document.querySelector(".close-menu")


//Funcionalidad Menu desplegable 
burgerMenu.addEventListener('click', () => {
    modalBg.classList.add('open-aside');
})

closeMenu.addEventListener('click', () => {
    modalBg.classList.remove('open-aside')
})

let paginadoActual = 1

 const aHTML = (data) => {
     const arrayAHtml = data.data.reduce((acc, elemento) => {
         return acc + `
         <div class="item" id="${elemento.id}">
         <img class="card-img" src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
     }, "")
    return arrayAHtml
}

const tablasHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento, id) => {
        return acc + `
        <tbody class="elementos-tabla" id="${elemento.id}">
            <tr>
                <td>
                ${elemento.name}
                </td>
                <td>
                ${elemento.nationalPokedexNumbers ? elemento.nationalPokedexNumbers : "-"}
                </td>
                <td>
                ${elemento.set.name}
                </td>
                <td>
                ${elemento.rarity ? elemento.rarity : "None"}
                </td>
                <td>
                ${elemento.types[0]}
                </td>
                <td>
                ${elemento.subtypes[0]}
                </td>
                <td>
                ${elemento.resistances && elemento.resistances.length && elemento.resistances[0].type ? elemento.resistances[0].type : "None"}
                </td>
                <td>
                ${elemento.weaknesses && elemento.weaknesses.length && elemento.weaknesses[0].type ? elemento.weaknesses[0].type : "None"}
                </td>            
            </tr>
        </tbody>
        `
    }, `
    <thead>
           <tr>
                <th>
                Name
                </th>
                <th>
                National Pokedex
                </th>
                <th>
                Set
                </th>
                <th>
                Rarity
                </th>
                <th>
                Types
                </th>
                <th>
                Subtypes
                </th>
                <th>
                Resistances
                </th>
                <th>
                Weaknesses
                </th>
            </tr>
    </thead> `
    )

    return arrayAHtml
}

const fetchBusquedaTablasEImagenes = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${inputBusquedaCartaIndividual.value}&pageSize=20&page=${paginadoActual}`)
    const data = await respuesta.json()  
    console.log(data)  
    tablaInfoPokemon.innerHTML = tablasHTML(data)       
    ultimaPaginaBusqueda(data)  
    const cartasEnLista = document.querySelectorAll(".elementos-tabla")
    seccionTablaConEvento(cartasEnLista)
}

// EVENTO ONCLICK SOBRE TBODY DE TABLAS

const seccionTablaConEvento = (variable) => {

    for(let i = 0; i < variable.length; i++){
        variable[i].onclick = () => {
            const idNumerico = variable[i].id
            console.log("se mueve sobre}")
            cartaVisiblePorEvento(idNumerico)
            modalCartaFlotante.style.display = "flex"      
        }
    }
}

const cartaVisiblePorEvento = async (id) => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
    const data = await respuesta.json()
    modalCartaFlotante.innerHTML = 
    `<div class="modal-carta-tabla">
        <button class="button-cerrar-modal-tablas">X</button>
        <img src="${data.data.images.large}">
    </div>`

    const buttonCerrarModalTablas = document.querySelector(".button-cerrar-modal-tablas")

    buttonCerrarModalTablas.onclick = () => {
        modalCartaFlotante.style.display = "none"
    }    
}

// ENVÍO DE FORMULARIO

formularioCartaIndividual.onsubmit = (e) => {
    e.preventDefault()
    paginadoActual = 1
    fetchBusquedaTablasEImagenes()
    contenedorMensaje.style.display = "none"
    divPaginadoListasCartas.style.display = "flex"
}

// PAGINADO

const ultimaPaginaBusqueda = (data) => {
    let valorUltimaPagina = Math.ceil(data.totalCount/20)
    botonUltimaPaginaTablasCard.onclick = () => {
        const fetchBusquedaTablasEImagenes = async () => {
            const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${inputBusquedaCartaIndividual.value}&pageSize=20&page=${valorUltimaPagina}`)
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

botonAnteriorTablasCard.onclick = () => paginadoActual !== 1 && (paginadoActual -- && fetchBusquedaTablasEImagenes())


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

    




