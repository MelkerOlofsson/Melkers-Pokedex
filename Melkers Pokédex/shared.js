// -------------Hamburgermeny-------------

// Binder ikonerna och "menyn" till variabler.
const hamburgerIcon = document.querySelector("#hamburgericon")
const crossIcon = document.querySelector("#crossicon")
const navbarList = document.querySelector(".navbar-list")

// Eventlistener som öppnar menyn.
hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.style = "display: none;"
  crossIcon.style = "display: inline;"
  navbarList.style = "display: block;"
})

// Eventlistener som stänger menyn.
crossIcon.addEventListener("click", () => {
  crossIcon.style = "display: none;"
  hamburgerIcon.style = "display: inline;"
  navbarList.style = "display: none;"
})

// ---------slut på Hamburgermeny---------
