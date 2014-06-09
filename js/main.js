var clicked = false;
var ranPokeball = false;
var pokeballSpin;
$(document).ready(function(){

/* ======================================================================
Welcome Text Animation and Sound
====================================================================== */
  var text = document.getElementById("welcome").firstElementChild;
  var time = 0;
  var fontSize = 0;
  var topPosition = text.offsetTop;
  var soundClip = new Audio("assets/sounds/opening.mp3");
  soundClip.play();

  var textGrower = setInterval(function(){
    time += 50;
    if (fontSize <= 60){
      topPosition -= 5;
      text.style.top = topPosition + "px";
      text.style.fontSize = ++fontSize + "px";
    }
    if (time > 4000){
      text.innerHTML = "Kendrick Parks<br /><br /><span style='font-size:24px'>A Full Stack Web Developer</span>"
    }
    if (time >= 5000){
      soundClip.pause();
      clearInterval(textGrower);
    }
  }, 50); 


/* ======================================================================
Chocobo Animation
====================================================================== */
  var chocobo = document.getElementById("chocobo");
  var backgroundPosition = 0;
  var screenPosition = document.getElementById("home").offsetWidth + 100;
  var chocoboRunner = setInterval(function(){
    chocobo.style.backgroundPosition = backgroundPosition + "px -100px";
    chocobo.style.left = screenPosition + "px";
    if (chocobo.offsetLeft < -100) {
      screenPosition = document.getElementById("home").offsetWidth + 100;
    }
    else {
      screenPosition -= 10;
    }
    if (backgroundPosition <= -300){
      backgroundPosition = 0;
    }
    else if(backgroundPosition <= -200) {
      backgroundPosition = -300;
    }
    else if(backgroundPosition <= -100) {
      backgroundPosition = -200;
    }
    else if(backgroundPosition <= 0) {
      backgroundPosition = -100;
    }
  }, 150);
  /* ======================================================================
  Loop through each link in the navbar and add event listeners
  ====================================================================== */
  var links = document.getElementById("navbar-links").children[0].children;
  for (var i=0; i<links.length; i++){
    writeEventListener(links, i);
  }

  /* ======================================================================
  Scroll to top of page when the navbar logo is clicked
  ====================================================================== */
  document.getElementById("navbar-logo").addEventListener("click", function(){
    $('html, body').animate({
        scrollTop: $("#home").offset().top,
      }, 1000);
    removeClassActive(links);
  });

  /* ======================================================================
  Add mouseover listener to whatido section
  ====================================================================== */
  var services = document.getElementsByClassName("services");
  for (var i=0; i<services.length; i++){
    services[i].addEventListener("mouseover", function(){
      $(this).removeClass("drop");
      $(this).addClass("lift");
    });
  }

  /* ======================================================================
  Add mouseout listener to whatido section
  ====================================================================== */
  var services = document.getElementsByClassName("services");
  for (var i=0; i<services.length; i++){
    services[i].addEventListener("mouseout", function(){
      $(this).removeClass("lift");
      $(this).addClass("drop");
    });
  }
  
});

