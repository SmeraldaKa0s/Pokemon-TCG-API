const contenedorTabla = document.querySelector(".tablas")
const contenedorCartas = document.querySelector("#contenedor-cartas")
const tablaInfoPokemon = document.querySelector("#tabla-resultados")
const inputBusquedaCartaIndividual = document.querySelector("#input-busqueda-carta-individual")
const selectorVerComo = document.querySelector("#selector-ver-como")
const selectorOrdenarPorNombreYNumero = document.querySelector("#selector-ordenar-nombre-numero")
const selectorOrdenarPorAscDesc = document.querySelector("#selector-ordenar-asc-desc")
const formularioCartaIndividual = document.querySelector(".formularios")
const botonSiguienteTablasCard = document.querySelector("#button-siguiente")
const botonAnteriorTablasCard = document.querySelector("#button-anterior")
const botonPrimeraPaginaTablasCard = document.querySelector("#boton-primera-pagina")
const botonUltimaPaginaTablasCard = document.querySelector("#boton-ultima-pagina")

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

////////////////////////////////////////////

let paginadoActual = 3;
let ultimaPagina = 0;

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
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc + `
        <tbody>
            <tr>
                <td>
                ${elemento.name}
                </td>
                <td>
                ${elemento.nationalPokedexNumbers}
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
    contenedorCartas.innerHTML = aHTML(data)
    tablaInfoPokemon.innerHTML = tablasHTML(data)
    verComoEnHtml(data)    
    ultimaPaginaBusqueda(data)
    console.log(paginadoActual)
    console.log(respuesta)
        
}

const ultimaPaginaBusqueda = (data) => {

    let valorUltimaPagina = Math.ceil(data.totalCount/20)

    botonUltimaPaginaTablasCard.onclick = () => {

        const fetchBusquedaTablasEImagenes = async () => {
            const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${inputBusquedaCartaIndividual.value}&pageSize=20&page=${valorUltimaPagina}`)
            const data = await respuesta.json()
            console.log(respuesta)
            contenedorCartas.innerHTML = aHTML(data)
            verComoEnHtml(data)
        }

        return fetchBusquedaTablasEImagenes()

    }   
}



const verComoEnHtml = (d) => {

    const data = d

    selectorVerComo.onchange = () => {    
        if (selectorVerComo.value === "images") {
            contenedorCartas.innerHTML = aHTML(data)
            contenedorTabla.style.display = "none"
            contenedorCartas.style.display = "flex"
        }
        else {
            tablaInfoPokemon.innerHTML = tablasHTML(data)            
            contenedorTabla.style.display = "flex"
            contenedorCartas.style.display = "none"
        }
    }
}

formularioCartaIndividual.onsubmit = (e) => {
    e.preventDefault()
    paginadoActual = 1
    fetchBusquedaTablasEImagenes()
    //contenedorCartas.innerHTML = aHTML(data)
}

botonPrimeraPaginaTablasCard.onclick = () => {
     		paginadoActual = 1
     		botonPrimeraPaginaTablasCard.disabled = true
     		botonAnteriorTablasCard.disabled = true
    		fetchBusquedaTablasEImagenes()
}




console.log(paginadoActual)
    




