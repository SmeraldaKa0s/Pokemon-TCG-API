const contenedorTarjetas = document.querySelector(".tarjetas")
const tablaInfoPokemon = document.querySelector("#tabla-resultados")


let paginaActual = 1

const urlPokemon = async () => {    
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=20&page=${paginaActual}`)
    const data = await respuesta.json()
    console.log(data)
    console.log(data.data)
    //contenedorTarjetas.innerHTML = aHTML(data) 
    console.log(data.data[0].resistances[0].type) 
    console.log(tablasHTML(data))
    tablaInfoPokemon.innerHTML = tablasHTML(data)
    console.log(data.data[0])

   
    
}    

urlPokemon()

const fetchBusquedaPokemon = async () => {
    
}

const aHTML = (data) => {
    const arrayAHtml = data.data.reduce((acc, elemento) => {
        return acc + `
        <div class="item" id="${elemento.id}">
        <img src="${elemento.images.large}" alt="${elemento.name}">
        </div>`
    }, "")
    
    return arrayAHtml
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
                <th>N.Pokedex</th>
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