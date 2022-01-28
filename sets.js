const contenedorSets = document.querySelector(".cotenedor-sets");
const firstPageSets = document.getElementById("first-page-sets");
const prevSets = document.getElementById("prev-sets");
const nextSets = document.getElementById("next-sets");
const lastPageSets = document.getElementById("last-page-sets");
const botonCerrarSets = document.getElementById("boton-cerrar-sets");
const sectionModalSets = document.querySelector(".section-modal-sets");
const contenedorModalInfoSets = document.querySelector(".contenedor-modal-info-sets");

// Switch toggle 
const switchToggle = document.querySelector(".switch-toggle-pokaballs");
const pokeball = document.getElementById("pokeball");
const ultraball = document.getElementById("ultraball");

//Mode dark menu desktop 
const desktopPokeball = document.getElementById("toggle"); 

//Menu desplegable
const burgerMenu = document.querySelector(".burger-menu");
const modalBg = document.querySelector(".modal-bg");
const closeMenu = document.querySelector(".close-menu");

//Funcionalidad Menu desplegable
burgerMenu.addEventListener("click", () => {
	modalBg.classList.add("open-aside");
});

closeMenu.addEventListener("click", () => {
	modalBg.classList.remove("open-aside");
});

//Sets
let paginaActual = 1;
let ultimaPagina = 0;

botonCerrarSets.onclick = () => {
	sectionModalSets.style.display = "none";
};
// fetch a sets
const setsPokemon = async () => {
	const respuesta = await fetch(
		`https://api.pokemontcg.io/v2/sets?pageSize=20&page=${paginaActual}`
	);
	const data = await respuesta.json();
	setsHTML(data);
	ordenarFechaSet(data);
};

setsPokemon();

const setsHTML = (data) => {
	contenedorSets.innerHTML = data.data.reduce((acc, elemento) => {
		return (
			acc +
			`
			<div data-id="${elemento.id}" class="tarjetas-sets">
            <div class="cotenedor-imagen-sets">
                  <img src="${elemento.images.logo}">
            </div>
				   <div class="contenedor-texto-sets">	
				         <p> Name: ${elemento.name} </p>
           </div>		  	
			</div>
			`
		);
	}, "");
	asignarClikSets();
};

// fech a tarjetas individuales
const datosModalSets = async (id) => {
	const respuesta = await fetch(`https://api.pokemontcg.io/v2/sets/${id}`);
	const data = await respuesta.json();
	modalHTMLsets(data);
};

const asignarClikSets = () => {
	const tarjetasSets = document.querySelectorAll(".tarjetas-sets");

	for (let i = 0; i < tarjetasSets.length; i++) {
		tarjetasSets[i].onclick = () => {
			console.log("click");
			const id = tarjetasSets[i].dataset.id;
			datosModalSets(id);
		};
	}
};

const modalHTMLsets = (data) => {
	sectionModalSets.style.display = "flex";

	contenedorModalInfoSets.innerHTML = `
	<div class="contenedor">
	    <div class="modal-img-sets">
        <img src="${data.data.images.logo}">
      </div>
		  <div class="modal-logo-texto-sets">
                   
				<div class="modal-logo-sets">
          <img src="${data.data.images.symbol}">
        </div>
				<div class="modal-texto-sets">
				   <p> Name: ${data.data.name} </p>
				   <p>Date the set was released: ${data.data.releaseDate} </p>
           <p> Total number of cards: ${data.data.total} </p>
				   <p> Serie: ${data.data.series} </p>
           <p> Legalities: ${
							data.data.legalities.unlimited
								? data.data.legalities.unlimited
								: "None"
						} </p>
           <p>Code: ${data.data.ptcgoCode ? data.data.ptcgoCode : "None"} </p>
					 <p>Date the set was released (in the USA):${data.data.releaseDate} </p>
        </div>
     </div>		  	
	
	</div>`;
};

////paginado sets

firstPageSets.onclick = () => {
	paginaActual = 1;
	firstPageSets.disabled = true;
	prevSets.disabled = true;
	nextSets.disabled = false;
	lastPageSets.disabled = false;
	setsPokemon();
};

nextSets.onclick = () => {
	paginaActual++;
	firstPageSets.disabled = false;
	prevSets.disabled = false;
	if (paginaActual === 7) {
		nextSets.disabled = true;
		lastPageSets.disabled = true;
	}
	setsPokemon();
};

prevSets.onclick = () => {
	paginaActual--;
	nextSets.disabled = false;
	lastPageSets.disabled = false;
	if (paginaActual === 1) {
		prevSets.disabled = true;
		firstPageSets.disabled = true;
	}
	setsPokemon();
};

lastPageSets.onclick = () => {
	paginaActual = 7;
	prevSets.disabled = false;
	firstPageSets.disabled = false;
	if (paginaActual === 7) {
		nextSets.disabled = true;
		lastPageSets.disabled = true;
	}

	setsPokemon();
};

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