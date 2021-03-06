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
  var tiempo = 10;
  var puntuacion = 0;

$(document).ready(function(){
      $("#mensajeMuerte").hide();
      $("#mensajePasarNivel").hide();
      $("#mensajeInicio").hide();
      teclaUp();
      teclaDown();
      reiniciarJuego();
      //recargarNivel();
      //animateDiv();
      //mostrarNivel();
      //iniciarCuentaAtras();
      $("#tiempoX").html(tiempo);
      clearInterval(iniciarCuentaAtras);
      //llamadaAMalos();
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
        }
        else if(tecla.keyCode == 39){
            $("#capa> img").attr("src", "img/estaticas/derecha.png");
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
setInterval(detectarColision,5);


function detectarColision(){

  var bColision1 = collision(player,bordeDerecha);
  var bColision2 = collision(player,bordeIzquierda);
  var bColision3 = collision(player,bordeArriba);
  var bColision4 = collision(player,bordeAbajo);
  var bColision5 = collision(malo,bordeDerecha);////////////
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
   var h = fondo.height() - 50;
   var w = fondo.width() - 50;

   var nh = Math.floor(Math.random() * h);
   var nw = Math.floor(Math.random() * w);

   return [nh,nw];    

   }

  function animateDiv(){
  var newq = makeNewPosition();
  var oldq = malo.offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq); /////////////////

   malo.animate({ top: newq[0], left: newq[1] }, speed, function(){
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
    tiempo = 10;
    mostrarMensajeInicio();
    clearInterval(intervalTiempo);
    mov = setInterval(personajesParados,5);//No deja que se muevan los personajes
    mostrarNivel();
    //llamadaAMalos();
    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        clearInterval(mov);
        animateDiv();/////////
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
    tiempo = 10;
    malo.remove();
    $(document).keydown(function(tecla){
      if(tecla.keyCode == 13){
        animateDiv();
        clearInterval(mov);
        iniciarCuentaAtras();
        llamadaAMalos();
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
function llamadaAMalos(){
    for (var i = 1 ; i <= nivel ; i++) {
      var h = $(fondo).height() - 50;
      var w = $(fondo).width() - 50;

      var alto = Math.floor(Math.random() * h);
      var ancho = Math.floor(Math.random() * w);

      $(fondo).append("<div class='malo'><img id='maloIMG'src='img/malo.gif'></div>");
      animateDiv();
    }
  }
  