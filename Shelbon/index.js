const path = require('path')
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

let jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarShelbon(shelbon) {
        this.shelbon = shelbon
    }

    actualizarPosicion(x, y) {
        this.x = x,
            this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Shelbon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})
//este es el api que debo combertir para utilizarlo con websocket
app.post("/shelbon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.shelbon || ""
    const shelbon = new Shelbon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarShelbon(shelbon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/shelbon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/shelbon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.get("/shelbon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.set('port', process.env.PORT || 8080)

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(app.get('port'), () => {
    console.log('servidor funcioando', app.get('port'))
})

const socketIO = require('socket.io')
const io = socketIO(server)

io.on('connection', (socket) => {
    const jugador = new Jugador(socket.id)

    jugadores.push(jugador)
    
    socket.emit('jugadorConectado', { id: socket.id });
    console.log('new connection', socket.id)
    socket.on('disconnect', function () {
        console.log('Got disconnect!', socket.id)
        jugadores = jugadores.filter(jugador => jugador.id !== socket.id);
    })
})
