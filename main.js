const contenedorTarjetas = document.querySelector(".tarjetas")
const tablaInfoPokemon = document.querySelector("#tabla-resultados")
const inputBusquedaCartaIndividual = document.querySelector("#input-busqueda-carta-individual")
const selectorVerComo = document.querySelector("#selector-ver-como")
const selectorOrdenarPorNombreYNumero = document.querySelector("#selector-ordenar-nombre-numero")
const selectorOrdenarPorAscDesc = document.querySelector("#selector-ordenar-asc-desc")
const contenedorCartasIndividuales = document.querySelector("#contenedor-cartas")


// Paginado
const firstPage = document.getElementById("first-page")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const lastPage = document.getElementById("last-page")

let paginaActual = 1
let ultimaPagina = 0

const urlPokemon = async () => {    
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${paginaActual}`)   
    const data = await respuesta.json()   
    contenedorTarjetas.innerHTML = aHTML(data)        
}    

urlPokemon()

const fetchBusquedaPokemon = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=20&page=${paginaActual}`)
    const data = await respuesta.json()    
         
}

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

const aHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc + `
        <div class="item" id="${elemento.id}">
        <img class="card-img" src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
    }, "")
    
    return arrayAHtml
} 

// Paginado

const primeraPagina = (boton, funcion) => {

    boton.onclick = () => {
        paginaActual = 1
        firstPage.disabled = true
        prev.disabled = true
        next.disabled = false
        lastPage.disabled = false
        funcion()
    }
}

primeraPagina(firstPage, urlPokemon)

const paginaSiguiente = (boton, funcion) => {

    boton.onclick = () => {
        paginaActual++ 
        console.log(paginaActual)
        firstPage.disabled = false
        prev.disabled = false
         if (paginaActual === 1441) {
          next.disabled = true
          lastPage.disabled = true
        } 
        funcion()
    }
} 

paginaSiguiente(next, urlPokemon)

const paginaAnterior = (boton, funcion) => {

    boton.onclick = () => {
        paginaActual--
        next.disabled = false
        lastPage.disabled = false
        if (paginaActual === 1) {
            prev.disabled = true
            firstPage.disabled = true
        }
        funcion()
    }
}

paginaAnterior(prev, urlPokemon)

const paginaUltima = (boton, funcion) => {

    boton.onclick = () => {
        paginaActual = 1441
        prev.disabled = false
        firstPage.disabled = false
        if (paginaActual === 1441) {
            next.disabled = true
            lastPage.disabled = true
        }
        funcion()
    }
}

paginaUltima(lastPage, urlPokemon)
