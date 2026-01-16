(function () {
  var yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

navbutton = document.querySelector(".menu-toggle");
navmenu = document.querySelector("nav");

navbutton.addEventListener("click", function () {
  navmenu.classList.toggle("hidden");
});
