let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias 
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');



// Esta funcion crea una nueva baraja
const crearDesk = () => {
    for (let i = 2; i < 10; i++) {
        for (let tipo of tipos) {
            deck.push(i+tipo);
        }
    }

    for (let tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp+tipo)
        }
    }
    console.log(deck);
    deck = _.shuffle( deck );
    return deck;
}

crearDesk();

// Funcion que permite tomar una carta
const pedirCarta = () =>{
    if (deck.length === 0) {
        throw new Error("No hay cartas");
    }
    const carta = deck.pop();
    return carta;
}

// Pedir Carta
const valorCarta = (carta)=> {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor))?
        (valor === 'A') ? 11 : 10
        : valor*1;
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos)=>{
    do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;
    
    // <img class="carta" src="assets/cartas/2C.png" alt="carta-s"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasComputadora.append(imgCarta);   

    if (puntosMinimos > 21) {
        break
    }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('lastima te gano la computadora')
        } else if( puntosComputadora > 21 ) {
            alert('Ganastes :3');
        } else {
            alert('lastima te gano la computadora')
        }
    }, 100 );
}

// Evento
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png" alt="carta-s"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta);

    if (puntosJugador >21) {
        console.warn('el puntaje es mayor');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21 genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora();
});

btnNuevo.addEventListener('click', ()=>{

    console.clear();
    deck = [];
    deck = crearDesk();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})
