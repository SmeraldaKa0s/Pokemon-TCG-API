const contenedorTarjetas = document.querySelector("#tarjetas")

// Paginado
const firstPage = document.getElementById("first-page")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const lastPage = document.getElementById("last-page")

//Buscador
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")

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
}

const urlPokemon = async () => {
    const respuesta = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=20&page=${paginaActual}`)
    const data = await respuesta.json()
    contenedorTarjetas.innerHTML = aHTML(data)
    console.log(data)
}

urlPokemon()

const attacks = (elemento) => elemento.attacks.reduce((acc, attack) => {
    console.log(attack)
    return acc + `
 <p>${attack.name}</p>
 `
}, "")

const crearCartasIndividuales = (data) => {
    const html = data.data.reduce((acc, elemento, i) => {

        return acc +
            `
        <article>
            <div class="container">
                <div class="card-info">
                    <h2>${elemento.name}</h2>
                    <div class="card-info-title">
                        <p>${elemento.supertype} - ${elemento.supertype}</p>
                        <div class="card-info-txt">
                            <p>HP</p>
                            <p>${elemento.hp}</p>
                        </div>             
                    </div>
                    <img src="${elemento.images.large}" alt="">
                </div>
                <div class="card-info-container">
                    <div class="card-info-left">
                        <div>
                            <div>
                                <h3>ATTACKS</h3>
                                <div class="card-info-left-primary">
                                    <p>☀☀☀</p><!-- img -->
                                    ${attacks(elemento)}
                                </div>
                            </div>                        
                            <div>
                                <h3>RULES</h3>
                                <p class="card-info-txt-font">${elemento.attacks.text
            }</p>
                            </div>
                        </div>
                    <div>
                        <div class="card-info-left-secondary">                        
                            <div class="card-info-left-mr">
                                <h3>WEAKNESS</h3>
                                <div>
                                    <p>${elemento.attacks.weakness.type}</p>
                                    <p>${elemento.attacks.weakness.value}</p>
                                </div>
                            </div>
                            <div  class="card-info-left-mr">
                                <h3>RESISTANCE</h3>
                                <div>
                                    <p>${elemento.attacks.resistances.type}</p>
                                    <p>${elemento.attacks.resistances.value}</p>
                                </div>
                            </div>
                            <div class="card-info-left-mr">
                                <h3>RETRAT COST</h3>
                                <div>
                                    <p>${elemento.attacks.retreatCost}</p>
                                </div>
                            </div>        
                        </div>                        
                        <div class="card-info-left-terciary">        
                            <div class="card-info-left-mr">
                                <h3>ARTIST</h3>
                                <p>${elemento.artist}</p>
                            </div>
                            <div class="card-info-left-mr">
                                <h3>RARITY</h3>
                                <p>${elemento.rarity}</p>
                            </div>
                            <div class="card-info-left-mr">
                                <h3>SET</h3>
                                <div>
                                    <p>${elemento.set}/p>
                                </div>                    
                            </div>        
                            </div> 
                        </div>
                    </div>    
                </div>
            </div>
        </article>
    `
    }, "")
    return html
}


// PAGINADO

const primeraPagina = (boton, funcion) => {
    boton.onclick = () => {
        paginaActual = 1;
        firstPage.disabled = true;
        prev.disabled = true;
        next.disabled = false;
        lastPage.disabled = false;
        funcion();
    };
};

boton.onclick = () => {
    paginaActual = 1
    firstPage.disabled = true
    prev.disabled = true
    next.disabled = false
    lastPage.disabled = false
    funcion()
}


//primeraPagina(firstPage, urlPokemon())

const paginaSiguiente = (boton, funcion) => {
    boton.onclick = () => {
        paginaActual++;
        console.log(paginaActual);
        firstPage.disabled = false;
        prev.disabled = false;
        if (paginaActual === 1441) {
            next.disabled = true;
            lastPage.disabled = true;
        }
        funcion();
    };
};

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


paginaSiguiente(next, urlPokemon())


boton.onclick = () => {
    paginaActual--
    //next.disabled = false
    //lastPage.disabled = false
    if (paginaActual === 1) {
        prev.disabled = true
        firstPage.disabled = true
    }
    funcion()
}


paginaAnterior(prev, urlPokemon())

const paginaUltima = (boton, funcion) => {
    boton.onclick = () => {
        paginaActual = 1441;
        prev.disabled = false;
        firstPage.disabled = false;
        if (paginaActual === 1441) {
            next.disabled = true;
            lastPage.disabled = true;
        }
        funcion();
    };
};

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


paginaUltima(lastPage, urlPokemon())


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
