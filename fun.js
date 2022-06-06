window.addEventListener('DOMContentLoaded',function(event){
	var form = document.querySelector("#form-register");
	form.addEventListener('submit',function(e){
		var canSub = true;

		var inputCedula = document.querySelector('#input_cedula').value;
		if (inputCedula == '') {
			document.querySelector('#input_container_cedula .input_error').innerHTML = 'La cédula es requerida';
			canSub = false;
		}else{
			if (validarCedulaRuc(inputCedula)) {
				document.querySelector('#input_container_cedula .input_error').innerHTML = '';
			}else{
				document.querySelector('#input_container_cedula .input_error').innerHTML = 'La cédula ingresada es incorrecta';
				canSub = false;	
			}
		}

		var inputName = document.querySelector('#input_name').value;
		if (inputName == '') {
			document.querySelector('#input_container_name .input_error').innerHTML = 'El nombre es requerido';
			canSub = false;
		}else{
			if (inputName.length >= 3) {
				let uno = inputName.indexOf("1");
				let dos = inputName.indexOf("2");
				let tres = inputName.indexOf("3");
				let cuatro = inputName.indexOf("4");
				let cinco = inputName.indexOf("5");
				let seis = inputName.indexOf("6");
				let siete = inputName.indexOf("7");
				let ocho = inputName.indexOf("8");
				let nueve = inputName.indexOf("9");
				let cero = inputName.indexOf("0");
				  if(uno > 0 || dos>0 || tres>0 || cuatro>0 || cinco>0 || seis>0 || siete>0 || ocho>0 || nueve>0 || cero>0){
				    document.querySelector('#input_container_name .input_error').innerHTML = 'No se permite números';
					canSub = false;	
				  }else{
				    document.querySelector('#input_container_name .input_error').innerHTML = '';
				  }
			}else{
				document.querySelector('#input_container_name .input_error').innerHTML = 'La longitud mínima de caracteres es de 3';
				canSub = false;	
			}
		}

		var inputLastName = document.querySelector('#input_lastname').value;
		if (inputLastName == '') {
			document.querySelector('#input_container_lastname .input_error').innerHTML = 'El apellido es requerido';
			canSub = false;
		}else{
			if (inputLastName.length >= 3) {
				let contar_numeros = inputLastName.replace(/[^0-9]/g,"").length;
				  if(contar_numeros == 0){
				    document.querySelector('#input_container_lastname .input_error').innerHTML = '';
				  }else{
				    document.querySelector('#input_container_lastname .input_error').innerHTML = 'No se permite números';
					canSub = false;	
				  }
			}else{
				document.querySelector('#input_container_lastname .input_error').innerHTML = 'La longitud mínima de caracteres es de 3';
				canSub = false;	
			}
		}

		var inputEmail = document.querySelector('#input_email').value;
		if (inputEmail == '') {
			document.querySelector('#input_container_email .input_error').innerHTML = 'El email es requerido';
			canSub = false;
		}else{
			let nOne = inputEmail.indexOf("@");
			let nDos = inputEmail.indexOf(".");
			console.log(nOne+"-"+nDos)
			  if((nOne > 0 && nDos > 0) && (nOne < nDos)){
			    document.querySelector('#input_container_email .input_error').innerHTML = '';
			  }else{
			    document.querySelector('#input_container_email .input_error').innerHTML = 'Email invalido';
				canSub = false;	
			  }
		}
		if (!canSub) {
			e.preventDefault();
		}
	})
});

function valideKey(evt){
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code>=48 && code<=57) {
      return true;
    } else{
      return false;
    }
}

function validarCedulaRuc(cedula){
    let cedulaCorrecta = false;
    if (cedula.length == 10){    
        let tercerDigito = parseInt(cedula.substring(2, 3));
        if (tercerDigito < 6) {
              // El ultimo digito se lo considera dígito verificador
              let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
              let verificador = parseInt(cedula.substring(9, 10));
              let suma = 0;
              let digito = 0;
              for (let i = 0; i < (cedula.length - 1); i++) {
                  digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
                  suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
              }
              suma= Math.round(suma);
              if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                  cedulaCorrecta = true;
              } else if ((10 - (Math.round(suma % 10))) == verificador) {
                  cedulaCorrecta = true;
              } else {
                  cedulaCorrecta = false;
              }
        } else {
          cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
    return cedulaCorrecta;
}