const socket = io()

const sectionSeleleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-Reiniciar")
sectionReiniciar.style.display = 'none'

const sectionSeleleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMacotaJugador = document.getElementById("mascota-Jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-Jugador")
const spanVidasEnemigo = document.getElementById("vidas-Enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataqueDelJugador")
const ataqueDelEnemigo = document.getElementById("ataqueDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let shelbones = []
let shelbonesEnemigos = []
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

let HipodogeEnemigo
let CapipepoEnemigo
let RatigueyaEnemigo

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

socket.on('jugadorConectado', (data) => {
    console.log('Jugador conectado:', data.id);
    jugadorId = data.id
});

class Shelbon {
    constructor(nombre, foto, vida, fotoMapa, id = 0) {
        this.id = id
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


let Hipodoge = new Shelbon("Hipodoge", './imagenes/Hipodoge.png', 5, './imagenes/hipodogeC.png')

let Capipepo = new Shelbon("Capipepo", './imagenes/Capipepo.png', 5, './imagenes/capipepoC.png')

let Ratigueya = new Shelbon("Ratigueya", './imagenes/Ratiguella.png', 5, './imagenes/ratigueyaC.png')


const HIPODOGE_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
]

Hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },]

Capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
]

Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

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

    // unirseAlJuego()
}

// function unirseAlJuego() {
//     fetch("http://192.168.2.14:8080/unirse")
//         .then((res) => {
//             if (res.ok) {
//                 res.text()
//                     .then((respuesta) => {
//                         console.log(respuesta)
//                         jugadorId = respuesta
//                     })
//             }
//         })
// }

function seleccionarMascotaJugador() {

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
        return
    }

    sectionSeleleccionarMascota.style.display = "none"

    seleccionarShelbon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}
// funcion que voy a remplazar para hacerlo por websocket
function seleccionarShelbon(mascotaJugador) {
    fetch(`http://192.168.2.14:8080/shelbon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            shelbon: mascotaJugador
        })
    })
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
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}
function enviarAtaques() {
    console.log('Enviar ataques', ataqueJugador);

    fetch(`http://192.168.2.14:8080/shelbon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    console.log('OBTENER ATAQUES');

    fetch(`http://192.168.2.14:8080/shelbon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}


function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesShelbonEnemigo = enemigo.ataques
    secuenciaAtaque()
}

// function ataqueAleatorioEnemigo() {
//     console.log('Ataques enemigo', ataquesShelbonEnemigo);
//     let ataqueAleatorio = aleatorio(0, ataquesShelbonEnemigo.length - 1)

//     if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
//         ataqueEnemigo.push("FUEGO")
//     } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
//         ataqueEnemigo.push("AGUA")
//     } else {
//         ataqueEnemigo.push("TIERRA")
//     }
//     console.log(ataqueEnemigo)
//     iniciarPelea()
// }

// function iniciarPelea() {
//     if (ataqueJugador.length === 5) {
//         combate()
//     }
// }

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    console.log('COMBATE');

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

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    shelbonesEnemigos.forEach(function (shelbon) {
        shelbon.pintarShelbon()
        revisarColicion(shelbon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.2.14:8080/shelbon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        shelbonesEnemigos = enemigos.map(function (enemigo) {
                            console.log(enemigos)

                            let shelbonEnemigo = null
                            const shelbonNombre = enemigo.shelbon?.nombre || ""

                            if (shelbonNombre === "Hipodoge") {
                                shelbonEnemigo = new Shelbon("Hipodoge", './imagenes/Hipodoge.png', 5, './imagenes/hipodogeC.png', enemigo.id)
                            } else if (shelbonNombre === "Capipepo") {
                                shelbonEnemigo = new Shelbon("Capipepo", './imagenes/Capipepo.png', 5, './imagenes/capipepoC.png', enemigo.id)
                            } else if (shelbonNombre === "Ratigueya") {
                                shelbonEnemigo = new Shelbon("Ratigueya", './imagenes/Ratiguella.png', 5, './imagenes/ratigueyaC.png', enemigo.id)
                            }

                            shelbonEnemigo.x = enemigo.x || 0
                            shelbonEnemigo.y = enemigo.y || 0


                            return shelbonEnemigo
                        })
                    })
            }
        })
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
    console.log(mascotaJugadorObjeto, mascotaJugador);
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
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)