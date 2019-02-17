function collision(jqDiv1, jqDiv2) {
      var x1 = jqDiv1.offset().left;
      var y1 = jqDiv1.offset().top;
      var h1 = jqDiv1.outerHeight(true);
      var w1 = jqDiv1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = jqDiv2.offset().left;
      var y2 = jqDiv2.offset().top;
      var h2 = jqDiv2.outerHeight(true);
      var w2 = jqDiv2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      /*if(jqDiv2.attr("id")=="malo" && jqDiv1 attr("id")=="capa"){

      }*/
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
}
//Variables

  var player = $('#capa');
  var fondo = $('#primeraCapa');
  var bordeArriba = $('#paredTop');
  var bordeAbajo = $('#paredBot');
  var bordeDerecha = $('#paredRight');
  var bordeIzquierda = $('#paredLeft');
  var malo = $('.malo');
  var contadorVidas = 3;
  var nivel = 1;
  var tiempo = 100;
  var puntuacion = 0;
  var ultimoMovimiento = "";
$(document).ready(function(){
      $("#mensajeMuerte").hide();
      $("#mensajePasarNivel").hide();
      $("#mensajeInicio").hide();
      //moverDisparos();
      teclaUp();
      teclaDown();
      reiniciarJuego();
      //recargarNivel();
      //animateDiv();
      //mostrarNivel();
      //iniciarCuentaAtras();
      $("#tiempoX").html(tiempo);
      clearInterval(iniciarCuentaAtras);
});
/***********************************TECLAS********************************************/
      function teclaDown(){
        $(document).keydown(function(tecla){

          if (tecla.keyCode == 40) {//Abajo
              if($("#capa> img").attr("src") == "img/estaticas/izquierda.png"){
                $("#capa> img").attr("src", "img/naveIz.gif");
              }else if($("#capa> img").attr("src") == "img/estaticas/derecha.png"){
                $("#capa> img").attr("src", "img/naveDer.gif");
              }
              player.animate({top: "+=10px"},10);
          }else if(tecla.keyCode == 38) {//Arriba
              if($("#capa> img").attr("src") == "img/estaticas/izquierda.png"){
                $("#capa> img").attr("src", "img/naveIz.gif");
              }else if($("#capa> img").attr("src") == "img/estaticas/derecha.png"){
                $("#capa> img").attr("src", "img/naveDer.gif");
              }
              player.animate({top: "-=10px"},10);
          }else if(tecla.keyCode == 37){//Izquierda
              $("#capa> img").attr("src", "img/naveIz.gif");
              player.animate({left: "+=-10px"},10);
          }
          else if(tecla.keyCode == 39){//Derecha
              $("#capa> img").attr("src", "img/naveDer.gif");
              player.animate({left: "+=10px"},10);
          }

      });
      }
      function teclaUp(){
        $(document).keyup(function(tecla){
        if(tecla.keyCode == 37){
            $("#capa> img").attr("src", "img/estaticas/izquierda.png");
            ultimoMovimiento = "izquierda";
        }
        else if(tecla.keyCode == 39){
            $("#capa> img").attr("src", "img/estaticas/derecha.png");
            ultimoMovimiento = "derecha";
        }
        else if(tecla.keyCode == 40){
            if($("#capa> img").attr("src") == "img/naveIz.gif"){
              $("#capa> img").attr("src", "img/estaticas/izquierda.png");
            }else if($("#capa> img").attr("src") == "img/naveDer.gif"){
              $("#capa> img").attr("src", "img/estaticas/derecha.png");
            }
        }
        else if(tecla.keyCode == 38){
            if($("#capa> img").attr("src") == "img/naveIz.gif"){
              $("#capa> img").attr("src", "img/estaticas/izquierda.png");
            }else if($("#capa> img").attr("src") == "img/naveDer.gif"){
              $("#capa> img").attr("src", "img/estaticas/derecha.png");
            }
        }

      });
      }
/******************************FIN TECLAS******************************************/
// Disparar
  $(document).keydown(function(tecla){
    if(tecla.keyCode == 32){
      disparo(ultimoMovimiento);
    }
  });

