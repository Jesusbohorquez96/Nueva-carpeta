const sectionSeleleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("boton-Reiniciar")

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

let shelbones = []
let ataqueJugador
let ataqueEnemigo
let opcinesShelbones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesShelbon
let botonFuego
let botonAgua
let botonTierra
let vidasJugador = 3
let vidasEnemigo = 3

class Shelbon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let Hipodoge = new Shelbon("Hipodoge", './imagenes/Hipodoge.png', 5)
let Capipepo = new Shelbon("Capipepo", './imagenes/Capipepo.png', 5)
let Ratigueya = new Shelbon("Ratigueya", './imagenes/Ratiguella.png', 5)

Hipodoge.ataques.push(
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

Ratigueya.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
)

shelbones.push(Hipodoge, Capipepo, Ratigueya)


function iniciarJuego() {
    sectionSeleleccionarAtaque.style.display = "none"

    shelbones.forEach((shelbon) => {
        opcinesShelbones = `
        <input type="radio" name="mascota" id=${shelbon.nombre}>
            <label class="tarjeta-de-shelbon" for=${shelbon.nombre}>
                <p>${shelbon.nombre}</p>
                <img src=${shelbon.foto} alt=${shelbon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcinesShelbones

        inputHipodoge = (document.getElementById("Hipodoge"))
        inputCapipepo = (document.getElementById("Capipepo"))
        inputRatigueya = (document.getElementById("Ratigueya"))

    })

    sectionReiniciar.style.display = "none"
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)


    botonReiniciar.addEventListener("click", reiniciarJuego)
}
function seleccionarMascotaJugador() {

    sectionSeleleccionarMascota.style.display = "none"
    sectionSeleleccionarAtaque.style.display = "flex"

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
    seleccionarMascotaEnemigo()
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
          <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesShelbon
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, shelbones.length - 1)

    spanMascotaEnemigo.innerHTML = shelbones[mascotaAleatoria].nombre

}
function ataqueFuego() {
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "FUEGO"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }
    combate()
}
function combate() {
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}
function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! ganaste🎉")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("LO SIENTO, PERDISTE (Intentalo de nuevo)")
    }
}
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)


}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
window.addEventListener("load", iniciarJuego)