/* ======================================================================
Scroll to section of page when navbar link is clicked
====================================================================== */
function writeEventListener(links, i) {
  var name = links[i].innerText.split(" ").join("").toLowerCase();
  links[i].addEventListener('click', function(){
      clicked = true;
      $('html, body').animate({
        scrollTop: $("#" + name).offset().top
      }, 1000,function(){clicked = false;});
      //change the active class so the navbar item is selected
      changeActive(links, i);
    });

  /* ======================================================================
  When Scrolling have the nav bar switch what section it is on
  ====================================================================== */
  window.addEventListener("scroll", function(e){
      if (!clicked) {
      var length = 1;
      var scrollItem = document.getElementById(name);
      var navBarHeight = document.getElementsByTagName("nav")[0].offsetHeight;
      //each if statement checks to see if the section hits the navbar
      //it also changes which navbar item has class active, if it runs all the way through the last item will take priority and be active
      if (scrollItem.offsetTop - navBarHeight <= window.pageYOffset && links.length - length >= 0 && i == links.length - length++){
        changeActive(links, i);
      }
      else if (scrollItem.offsetTop - navBarHeight <= window.pageYOffset && links.length - length >= 0 && i == links.length - length++){
        changeActive(links, i);
      } 
      else if (scrollItem.offsetTop - navBarHeight <= window.pageYOffset && links.length - length >= 0 && i == links.length - length++){
        changeActive(links, i);
      } 
      else if (scrollItem.offsetTop - navBarHeight <= window.pageYOffset && links.length - length >= 0 && i == links.length - length++){
        changeActive(links, i);
      }
      //this is a special check just for the home element
      else if (document.getElementById("home").offsetHeight - navBarHeight >= window.pageYOffset && links.length - length >= 0 && i == links.length - length++){
        removeClassActive(links);
      }

      //start pokemon sequence
      if (window.pageYOffset >= document.getElementById("aboutme").offsetTop - document.getElementById("aboutme").offsetHeight / 4){
        launchPokeball();
      }
    }
  });
}

/* ======================================================================
Remove active class from all the links
====================================================================== */
function removeClassActive(links){
  for(var j=0; j<links.length; j++){
        $(links[j]).removeClass("active");
      }
}


/* ======================================================================
Add active class to only one link
====================================================================== */
function changeActive(links, i){
  removeClassActive(links);
  $(links[i]).addClass("active");
}


function launchPokeball() {
  if (!ranPokeball) {
    ranPokeball = true;
    console.log("launchPokeball");
    var container = document.getElementById("aboutme");
    var pokeball = document.createElement("div");
    pokeball.id = "pokeball";
    container.appendChild(pokeball);




    var ball = document.getElementById("ball");
    var maxX = container.clientWidth - container.clientWidth/4;
    var maxY = -container.clientHeight + container.clientHeight/4;

    var duration = 5; // seconds
    var gridSize = 50; // pixels

    var start = null;
    startPokeballSpin();
    function step(timestamp)
    {
      var progress, x, y, y2;
      if(start === null) start = timestamp;

      progress = (timestamp - start) / duration / 1000; // percent
      
      
      x = progress * maxX/gridSize; // x = ƒ(t)
      y = 5 * Math.cos(x);
      
      if (y <= 0 && progress < 0.3){
        console.log("first bounce");
        y = -3 * Math.cos(x); // y = ƒ(x)
        x = (1.5 * progress * maxX/gridSize) + (0.3 *maxX/gridSize);
        pokeball.style.left = Math.min(maxX, gridSize * x) + "px";
        pokeball.style.bottom = maxY/2 + (gridSize * y) + "px";
        requestAnimationFrame(step);
      }
      else if (y >= 0 && progress < 0.8 && progress >= 0.24){
        console.log("2nd bounce")
        y = 2 * Math.cos(x); // y = ƒ(x)
        x = (progress * maxX/gridSize) + (0.425 *maxX/gridSize);
        pokeball.style.left = Math.min(maxX, gridSize * x) + "px";
        pokeball.style.bottom = maxY/2 + (gridSize * y) + "px";
        requestAnimationFrame(step);
      }
      else if (progress >= 0.4) {
        console.log("end")
        pokeball.style.left = pokeball.offsetLeft;
        console.log(progress)
        pokeball.style.bottom = (maxY/2 + 25) + "px";
        openPokeball();
      }
      else {
        x = 5 * progress * maxX/gridSize;
        pokeball.style.left = Math.min(maxX, gridSize * x) + "px";
        pokeball.style.bottom = maxY/2 + (gridSize * y) + "px";
        requestAnimationFrame(step);
        console.log("out of phase")
      }
        


        
      
    }

    requestAnimationFrame(step);

  }
}


function openPokeball() {
  clearInterval(pokeballSpin);
  console.log("stop spinning")
  showPokeKendrick()
  var pokeball = document.getElementById("pokeball");
  pokeball.style.height = "125px";
  pokeball.style.backgroundImage = "url('assets/images/pokeballopen.png')";
  pokeball.style.backgroundSize = "contain";
  pokeball.style.backgroundPosition = "0 0";
}

