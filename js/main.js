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
      if (window.pageYOffset < document.getElementById("aboutme").offsetTop) {
        var background = document.getElementById("background");
        var home = document.getElementById("home");
        background.style.top = window.pageYOffset + "px";
      }

      //start pokemon sequence
      if (window.pageYOffset >= document.getElementById("aboutme").offsetTop - document.getElementById("aboutme").offsetHeight / 10){
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
    var container = document.getElementById("aboutme");
    var pokeball = document.createElement("div");
    pokeball.id = "pokeball";
    container.appendChild(pokeball);


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
        y = -3 * Math.cos(x); // y = ƒ(x)
        x = (1.5 * progress * maxX/gridSize) + (0.3 *maxX/gridSize);
        pokeball.style.left = Math.min(maxX, gridSize * x) + "px";
        pokeball.style.bottom = maxY/2 + (gridSize * y) - container.offsetHeight/2.5 + "px";
        requestAnimationFrame(step);
      }
      else if (y >= 0 && progress < 0.8 && progress >= 0.24){
        y = 2 * Math.cos(x); // y = ƒ(x)
        x = (progress * maxX/gridSize) + (0.425 *maxX/gridSize);
        pokeball.style.left = Math.min(maxX, gridSize * x) + "px";
        pokeball.style.bottom = maxY/2 + (gridSize * y) - container.offsetHeight/2.5 + "px";
        requestAnimationFrame(step);
      }
      else if (progress >= 0.4) {
        pokeball.style.left = pokeball.offsetLeft;
        pokeball.style.bottom = (maxY/2 - gridSize) - container.offsetHeight/2.5 + "px";
        openPokeball();
      }
      else {
        x = 5 * progress * maxX/gridSize;
        pokeball.style.left = Math.min(maxX, gridSize * x) + "px";
        pokeball.style.bottom = maxY/2 + (gridSize * y) - container.offsetHeight/2.5 + "px";
        requestAnimationFrame(step);
      }

        


        
      
    }

    requestAnimationFrame(step);

  }
}


function openPokeball() {
  clearInterval(pokeballSpin);
  showPokeKendrick()
  var pokeball = document.getElementById("pokeball");
  pokeball.style.height = "125px";
  pokeball.style.backgroundImage = "url('assets/images/pokeballopen.png')";
  pokeball.style.backgroundSize = "contain";
  pokeball.style.backgroundPosition = "0 0";
}

function startPokeballSpin() {
  var leftPosition = 0;
  pokeballSpin = setInterval(function() {
    if (leftPosition < 0) {
      leftPosition += 63;
    }
    else {
      leftPosition = -693;
    }
    pokeball.style.backgroundPosition = leftPosition + "px 0";
  }, 35);
}

