$(document).ready(function(){

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
        scrollTop: $("#home").offset().top
      }, 1000);
    removeClassActive(links);
  });

  /* ======================================================================
  Add mouseover listener to whatido section
  ====================================================================== */
  var services = document.getElementsByClassName("services");
  console.log(services[0].firstElementChild)
  for (var i=0; i<services.length; i++){
    console.log(i);
    services[i].addEventListener("mouseover", function(){
      $(this).removeClass("drop");
      $(this).addClass("lift");
    });
  }

  /* ======================================================================
  Add mouseout listener to whatido section
  ====================================================================== */
  var services = document.getElementsByClassName("services");
  console.log(services[0].firstElementChild)
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
      
      $('html, body').animate({
        scrollTop: $("#" + name).offset().top
      }, 1000);

      //change the active class so the navbar item is selected
      changeActive(links, i);
    });

  /* ======================================================================
  When Scrolling have the nav bar switch what section it is on
  ====================================================================== */
  window.addEventListener("scroll", function(e){
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