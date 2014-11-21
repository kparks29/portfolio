$(document).ready(function(){

 
  
  var title = document.getElementById("myworksTitle");
  var project1 = document.getElementById("peek");
  var project2 = document.getElementById("mariotictactoe");
  var portal1 = document.getElementById("portal1");
  var portal2 = document.getElementById("portal2");

  project1.style.top = title.offsetTop + "px";
  project2.style.top = (title.offsetTop + title.offsetHeight + 50) + "px";
  portal1.style.top = (project1.offsetTop - 20) + "px";
  portal2.style.top = (project2.offsetTop - 20) + "px";

  var portals = document.getElementsByClassName("portal");

  for (var i=0; i<portals.length; i++){
    portalEventListeners(i, portals);
  }

  function portalEventListeners(i) {
    var projects = document.getElementsByClassName("projectTile");
    portals[i].addEventListener("mouseover", function() {
      projects[i].style.visibility = "visible";
      console.log(i)
    });
    portals[i].addEventListener("mouseout", function() {
      projects[i].style.visibility = "hidden";
    });
  }

});