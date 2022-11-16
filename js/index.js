document.addEventListener("DOMContentLoaded", function() {
    // crea un nuevo objeto `Date`
    var today = new Date();

    document.getElementById("fecha").innerHTML = today;
    // // obtener la fecha de hoy en formato `MM/DD/YYYY`
    var now = today.toLocaleDateString('en-GB');

    document.getElementById("fecha").innerHTML = now

    document.getElementById("divlogin").style.display = "none";

    document.getElementById("divregistro").style.display = "none";

    document.getElementById("divvuelos").style.display = "none";

    document.getElementById("bt3").style.display = "none";

    document.getElementById("buscar").style.display = "none"

    document.getElementById("usuario").style.display = "none";

    document.getElementById("datos").style.display = "none";

    // document.getElementById("origen").

    document.getElementById("bt3").addEventListener("click", function() {
        //console.log(getCookie("galeta"))
        // borrarcookie("cookie")
        // eliminarCookies();
        document.cookie = "galeta=notexist;expires=Thu, 01 Jan 1970 00:00:00 UTC";

        document.getElementById("divlogin").style.display = "none";

        document.getElementById("divregistro").style.display = "none";

        document.getElementById("divvuelos").style.display = "none";

        document.getElementById("response").style.display = "none";

        document.getElementById("bt3").style.display = "none";

        document.getElementById("datos").style.display = "none";

        document.getElementById("buscar").style.display = "none";

        document.getElementById("usuario").style.display = "none";

        document.getElementById("bt2").style.display = "block";

        document.getElementById("bt1").style.display = "block";
    })

    document.getElementById("bt1").addEventListener("click", function() {
        document.getElementById("divlogin").style.display = "block";
        document.getElementById("divregistro").style.display = "none";
        document.getElementById("divvuelos").style.display = "none";
    })

    document.getElementById("bt2").addEventListener("click", function() {
        document.getElementById("divlogin").style.display = "none";
        document.getElementById("divvuelos").style.display = "none";
        document.getElementById("divregistro").style.display = "block";
    })

    document.getElementById("btLogin").addEventListener("click", function() {
        var username = document.getElementById("username").value;
        document.getElementById("nombrerelleno").value = username;
        document.getElementById("nomini").innerHTML = username;
        var pwd = document.getElementById("pwd").value;
        let user2 = {
            username: username,
            pwd: pwd
        };
        console.log(user2)
            //enviar aquest objecte al servidor:
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/server.php"); //obrir connexio
        xhr.send(JSON.stringify(user2)); //enviament de dades: objeto a JSON antes del envio
        xhr.onload = function() { //esperar a rebre dades

            if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
                alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
            } else { // muestra el resultado
                //alert(`Hecho, obtenidos ${xhr.response.length} bytes`); // Respuesta del servidor
                //xhr.response es un JSON que viene desde PHP
                let responseServer = JSON.parse(xhr.response); //reconvertirlo/parsearlo a variable JS
                document.getElementById("response").innerHTML = responseServer;
                if (responseServer == "Welcome Admin") {
                    checkCookie("galeta", username);
                    document.getElementById("bt1").style.display = "none";
                    document.getElementById("bt2").style.display = "none";
                    document.getElementById("divlogin").style.display = "none";
                    document.getElementById("divvuelos").style.display = "block";
                    document.getElementById("bt3").style.display = "block";
                    loadoptions();
                };
            }
        }
    })

    document.getElementById("btregistro").addEventListener("click", function() {
        var nom = document.getElementById("nom").value;
        var username = document.getElementById("username_reg").value;
        var pwd = document.getElementById("pwd_reg").value;
        var pwd2 = document.getElementById("pwdrepeat").value;
        let user2 = {
            nom: nom,
            username: username,
            pwd: pwd,
            pwd2: pwd2
        };
        console.log(user2)
            //enviar aquest objecte al servidor:
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/registro.php"); //obrir connexio
        xhr.send(JSON.stringify(user2)); //enviament de dades: objeto a JSON antes del envio
        xhr.onload = function() { //esperar a rebre dades

            if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
                alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
            } else { // muestra el resultado
                //alert(`Hecho, obtenidos ${xhr.response.length} bytes`); // Respuesta del servidor
                //xhr.response es un JSON que viene desde PHP
                let responseServer = JSON.parse(xhr.response); //reconvertirlo/parsearlo a variable JS
                document.getElementById("response").innerHTML = responseServer;
                // if (responseServer == "Welcome Admin") { checkCookie("cookie", username); };
            }
            document.getElementById("divregistro").style.display = "none";
        }
    })
    document.getElementById("btvuelos").addEventListener("click", function() {
        document.getElementById("response").style.display = "block";
        // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // var d = new Date(salida);
        // var dayName = d.toString().split(' ')[0];
        // console.log(dayName)
        var origen = document.getElementById("origen").value;
        document.getElementById("desde").innerHTML = origen;
        var destino = document.getElementById("destino").value;
        document.getElementById("hacia").innerHTML = destino;
        var salida = document.getElementById("salida").value;
        document.getElementById("fechaida").innerHTML = salida;
        var d = new Date(salida);
        var dayName = d.toString().split(' ')[0];
        console.log(dayName)
        var vuelta = document.getElementById("vuelta").value;
        document.getElementById("fechavuelta").innerHTML = vuelta;
        var di = new Date(vuelta);
        var nameday = di.toString().split(' ')[0];
        console.log(nameday)
        var pasajeros = document.getElementById("pasajeros").value;
        document.getElementById("billetes").innerHTML = pasajeros;
        let viaje = {
            dayName: dayName,
            nameday: nameday,
            origen: origen,
            destino: destino,
            salida: salida,
            vuelta: vuelta,
            pasajeros: pasajeros
        };
        console.log(viaje);
        if (origen == "" || destino == "" || salida == "" || vuelta == "" || pasajeros == "") {
            alert("rellena todos los campos")
        } else if (origen == destino) { alert("el orige y el destino son el mismo") } else { alert("buscando viajes") }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/buscar.php"); //obrir connexio
        xhr.send(JSON.stringify(viaje)); //enviament de dades: objeto a JSON antes del envio
        xhr.onload = function() { //esperar a rebre dades

                if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
                    alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
                } else { // muestra el resultado
                    //alert(`Hecho, obtenidos ${xhr.response.length} bytes`); // Respuesta del servidor
                    //xhr.response es un JSON que viene desde PHP
                    let responseServer = JSON.parse(xhr.response); //reconvertirlo/parsearlo a variable JS
                    document.getElementById("info").innerHTML = responseServer;
                    document.getElementById("preu").innerHTML = responseServer;
                    // if (responseServer == "Welcome Admin") { checkCookie("cookie", username); };
                }
            }
            //nuevo
            // xhr.abort();
        let ls = new XMLHttpRequest();
        ls.open("POST", "./php/salidas.php");
        ls.send(JSON.stringify(viaje));
        ls.onload = function() {

                if (ls.status != 200) {
                    alert(`Error ${ls.status}: ${ls.statusText}`);
                } else {
                    let responseServer = JSON.parse(ls.response);
                    document.getElementById("tt").innerHTML = responseServer; // cambiar tt por salidas
                    // nuevo
                    var data = JSON.parse(ls.response);

                    for (var i = 0; i < data.length; i++) {
                        var option = document.createElement("option");
                        option.value = data[i];
                        option.innerHTML = data[i];
                        document.getElementById("salidas").appendChild(option)
                    };


                    ///
                }
            }
            // ls.abort();
            // lo de arriba hasta //nuevo es nuevo

        //
        let vu = new XMLHttpRequest();
        vu.open("POST", "./php/vueltas.php");
        vu.send(JSON.stringify(viaje));
        vu.onload = function() {

            if (vu.status != 200) {
                alert(`Error ${vu.status}: ${vu.statusText}`);
            } else {
                let responseServer = JSON.parse(vu.response);
                document.getElementById("tt").innerHTML = responseServer; // cambiar tt por salidas
                // nuevo
                var data = JSON.parse(vu.response);

                for (var i = 0; i < data.length; i++) {
                    var option = document.createElement("option");
                    option.value = data[i];
                    option.innerHTML = data[i];
                    document.getElementById("vueltas").appendChild(option)
                };


                ///
            }
        }

        if ((dayName == "Mon") || (dayName == "Fri") || (dayName == "Sat")) {
            disponible = true;
        } else {
            disponible = false;
        }

        if ((nameday == "Mon") || (nameday == "Fri") || (nameday == "Sat")) {
            dis = true;
        } else {
            dis = false;
        }
        console.log(dis);
        console.log(disponible);
        ///
        if (origen == "" || destino == "" || salida == "" || vuelta == "" || pasajeros == "") {
            alert("rellena todos los campos")
        } else if (origen == destino) { alert("el orige y el destino son el mismo") } else {
            if ((disponible == true) && (dis == true)) {
                document.getElementById("divvuelos").style.display = "none";
                document.getElementById("tt").style.display = "none";
                document.getElementById("buscar").style.display = "block";
                // salidas(dayName);
            } else {
                alert("Solo hay vuelos los Lunes, los Viernes y los Sabados")
            }
        }
    })

    document.getElementById("btcomprar").addEventListener("click", function() {
        var horasalida = document.getElementById("salidas").value;
        document.getElementById("anada").innerHTML = horasalida;
        var horavuelta = document.getElementById("vueltas").value;
        document.getElementById("tornada").innerHTML = horavuelta;
        let horarios = {
            horasalida: horasalida,
            horavuelta: horavuelta,
        }
        console.log(horarios);
        document.getElementById("buscar").style.display = "none";
        document.getElementById("usuario").style.display = "block";
    })

    document.getElementById("btcontinuar").addEventListener("click", function() {
        var dni = document.getElementById("dni").value;
        var si;
        si = validaDni(dni);
        console.log(dni);
        console.log(si);
        document.getElementById("dnie").innerHTML = dni;
        var telefono = document.getElementById("telefono").value;
        document.getElementById("mobil").innerHTML = telefono;
        var pat = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/gm;
        var tel;
        if (pat.test(telefono)) {
            tel = true;
        } else {
            tel = false;
        }
        console.log(tel);
        var correo = document.getElementById("correo").value;
        document.getElementById("email").innerHTML = correo;
        var co;
        var pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/; //valido
        //compruebo
        if (pattern.test(correo)) { //correcto
            co = true;
        } else { //si hay problemas con el nombre introducido
            co = false;
        }
        console.log(co);
        if (dni == "" || telefono == "" || correo == "" || si == false || co == false || tel == false) {
            alert("rellena todos los campos");
        } else {
            document.getElementById("usuario").style.display = "none";
            document.getElementById("datos").style.display = "block";
        }
    })

    document.getElementById("print").addEventListener("click", function() {
        window.print()
    })

});


