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

// Switch toggle 
const switchToggle = document.querySelector(".switch-toggle-pokaballs");
const pokeball = document.getElementById("pokeball");
const ultraball = document.getElementById("ultraball");

//Mode dark menu desktop 
const desktopPokeball = document.getElementById("toggle"); 

//Menu desplegable 
const burgerMenu = document.querySelector(".burger-menu")
const modalBg = document.querySelector(".modal-bg")
const closeMenu = document.querySelector(".close-menu")

// FUNCIONALIDAD MENÚ DESPLEGABLE

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
    tablaInfoPokemon.innerHTML = tablasHTML(data)       
    ultimaPaginaBusqueda(data)  
    const cartasEnLista = document.querySelectorAll(".elementos-tabla")
    seccionTablaConEvento(cartasEnLista)    
    console.log(data)
}

// EVENTO ONCLICK SOBRE TBODY DE TABLAS

const seccionTablaConEvento = (variable) => {

    for(let i = 0; i < variable.length; i++){
        variable[i].onclick = () => {
            const idNumerico = variable[i].id
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

botonPrimeraPaginaTablasCard.onclick = () => {
     		paginadoActual = 1
    		fetchBusquedaTablasEImagenes()
}

botonAnteriorTablasCard.onclick = () => {
   if(paginadoActual !== 1){
       paginadoActual--    
   }
    fetchBusquedaTablasEImagenes()
}

botonSiguienteTablasCard.onclick = () => {
    paginadoActual = paginadoActual + 1
    fetchBusquedaTablasEImagenes()
} 

const ultimaPaginaBusqueda = (data) => {
    let valorUltimaPagina = Math.ceil(data.totalCount/20)
    botonUltimaPaginaTablasCard.onclick = () => {
        const fetchBusquedaTablasEImagenes = async () => {
            const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${inputBusquedaCartaIndividual.value}&pageSize=20&page=${valorUltimaPagina}`)
            const data = await respuesta.json()
            tablaInfoPokemon.innerHTML = tablasHTML(data)
            const cartasEnLista = document.querySelectorAll(".elementos-tabla")
            seccionTablaConEvento(cartasEnLista)
        }
        return fetchBusquedaTablasEImagenes()
    }    
}

//Desktop switch toggle

desktopPokeball.onclick = () => {
    document.body.classList.toggle("dark-mode")
    
    const isDark = document.body.className === "light-mode dark-mode"
    
    desktopPokeball.classList.toggle("active", isDark)
    pokeball.classList.toggle("pokeball-hide", isDark)
    ultraball.classList.toggle("ultraball-hide", !isDark)
}


//Dark mode

switchToggle.onclick = () => {
    document.body.classList.toggle("dark-mode")
    const isDark = document.body.className === "light-mode dark-mode"

    desktopPokeball.classList.toggle("active", isDark)
    pokeball.classList.toggle("pokeball-hide", isDark)
    ultraball.classList.toggle("ultraball-hide", !isDark)
};




