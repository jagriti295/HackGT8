function myFunction() {
  console.log("Here");
  document.getElementById("overlay").style.display = "block";
  document.getElementById("navbarResponsive").style.display = "none";
}

function ordered() {
  console.log("Here!");
    document.getElementById("overlay").style.display = "none";
  document.getElementById("captiononly").innerHTML = "<h2>All done!</h2><p>Yay! You saved quite a lot of time there. Your items will be delivered to you shortly.</p>";
//  document.getElementById("overlay").style.display = "none";
//  document.getElementById("navbarResponsive").style.display = "block";
//  document.getElementById("overlay2").style.display = "block";
  }

// document.getElementsByClassName("main-button").addEventListener("click", function() {
//   // document.getElementById("demo").innerHTML = "Hello World";
//   console.log("Here");
//   alert(1);
// });