function disparo(ultimoMovimiento){
  var posicion = player.position();
  switch (ultimoMovimiento) {
    case "derecha":
      // Disparar
      fondo.append('<img class="balaDer" width="100px" height="45px" src="img/proyectilD.png">');
      $(".balaDer").css({"position":"relative","left": posicion.left+30, "top": posicion.top-180});
      m3 = setInterval(movimientoBalaD,1);
      m4 = setInterval(colisionBalaD,5);
      m5 = setInterval(colisionBalaMalo,5);
      break;
    case "izquierda":
      // Disparar
      fondo.append('<img class="balaIzq" width="100px" height="45px" src="img/proyectilI.png">');
      $(".balaIzq").css({"position":"relative", "left": posicion.left-70, "top": posicion.top-180});
      m6 = setInterval(movimientoBalaI,1);
      m7 = setInterval(colisionBalaI,5);
      m8 = setInterval(colisionBalaMaloI,5);
      break;
  }
}
// Balas
function movimientoBalaD(){
  $(".balaDer").animate({left: "+=10px"},1);
}
function movimientoBalaI(){
  $(".balaIzq").animate({left: "-=10px"},1);
}
function colisionBalaI(){
  var bColision = collision($('.balaIzq'),bordeIzquierda);

  if( bColision > 0){
    $('.balaIzq').stop(true);
    $('.balaIzq').remove();
    clearInterval(m6);
    clearInterval(m7);
  }
}
function colisionBalaD(){
  var bColision = collision($('.balaDer'),bordeDerecha);

  if( bColision > 0){
    $('.balaDer').stop(true);
    $('.balaDer').remove();
    clearInterval(m3);
    clearInterval(m4);
  }
  
}
function colisionBalaMaloI(){
  var bColision = collision($('.balaIzq'),malo);

  if( bColision > 0){
    malo.stop(true);
    $('.balaIzq').stop(true);
    $('.balaIzq').remove();
    malo.hide();
    //clearInterval(m1);
    //clearInterval(m2);
    clearInterval(m6);
    clearInterval(m7);
    clearInterval(m8);
    //nMalos++;
    //crearMalos();
    pasarNivel();
    sumarPuntos();
    mostrarPuntos();
  }
}
function colisionBalaMalo(){
  var bColision = collision($('.balaDer'),malo);

  if( bColision > 0){
    malo.stop(true);
    $('.balaDer').stop(true);
    $('.balaDer').remove();
    malo.hide();
    //clearInterval(m1);
    //clearInterval(m2);
    clearInterval(m3);
    clearInterval(m4);
    clearInterval(m5);
    //nMalos++;
    //crearMalos();
    pasarNivel();
    sumarPuntos();
    mostrarPuntos();
  }
}


