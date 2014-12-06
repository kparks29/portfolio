$(document).ready(function(){
  console.log("loaded")
  var contact = document.getElementById("contact");
  var projects = document.getElementById("myworks");
  var video = document.createElement("video");
  var source = document.createElement("source");
  video.id = "contactVideo";
  source.type = "video/mp4"
  source.src = "assets/contactvideo.mp4";
  video.appendChild(source);
  contact.appendChild(video);

  document.addEventListener("scroll", function(e){
  
    if (window.pageYOffset >= (contact.offsetTop - (contact.offsetHeight / 3))) {
      video.play();
    }

  });

  $("#reload").click(function(){
    $('html, body').animate({
        scrollTop: $("#home").offset().top,
      }, 500);
  })

});