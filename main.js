const contenedorTarjetas = document.querySelector(".tarjetas")
console.log(contenedorTarjetas)
const firstPage = document.getElementById("first-page")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const lastPage = document.getElementById("last-page")

let paginaActual = 1
let ultimaPagina = 0

const urlPokemon = async () => {    
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=10&page=${paginaActual}`)
    const data = await respuesta.json()
    console.log(data)
    console.log(data.data)
    contenedorTarjetas.innerHTML = aHTML(data)   
}    

urlPokemon()

const aHTML = (data) => {
    const arrayReduc = data.data.reduce((acc, elemento) => {
        return acc + `
        <div class="item" id="${elemento.id}">
        <img src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
    }, "")
    
    return arrayReduc
} 

// Paginado

firstPage.onclick = () => {
    paginaActual = 1
    /* if (paginaActual === 1) {
        firstPage.disabled = true
        prev.disabled = true
    } */
    urlPokemon()
}

next.onclick = () => {
    paginaActual++  
    /* if (paginaActual === 1441) {
      next.disabled = true
    } */
    urlPokemon()
}

prev.onclick = () => {
    paginaActual--
    /* if (paginaActual === 1) {
        prev.disabled = true
    } */
    urlPokemon()
}

lastPage.onclick = () => {
    paginaActual = 1441
    if (paginaActual === 1441) {
        next.disabled = true
        lastPage.disabled = true
    }
    urlPokemon()
}