function mueveReloj() {
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    segundo = momentoActual.getSeconds()

    // // crea un nuevo objeto `Date`
    // var today = new Date();

    // // obtener la fecha de hoy en formato `MM/DD/YYYY`
    // var now = today.toLocaleDateString('en-US');
    horaImprimible = hora + " : " + minuto + " : " + segundo

    document.form_reloj.reloj.value = horaImprimible

    setTimeout("mueveReloj()", 1000)
}


function validaNomCognoms(value) {
    // esto funciona
    // true correcto false incorrecto
    var patternom = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
    if (patternom.test(value)) {
        return true;
    } else {
        return false;
    };

}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(namecookie, nameuser) {
    let username = getCookie(namecookie);
    if (username == "") {
        setCookie(namecookie, nameuser)
    }
}

const borrarcookie = (cookie) => {
    document.cookie = "cookie=;max-age=0";
}

// function eliminarCookies() {
//     document.cookie.split(";").forEach(function (c) {
//         document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//     })
// }

// function loadoptions(){
//     let request = new XMLHttpRequest()
//     request.open("GET","./php/vuelos.php");
//     request.send();
//     request.onload = function (){
//         var data= JSON.parse(request.response);

//         for(var i=0;i < data.length;i++){
//             var option = document.createElement("option");
//             option.value = i;
//             option.innerHTML = data[i];
//             document.getElementById("origen").appendChild(option)
//         };

