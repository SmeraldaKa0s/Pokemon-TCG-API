const contenedorTarjetas = document.querySelector(".tarjetas")
console.log(contenedorTarjetas)
const prev = document.getElementById("prev")
const next = document.getElementById("next")

let paginaActual = 1

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

next.onclick = () => {
    paginaActual = paginaActual + 1
    urlPokemon()
}

prev.onclick = () => {
    if (paginaActual === 1) {
      prev.disabled = true
    }
    paginaActual = paginaActual - 1
    urlPokemon()
}