setInterval(detectarColision,5);
function detectarColision(){

  var bColision1 = collision(player,bordeDerecha);
  var bColision2 = collision(player,bordeIzquierda);
  var bColision3 = collision(player,bordeArriba);
  var bColision4 = collision(player,bordeAbajo);
  var bColision5 = collision(malo,bordeDerecha);
  var bColision6 = collision(malo,bordeIzquierda);
  var bColision7 = collision(malo,bordeArriba);
  var bColision8 = collision(malo,bordeAbajo);
  var colisionPersonajes = collision(player,malo);
  //Si los personajes player y malo se chocan
  if(colisionPersonajes > 0){
    clearInterval(recargarNivel);
    clearInterval(reiniciarJuego);
    clearInterval(intervalTiempo);
    recargarNivel();
    mostrarMensajeDeMuerte();
    restarVida();
    if(contadorVidas == 0){
      reiniciarJuego();
    }
    mostrarVidas();
  }

  if( bColision1 > 0){
    player.stop(false,false);   
    player.animate({left: "+=-3px"},1);
  }
  if( bColision2 > 0){
    player.stop(false,false);   
    player.animate({left: "+=3px"},1);
  }
  if( bColision3 > 0){
    player.stop(false,false);   
    player.animate({top: "+=3px"},1);
  }
  if( bColision4 > 0){
    player.stop(false,false);   
    player.animate({top: "+=-3px"},1);
  }
  if( bColision5 > 0){
    malo.stop(false,false);  
    malo.animate({left: "+=-1px"},1); 
    animateDiv();
  }
  if( bColision6 > 0){
    malo.stop(false,false);
    malo.animate({left: "+=1px"},1); 
    animateDiv();
  }
  if( bColision7 > 0){
    malo.stop(false,false);
    malo.animate({top: "+=1px"},1);  
    animateDiv();
  }
  if( bColision8 > 0){
    malo.stop(false,false);
    malo.animate({top: "+=-1px"},1);
    animateDiv();
  }

}
function makeNewPosition(){

   // Get viewport dimensions (remove the dimension of the div)
   var h = $(fondo).height() - 50;
   var w = $(fondo).width() - 50;

   var nh = Math.floor(Math.random() * h);
   var nw = Math.floor(Math.random() * w);

   return [nh,nw];    

   }

  function animateDiv(){
  var newq = makeNewPosition();
  var oldq = $(malo).offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

   $(malo).animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDiv();        
    });

   };

  function calcSpeed(prev, next) {

   var x = Math.abs(prev[1] - next[1]);
   var y = Math.abs(prev[0] - next[0]);

   var greatest = x > y ? x : y;

   var speedModifier = 0.1;

   var speed = Math.ceil(greatest/speedModifier);

   return speed;

   }

  function mostrarMensajeDeMuerte(){
    $("#mensajeMuerte").show();
    // Ejercicio 3, texto animado, cambio de tamaño y color
    $("#mensajeMuerte").animate({
      fontSize: "50px"
    }, "slow");
    $("#mensajeMuerte").queue( function(){
      $("#mensajeMuerte").css({"color" : "brown"});
      $("#mensajeMuerte").dequeue();
    });

    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        $("#mensajeMuerte").hide();
      }
    });
   }
   function mostrarMensajeDePasarNivel(){
    $("#mensajePasarNivel").show();
    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        $("#mensajePasarNivel").hide();
      }
    });
   }
   function mostrarMensajeInicio(){
    $("#mensajeInicio").show();
    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        $("#mensajeInicio").hide();
      }
    });
   }

  function restarVida(){
    contadorVidas--;
  }
  function mostrarVidas(){
    if(contadorVidas == 2){
      $('#vida3').hide();
    }
    if(contadorVidas == 1){
      $('#vida3').hide();
      $('#vida2').hide();
    }
    if(contadorVidas == 3){
      $('#vida3').show();
      $('#vida2').show();
      $('#vida1').show();
    }
  }
  var mov = null;
  function personajesParados(){
    player.stop(true);
    clearInterval(animateDiv);
    malo.stop(true);
  }
  // Se acaban las 3 vidas y se empieza de 0
  var intervalTiempo = null;
  function reiniciarJuego(){
    contadorVidas = 3;
    nivel = 1;
    tiempo = 100;
    mostrarMensajeInicio();
    clearInterval(intervalTiempo);
    mov = setInterval(personajesParados,5);//No deja que se muevan los personajes
    mostrarNivel();
    mostrarPuntos();
    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        clearInterval(mov);
        animateDiv();
        iniciarCuentaAtras();
      }
    });
    clearInterval(reiniciarJuego);
  }
  // Muere y se queda en el nivel que estaba porque aún le quedan vidas
  
  function recargarNivel(){
    malo.stop(true);
    player.stop(true);
    player.css({"left":"0px","top":"0px"});
    malo.css({"left":"800px","top":"0px"});
    mov = setInterval(personajesParados,5);
    clearInterval(intervalTiempo);
    mostrarNivel();
    mostrarPuntos();
    tiempo = 100;
    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        animateDiv();
        clearInterval(mov);
        iniciarCuentaAtras();
        malo.show();
      }
    });
    clearInterval(recargarNivel);
  }

  function mostrarNivel(){
    $("#nivelX").html(nivel);
  }
  //Tiempo RELOJ
  function iniciarCuentaAtras(){
    // Tiempo
   intervalTiempo = setInterval(cuentaAtras,1000);
    $("#tiempoX").html(tiempo);
  }
  function cuentaAtras(){
    if (tiempo > 0) {
      tiempo--;
    }else {
      clearInterval(recargarNivel);//Paramos todo
      clearInterval(reiniciarJuego);//Paramos todo
      clearInterval(intervalTiempo);//Paramos todo
      pasarNivel();
    }
    $("#tiempoX").html(tiempo);
  }
  function pasarNivel(){
    tiempo = 10;
    nivel++;
    clearInterval(recargarNivel);//Paramos todo
    clearInterval(reiniciarJuego);//Paramos todo
    clearInterval(intervalTiempo);//Paramos todo
    recargarNivel();
    //mostrarNivel();
    mostrarMensajeDePasarNivel();
  }
  function sumarPuntos(){
    puntuacion +=50;
  }
  function mostrarPuntos(){
    $("#puntosX").html(puntuacion);
  }


