const background = document.querySelector("#background")
const b = background.getContext("2d")
background.width = window.innerWidth
background.height = window.innerHeight
//intro container DOM

const introductionContainer = document.querySelector("#introductionContainer")
const agregarPalabraInput = document.querySelector("#agregarPalabraInput")
const iniciarJuego = document.querySelector("#iniciarJuego")

// game container DOM 
const gameContainer = document.querySelector("#gameContainer")
const canvas = document.querySelector("#cadalso")
const agregarLetra = document.querySelector("#agregarLetra")
const usadas = document.querySelector("#usadas")
const intentar = document.querySelector("#intentar")
const palabraSecreta = document.querySelector("#palabraSecreta")
const errorInput =document.querySelector("#errorInput")

//endGame DOM

const endGameContainer = document.querySelector("#endGameContainer")
const mensajeFinal = document.querySelector("#mensajeFinal")
const playAgain = document.querySelector("#playAgain")

//inicializacion

iniciarJuego.addEventListener("click",intro)

const c = canvas.getContext("2d")

let palabra = ""
let palabraSecretaArray = []
let letrasUsadas = []
let inputUpperCase = []
let finalInput = ""
let intentosFallidos = 0
let letrasDescubiertas = []


intentar.addEventListener("click",gameLoop)

playAgain.addEventListener("click",reset)

//funcionamiento de la introduccion 

function intro(){
    if(agregarPalabraInput.value === ""){
        palabra = ["ALURA"][Math.floor(Math.random()*0)]
        
    }else{
        palabra = agregarPalabraInput.value.toUpperCase().trim()
        
    }
    
    introductionContainer.classList.add("noMostrar")
    gameContainer.classList.remove("noMostrar")
    canvas.classList.remove("noMostrar")
    palabraSecretaArray = palabra.split("").map(letter=>" _ ")
    agregarLetra.focus()
    agregarLetras()
    drawCadalso()
}

//funcionamiento del juego


function agregarLetras(choosedLetter){
    if(!choosedLetter) return palabraSecreta.innerText = palabraSecretaArray.join("")
    
    palabra.split("").map((letter,index)=>{
        if(letter === choosedLetter) palabraSecretaArray[index] = choosedLetter
    })
     
    palabraSecreta.innerText = palabraSecretaArray.join("")
    agregarLetra.value = ""
    agregarLetra.focus()
}


function desecharLetra(choosedLetter){
    letrasUsadas.push(choosedLetter)
    usadas.innerText = letrasUsadas.join(" , ")
    agregarLetra.value = ""
    agregarLetra.focus()
}

function errorElegirLetra(mensaje){
    errorInput.innerText = mensaje
    errorInput.style = "opacity: 1"
    setTimeout(()=>{
        errorInput.style = "opacity: 0"
    },1000)
}


function validacion(letra){
    //validacion
    
    if(letrasDescubiertas.includes(letra)||letrasUsadas.includes(letra)){
        errorElegirLetra("ya ha ingresado esa letra")
        agregarLetra.value = ""
        agregarLetra.focus()
        return false
    }
    if(letra.length > 1){
        errorElegirLetra("solo puede ingresar una letra a la vez")
        agregarLetra.value = ""
        agregarLetra.focus()
        return false
    }
    if(!letra.match(/[a-z]/i)){
        errorElegirLetra("solo puede ingresar letras")
        agregarLetra.value = ""
        agregarLetra.focus()
        return false
    }

    return true
}

function gameLoop(){
    const letra = agregarLetra.value.toUpperCase()

    if(!validacion(letra))return

    if(palabra.includes(letra)){
        agregarLetras(letra)
        letrasDescubiertas.push(letra)
        
    }else{
        desecharLetra(letra)
        intentosFallidos++
        bodyDraw[intentosFallidos-1]()
    }

    if(intentosFallidos===6){
        gameContainer.classList.add("noMostrar")
        mensajeFinal.innerText = `Fin del juego
        Perdiste, Intenta de nuevo!`
        endGameContainer.classList.remove("noMostrar")
        
    }
    if(letrasDescubiertas.length=== new Set(palabra).size){
        gameContainer.classList.add("noMostrar")
        mensajeFinal.innerText = `Fin del juego
        Ganaste, Felicidades!
        Palabra descubierta: ${palabra.toUpperCase()}
    `
        endGameContainer.classList.remove("noMostrar")
        
    }
}

function reset(){
    palabra = ""
    palabraSecretaArray = []
    letrasUsadas = []
    inputUpperCase = []
    finalInput = ""
    intentosFallidos = 0
    letrasDescubiertas = []
    usadas.textContent = ""
    introductionContainer.classList.remove("noMostrar")
    gameContainer.classList.add("noMostrar")
    canvas.classList.add("noMostrar")
    endGameContainer.classList.add("noMostrar")
    c.clearRect(0,0,canvas.width,canvas.height)
    drawCadalso()
}

// canvas

canvas.width = 300
canvas.height = 300

function drawHead(x,y){
    c.beginPath()
    c.arc(x,y,20,0,2*Math.PI)
    c.strokeStyle = "white"
    c.stroke()
}

function drawBody(origen,to){
    c.beginPath()
    c.moveTo(origen.x,origen.y)
    c.lineTo(to.x,to.y)
    c.strokeStyle = "white"
    c.stroke()
}

function leftArm(origen,to){
    c.beginPath()
    c.moveTo(origen.x,origen.y)
    c.lineTo(to.x,to.y)
    c.strokeStyle = "white"
    c.stroke()
}

function rightArm(origen,to){
    c.beginPath()
    c.moveTo(origen.x,origen.y)
    c.lineTo(to.x,to.y)
    c.strokeStyle = "white"
    c.stroke()
}

function leftLeg(origen,to){
    c.beginPath()
    c.moveTo(origen.x,origen.y)
    c.lineTo(to.x,to.y)
    c.strokeStyle = "white"
    c.stroke()
}

function rightLeg(origen,to){
    c.beginPath()
    c.moveTo(origen.x,origen.y)
    c.lineTo(to.x,to.y)
    c.strokeStyle = "white"
    c.stroke()
}

let bodyDraw = [
    ()=>drawHead(canvas.width/2+20,80),
    ()=>drawBody({x:canvas.width/2+20,y:100},{x:canvas.width/2+20,y:160}),
    ()=>leftArm({x:canvas.width/2+20,y:110},{x:150,y:140}),
    ()=>rightArm({x:canvas.width/2+20,y:110},{x:190,y:140}),
    ()=>leftLeg({x:canvas.width/2+20,y:160},{x:150,y:200}),
    ()=>rightLeg({x:canvas.width/2+20,y:160},{x:190,y:200})
]

function drawCadalso(){
    c.beginPath()
    c.fillStyle = "white"
    c.fillRect(30,canvas.height,canvas.width-60,-20)
    c.fillRect(canvas.width/4,canvas.height,20,-canvas.height+20)
    c.fillRect(canvas.width/4+20,20,canvas.width/4,20)
    
    c.beginPath()
    c.moveTo(canvas.width/2,canvas.height-20)
    c.lineTo(canvas.width/4,canvas.height-100)
    c.strokeStyle = "white"
    c.stroke()

    c.beginPath()
    c.moveTo(canvas.width/4,canvas.height-100)
    c.lineTo(canvas.width/2,20)
    c.strokeStyle = "white"
    c.stroke()

    c.beginPath()
    c.moveTo(canvas.width/2+20,20)
    c.lineTo(canvas.width/2+20,60)
    c.strokeStyle = "white"
    c.stroke()
}
