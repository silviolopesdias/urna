let seuVotoPara = document.querySelector(".div1-left-1 span")
let cargo = document.querySelector(".div1-left-2 span")
let descrição = document.querySelector(".div1-left-4")
let aviso = document.querySelector(".div2")
let lateral = document.querySelector(".div1-right")
let numeros = document.querySelector(".div1-left-3")


let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];



function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = '';
    numero = '';
    VotoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {

        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descrição.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizarInterface() {

    let etapa = etapas[etapaAtual]

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }

    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        descrição.innerHTML = `Ǹome: ${candidato.nome}<br> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for (let i in candidato.fotos) {

            fotosHtml += `<div class="div1-image"><img src="./assets/${candidato.fotos[i].url}" alt="imagem-candidato">${candidato.fotos[i].legenda}</div>`
        }
        lateral.innerHTML = fotosHtml;

    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descrição.innerHTML = ' <div class= "aviso-grande pisca">VOTO NULO</div> '

    }
}




function clicou(n) {

    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizarInterface()
        }
    }
}


function branco() {
    numero = '';
    votoBranco =true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descrição.innerHTML = ' <div class= "aviso-grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = '';

}
function corrige() {
   comecarEtapa()
}

function confirma() {

    let etapa = etapas[etapaAtual]

    let votoConfirmado = false

    if(votoBranco === true){
     
        votoConfirmado = true
       votos.push({
           etapa: etapas[etapaAtual].titulo,
            voto:  "branco"
       })
    
    }else if (numero.length === etapa.numeros) {

         votoConfirmado = true

         votos.push({
            etapa: etapas[etapaAtual],
             voto:  numero
        })
     
       
    } 

    if(votoConfirmado){
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector('.tela').innerHTML = ' <div class= "aviso-gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

comecarEtapa()
