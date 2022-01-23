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

let paginaActual = 1;
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
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${inputBusquedaCartaIndividual.value}&pageSize=20&page=${paginaActual}`)
    const data = await respuesta.json()
    contenedorCartas.innerHTML = aHTML(data)
    verComoEnHtml(data)
   
}

const fetchTablasEImagenes = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=20&page=${paginaActual}`)
    const data = await respuesta.json()
    contenedorCartas.innerHTML = aHTML(data)
    verComoEnHtml(data)
}

fetchTablasEImagenes()

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
    fetchBusquedaTablasEImagenes()
    //contenedorCartas.innerHTML = aHTML(data)
}

botonPrimeraPaginaTablasCard.onclick = () => paginaActual = 1 && fetchBusquedaTablasEImagenes()
botonSiguienteTablasCard.onclick = () => (paginaActual++ && fetchBusquedaTablasEImagenes())
botonAnteriorTablasCard.onclick = () => paginaActual !== 1 && (paginaActual-- && fetchBusquedaTablasEImagenes())  


const cartass = document.querySelectorAll("")
console.log(cartass)