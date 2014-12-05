$(document).ready(function(){

 
  
  var title = document.getElementById("myworksTitle");
  var projects = document.getElementsByClassName("projectTile");
  var portals = document.getElementsByClassName("portal");
  var covers = document.getElementsByClassName("coverTile");

  projects[0].style.top = title.offsetTop + "px";
  projects[1].style.top = (title.offsetTop + title.offsetHeight + 50) + "px";
  projects[2].style.top = (title.offsetTop + projects[2].offsetHeight + 20) + "px";
  projects[3].style.top = (title.offsetTop + projects[2].offsetHeight + 20) + "px";
  projects[4].style.top = (title.offsetTop + projects[2].offsetHeight + 20) + "px";
  projects[5].style.top = (title.offsetTop + title.offsetHeight + 50) + "px";
  projects[6].style.top = title.offsetTop + "px";
  for (var i=0; i<projects.length; i++) {
    portals[i].style.top = (projects[i].offsetTop - 20) + "px";
    portals[i].style.left = (projects[i].offsetLeft - 30) + "px";
    covers[i].style.top = (projects[i].offsetTop - 20) + "px";
    covers[i].style.left = (projects[i].offsetLeft - 20) + "px";
  }
  
  
  

  for (var i=0; i<portals.length; i++){
    portalEventListeners(i, portals);
  }

  function portalEventListeners(i, portals) {
    var projects = document.getElementsByClassName("projectTile");
    var covers = document.getElementsByClassName("coverTile");
    portals[i].addEventListener("mouseover", function() {
      projects[i].style.visibility = "visible";
      covers[i].style.visibility = "hidden";
    });
    portals[i].addEventListener("mouseout", function() {
      projects[i].style.visibility = "hidden";
      covers[i].style.visibility = "visible";
    });
  }

  

});