function startPokeballSpin() {
  console.log("start spin")
  var leftPosition = 0;
  pokeballSpin = setInterval(function() {
    if (leftPosition < 0) {
      leftPosition += 63;
    }
    else {
      leftPosition = -693;
    }
    console.log("spinning")
    pokeball.style.backgroundPosition = leftPosition + "px 0";
  }, 35);
}

function showPokeKendrick() {
  var container = document.getElementById("aboutme");
  var kendrick = document.createElement("div");
  var pokeball = document.getElementById("pokeball");
  container.appendChild(kendrick);
  kendrick.id = "kendrick";
  kendrick.style.position = "relative";
  kendrick.style.backgroundImage = "url('assets/images/kendrick.png')";
  kendrick.style.backgroundSize = "cover";


  var height = 0;
  var kendrickGrower = setInterval(function(){
    height += 25;
    kendrick.style.width = Math.round(height*0.559) + "px";
    kendrick.style.height = height + "px";
    console.log(pokeball.offsetTop/2)
    kendrick.style.left = (pokeball.offsetLeft + kendrick.offsetWidth/2)  + "px"
    kendrick.style.bottom =  (pokeball.offsetBottom - kendrick.offsetHeight/2)+ "px";
    if (height >= 487){
      clearInterval(kendrickGrower);
      kendrick.style.left = (pokeball.offsetLeft + kendrick.offsetWidth/2)  + "px"
      kendrick.style.bottom =  (pokeball.offsetBottom - kendrick.offsetHeight/2)+ "px";
      pokeball.style.backgroundPosition = "100 0"; 
      bringInPokedex(); 
    }
  }, 50);

}

function bringInPokedex() {
  var container = document.getElementById("aboutme");
  var pokedex = document.createElement("div");
  var pokedexImage = document.createElement("div");
  var pokedexText = document.createElement("div");

  pokedex.appendChild(pokedexImage);
  pokedex.appendChild(pokedexText);
  container.appendChild(pokedex);

  pokedex.id = "pokedex";
  pokedex.style.width = container.offsetWidth / 1.75;
  pokedex.style.height = pokedex.offsetWidth * 0.75;
  pokedex.style.backgroundImage = "url('assets/images/pokedex.png')";
  pokedex.style.backgroundPosition = "-1px 0";
  pokedex.style.position = "absolute";
  pokedex.style.backgroundSize = "cover";
  pokedex.style.backgroundRepeat = "no-repeat"
  pokedex.style.top = (container.offsetTop + container.offsetHeight - pokedex.offsetHeight - (container.offsetHeight * 0.10)) + "px";
  pokedex.style.left = "2%";
  animatePokedex();
}

function animatePokedex() {
  var pokedex = document.getElementById("pokedex");
  var backgroundPosition = 5;
  // var changeBackground = setInterval(function(){
    console.log(backgroundPosition >= -4000)
    // if (backgroundPosition >= -4000){
      pokedex.style.backgroundPosition = backgroundPosition + "px 0";
      // backgroundPosition -= 730;
      setTimeout(function(){
        backgroundPosition -= 728;
        pokedex.style.backgroundPosition = backgroundPosition + "px 0";
        setTimeout(function(){
          backgroundPosition -= 735;
          pokedex.style.backgroundPosition = backgroundPosition + "px 0";
          setTimeout(function(){
            backgroundPosition -= 730;
            pokedex.style.backgroundPosition = backgroundPosition + "px 0";
            setTimeout(function(){
              backgroundPosition -= 728;
              pokedex.style.backgroundPosition = backgroundPosition + "px 0";
              setTimeout(function(){
                backgroundPosition -= 733;
                pokedex.style.backgroundPosition = backgroundPosition + "px 0";
              },75);
            },75);
          },75);
        },75);
      },75);
    // }
    // else {
    //   clearInterval(changeBackground);
    // }
  // },100);
}