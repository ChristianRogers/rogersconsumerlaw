//date scripts

(function () {
  var yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

(function () {
  var yearsElement = document.querySelectorAll(".years-in-operation");
  if (yearsElement) {
    var currentYear = new Date();
    var MonthsSince =
      (currentYear.getFullYear() - 1994) * 12 + (currentYear.getMonth() - 4);
    yearsElement.forEach(function (element) {
      element.textContent = Math.floor(MonthsSince / 12);
    });
  }
})();

// Navigation menu toggle

navbutton = document.querySelector(".menu-toggle");
navmenu = document.querySelector("nav");

navbutton.addEventListener("click", function () {
  navmenu.classList.toggle("hidden");
  // unhide aria
  if (navmenu.classList.contains("hidden")) {
    navbutton.setAttribute("aria-expanded", "false");
  } else {
    navbutton.setAttribute("aria-expanded", "true");
  }
});