function showPokeKendrick() {
  var container = document.getElementById("aboutme");
  var kendrick = document.createElement("div");
  var pokeball = document.getElementById("pokeball");
  container.appendChild(kendrick);
  kendrick.id = "kendrick";
  kendrick.style.position = "absolute";
  kendrick.style.backgroundImage = "url('assets/images/kendrick.png')";
  kendrick.style.backgroundSize = "cover";


  var height = 0;
  var kendrickGrower = setInterval(function(){
    height += 25;
    kendrick.style.width = Math.round(height*0.559) + "px";
    kendrick.style.height = height + "px";
    kendrick.style.left = (pokeball.offsetLeft + kendrick.offsetWidth/2)  + "px"
    kendrick.style.top =  (pokeball.offsetTop - kendrick.offsetHeight/1.25)+ "px";
    if (height >= 487){
      clearInterval(kendrickGrower);
      kendrick.style.left = (pokeball.offsetLeft + kendrick.offsetWidth/2)  + "px"
      kendrick.style.top =  (pokeball.offsetTop - kendrick.offsetHeight/1.25)+ "px";
      pokeball.style.display = "none"; 
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

  pokedexImage.id = "pokedexImage";
  pokedexText.id = "pokedexText";
  pokedex.id = "pokedex";
  pokedex.style.width = (((container.offsetWidth / 1.75) / container.offsetWidth) * 100) + "%";
  pokedex.style.height = (pokedex.offsetWidth * 0.75) + "px";
  pokedex.style.backgroundImage = "url('assets/images/pokedex.png')";
  pokedex.style.backgroundPosition = "-1px 0";
  pokedex.style.position = "absolute";
  pokedex.style.backgroundSize = "cover";
  pokedex.style.backgroundRepeat = "no-repeat"
  //need to animate pokedex coming into screen
  pokedex.style.top = (container.offsetTop + container.offsetHeight - pokedex.offsetHeight - (container.offsetHeight * 0.10)) + "px";
  pokedex.style.left = "2%";
  animatePokedex();
}

function animatePokedex() {
  var pokedex = document.getElementById("pokedex");
  var positionRatio = parseFloat((pokedex.offsetWidth / 800).toFixed(2));
  var backgroundPosition = 6 * positionRatio;
  // var changeBackground = setInterval(function(){
    // if (backgroundPosition >= -4000){
      pokedex.style.backgroundPosition = backgroundPosition + "px 0";
      // backgroundPosition -= 730;
      setTimeout(function(){
        backgroundPosition -= parseFloat((795 * positionRatio).toFixed(2));
        pokedex.style.backgroundPosition = backgroundPosition + "px 0";
        setTimeout(function(){
          backgroundPosition -= parseFloat((803 * positionRatio).toFixed(2));
          pokedex.style.backgroundPosition = backgroundPosition + "px 0";
          setTimeout(function(){
            backgroundPosition -= parseFloat((799 * positionRatio).toFixed(2));
            pokedex.style.backgroundPosition = backgroundPosition + "px 0";
            setTimeout(function(){
              backgroundPosition -= parseFloat((795 * positionRatio).toFixed(2));
              pokedex.style.backgroundPosition = backgroundPosition + "px 0";
              setTimeout(function(){
                backgroundPosition -= parseFloat((804 * positionRatio).toFixed(2));
                pokedex.style.backgroundPosition = backgroundPosition + "px 0";
                printPokedex();
              },75);
            },75);
          },75);
        },75);
      },75);



  
}
    // }
    // else {
    //   clearInterval(changeBackground);
    // }
  // },100);

function printPokedex() {
  var pokedex = document.getElementById("pokedex");
  var pokedexImage = document.getElementById("pokedexImage");
  var pokedexText = document.getElementById("pokedexText");

  pokedexImage.style.height = (pokedex.offsetHeight / 2.25) + "px";
  pokedexImage.style.width = (pokedex.offsetWidth / 3) + "px";
  pokedexImage.style.left = "11%";
  pokedexImage.style.top = "27.5%";
  pokedexImage.style.backgroundPosition = "0 50px";
  pokedexImage.innerHTML = "<h1>Kendrick Parks</h1>"

  pokedexText.style.height = (1.725 * pokedex.offsetHeight / 3) + "px";
  pokedexText.style.width = (1.055 * pokedex.offsetWidth / 3) + "px";
  pokedexText.style.left = "60.5%";
  pokedexText.style.top = "25.75%";

  animateAboutMeText();
  loadResize();
}



function animateAboutMeText() {
  var pokedexText = document.getElementById("pokedexText");
  pokedexText.innerHTML = "<h1>ABOUT ME</h1><p>My name is Kendrick Parks. I am a full stack web developer.  I also am a serial entrepreneur who loves start ups and creating start ups. &nbsp</p><p>I am very flexible and can create any style you are looking for.  I love working in teams and have strong leadership.  I loved to be challenged and I am always looking to learn and grow.  &nbsp</p><p>If you are looking for someone that will work long hours and have a blast doing so I am your guy.  Please enjoy my portfolio page and it's many game themes.  It gives you a glympse into my personality.</p>"
}


function loadResize() {
  //resize about me section here
  window.onresize = function() {
    var pokedex = document.getElementById("pokedex");
    var kendrick = document.getElementById("kendrick");
    var container = document.getElementById("aboutme");
    var pokedexText = document.getElementById("pokedexText");
    var height;
    var positionRatio = parseFloat((pokedex.offsetWidth / 800).toFixed(2));

    pokedex.style.width = (((container.offsetWidth / 1.75) / container.offsetWidth) * 100) + "%";
    pokedex.style.height = (pokedex.offsetWidth * 0.75) + "px";
    pokedex.style.backgroundPosition = (- (3655 / 4000) * pokedex.offsetWidth * 5.45) + "px 0";
    pokedex.style.top = (container.offsetTop + container.offsetHeight - pokedex.offsetHeight - (container.offsetHeight * 0.10)) + "px";

    kendrick.style.height = ((487 / container.offsetHeight) * 100) + "%";
    kendrick.style.width = Math.round(kendrick.offsetHeight*0.559) + "px";


    pokedexText.style.height = (1.82 * pokedex.offsetHeight / 3) + "px";
    pokedexText.style.width = (1.1 * pokedex.offsetWidth / 3) + "px";
    //need to make it all more responsive

  }
  document.getElementsByClassName("whatido-lists")[0].children[0].children[0].addEventListener("click", function() {hideSubcategory(); showSubcategory(0);});
 document.getElementsByClassName("whatido-lists")[0].children[0].children[1].addEventListener("click", function() {hideSubcategory(); showSubcategory(1);});
 document.getElementsByClassName("whatido-lists")[0].children[0].children[2].addEventListener("click", function() {hideSubcategory(); showSubcategory(2);});
 document.getElementsByClassName("whatido-lists")[0].children[0].children[3].addEventListener("click", function() {hideSubcategory(); showSubcategory(3);});
  
  

  function showSubcategory (index) {
    document.getElementById("whatido-subCategory").children[0].children[index].style.display = "block";
    $(document.getElementsByClassName("whatido-lists")[0].children[0].children[index]).addClass("red-list");
    $(document.getElementsByClassName("whatido-lists")[0].children[0].children[index]).removeClass("black-list");
  }

  function hideSubcategory () {
    var sub = document.getElementById("whatido-subCategory");
    for (var i=0; i<sub.children[0].childElementCount; i++) {
      sub.children[0].children[i].style.display = "none";
      $(sub.children[0].children[i]).removeClass("red-list");
      $(document.getElementsByClassName("whatido-lists")[0].children[0].children[i]).removeClass("red-list")
      $(document.getElementsByClassName("whatido-lists")[0].children[0].children[i]).addClass("black-list")
      
    }
  }
}