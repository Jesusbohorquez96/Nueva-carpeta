const sectionSeleleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-Reiniciar")
sectionReiniciar.style.display = 'none'
const sectionSeleleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMacotaJugador = (document.getElementById("mascota-Jugador"))
const spanMascotaEnemigo = (document.getElementById("mascota-enemigo"))
const spanVidasJugador = document.getElementById("vidas-Jugador")
const spanVidasEnemigo = document.getElementById("vidas-Enemigo")
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataqueDelJugador")
const ataqueDelEnemigo = document.getElementById("ataqueDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let shelbones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcinesShelbones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesShelbon
let ataquesShelbonEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './imagenes/shelbymap1.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximodelMapa = 350
if (anchoDelMapa > anchoMaximodelMapa) {
    anchoDelMapa = anchoMaximodelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Shelbon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 45
        this.alto = 45
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidady = 0
    }
    pintarShelbon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}


let Hipodoge = new Shelbon("Hipodoge", './imagenes/Hipodoge.png', 5, './imagenes/hipodogeC.png'
)
let Capipepo = new Shelbon("Capipepo", './imagenes/Capipepo.png', 5, './imagenes/capipepoC.png'
)
let Ratigueya = new Shelbon("Ratigueya", './imagenes/Ratiguella.png', 5, './imagenes/ratigueyaC.png'
)
let HipodogeEnemigo = new Shelbon("Hipodoge", './imagenes/Hipodoge.png', 5, './imagenes/hipodogeC.png'
)
let CapipepoEnemigo = new Shelbon("Capipepo", './imagenes/Capipepo.png', 5, './imagenes/capipepoC.png'
)
let RatigueyaEnemigo = new Shelbon("Ratigueya", './imagenes/Ratiguella.png', 5, './imagenes/ratigueyaC.png'
)


Hipodoge.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
)
HipodogeEnemigo.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
)


Capipepo.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
)
CapipepoEnemigo.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
)

Ratigueya.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
)
RatigueyaEnemigo.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
)

shelbones.push(Hipodoge, Capipepo, Ratigueya)


function iniciarJuego() {
    sectionSeleleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    shelbones.forEach((shelbon) => {
        opcinesShelbones = `
        <input type="radio" name="mascota" id=${shelbon.nombre}>
            <label class="tarjeta-de-shelbon" for=${shelbon.nombre}>
                <p>${shelbon.nombre}</p>
                <img src=${shelbon.foto} alt=${shelbon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcinesShelbones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")

    })


    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function seleccionarMascotaJugador() {

    sectionSeleleccionarMascota.style.display = "none"

    if (inputHipodoge.checked) {
        spanMacotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMacotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMacotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Selecciona una mascota")
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < shelbones.length; i++) {
        if (mascotaJugador === shelbones[i].nombre) {
            ataques = shelbones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesShelbon = `
          <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesShelbon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, shelbones.length - 1)
    spanMascotaEnemigo.innerHTML = shelbones[mascotaAleatoria].nombre
    ataquesShelbonEnemigo = shelbones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesShelbonEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")

        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("esto fue un empate")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! GANASTE")
    } else {
        crearMensajeFinal("Lo siento PERDISTE")
    }
}
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)


}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    // botonFuego.disabled = true
    // botonAgua.disabled = true
    // botonTierra.disabled = true

    sectionReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarShelbon()
    HipodogeEnemigo.pintarShelbon()
    CapipepoEnemigo.pintarShelbon()
    RatigueyaEnemigo.pintarShelbon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidady !== 0) {
        revisarColicion(HipodogeEnemigo)
        revisarColicion(CapipepoEnemigo)
        revisarColicion(RatigueyaEnemigo)
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidady = 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidady = -5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidady = 0
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = odtenerObjectoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function odtenerObjectoMascota() {
    for (let i = 0; i < shelbones.length; i++) {
        if (mascotaJugador === shelbones[i].nombre) {
            return shelbones[i]
        }
    }
}

function revisarColicion(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)