const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const mensajeOculto = document.querySelector(".m-sinTexto");
const mensajeOculto2 = document.querySelector(".m-sugerencia");
const btnCopiar = document.querySelector(".copiar");

/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
 */

function validarFormato() { //valida que haya texto ingresado y que coincida con el formato requerido
    let texto = textArea.value;
    if (texto != "") {//verifica que se haya ingresado texto
        let validador = texto.match(/^[a-z ]*$/);

        if (!validador || validador === 0) {//valida que solo hayan caracteres de la a a la z 
            alert("Solo son permitidas letras minúsculas y sin acentos, por favor corrija el texto ingresado");
            return true;
        }
    } else {
        mostrarMensajeOculto();
        alert("Por favor ingrese algún texto");
        return true;
    }  
}
function mostrarMensajeOculto() {//reinicia el aspecto del área del mensaje encriptado o desencriptado
    mensaje.value = "";
    mensaje.style.backgroundImage = "url(imagenes/Muñeco.png)";
    btnCopiar.style.visibility = "hidden";
    mensajeOculto.style.visibility = "visible";
    mensajeOculto2.style.visibility = "visible";
}

function ocultarMensaje (){//oculta el botón de copiar y los mensajes
    textArea.value = "";
    mensajeOculto.style.visibility = "hidden";
    mensajeOculto2.style.visibility = "hidden";
    mensaje.style.backgroundImage = "none";
    btnCopiar.style.visibility = "visible";
}

function btnEncriptar (){//muestra el texto encriptado y oculta los mensajes
    if(!validarFormato()) {
        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
        ocultarMensaje();
    }
}

function encriptar(stringEncriptado){//realiza la encriptación del texto sustituyendo las vocales por las claves
    let matrizCodigo= [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];//iniciliza la clave
    
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptado.includes(matrizCodigo[i][0])) {//verifica  las vocales del texto
            stringEncriptado = stringEncriptado.replaceAll(matrizCodigo[i][0],matrizCodigo[i][1]);//reemplaza la vocal con la clave
        }
    }
    return stringEncriptado;
}

function btnDesncriptar (){//muestra el texto desencriptado y oculta los mensajes
    if(!validarFormato()) {
        const textoDesencriptado = desencriptar(textArea.value);
        mensaje.value = textoDesencriptado;
        ocultarMensaje();
    }
}

function desencriptar(stringDesencriptado){//realiza la desencripción del mensaje utilizando la clave
    let matrizCodigo= [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    
    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptado.includes(matrizCodigo[i][1])) {//verifica si el mensaje incluye las secuencias de la clave
            stringDesencriptado = stringDesencriptado.replaceAll(matrizCodigo[i][1],matrizCodigo[i][0]);//reemplaza las secuencias por la vocal correspondiente
        }
    }
    return stringDesencriptado;
}

function copiar (){//almacena el texto del textarea del mensaje en el portapapeles
       
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value);
    mostrarMensajeOculto();
    alert("Texto copiado y listo para usar");
}