//         for(var i=0;i < data.length;i++){
//             var option = document.createElement("option");
//             option.value = i;
//             option.innerHTML = data[i];
//             document.getElementById("destino").appendChild(option)
//         };
//     }
// }

function loadoptions() {
    let request = new XMLHttpRequest()
    request.open("GET", "./php/vuelos.php");
    request.send();
    request.onload = function() {
        var data = JSON.parse(request.response);

        for (var i = 0; i < data.length; i++) {
            var option = document.createElement("option");
            option.value = data[i];
            option.innerHTML = data[i];
            document.getElementById("origen").appendChild(option)
        };

        for (var i = 0; i < data.length; i++) {
            var option = document.createElement("option");
            option.value = data[i];
            option.innerHTML = data[i];
            document.getElementById("destino").appendChild(option)
        };
    }
}

// function salidas(dayname) {
//     let request = new XMLHttpRequest()
//     request.open("POST", "./php/salidas.php");
//     request.send(JSON.stringify(dayname));
//     request.onload = function () {
//         var data = JSON.parse(request.response);

//         for (var i = 0; i < data.length; i++) {
//             var option = document.createElement("option");
//             option.value = data[i];
//             option.innerHTML = data[i];
//             document.getElementById("salidas").appendChild(option)
//         };
//     }
// }


function validaDni(dni) {

    if (dni.length == 9) {

        let numero = dni.substring(0, 8);
        let letra = dni.substr(dni.length - 1, 1);

        if (isNaN(numero) || !isNaN(letra)) {
            return false;

        } else {
            let calculo = numero % 23; //numero entre 0 i 22

            let letras = "TRWAGMYFPDXBNJZSQVHLCKE";

            if (letra.toUpperCase() == letras[calculo]) {
                return true;
            } else {
                return false

            }
        }

    } else {
        return false

    }

}