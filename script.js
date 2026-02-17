// --- Date Scripts ---
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

// --- Navigation Menu Toggle ---
const navbutton = document.querySelector(".menu-toggle");
const navmenu = document.querySelector("nav");

if (navbutton && navmenu) {
  navbutton.addEventListener("click", function () {
    navmenu.classList.toggle("hidden");
    if (navmenu.classList.contains("hidden")) {
      navbutton.setAttribute("aria-expanded", "false");
    } else {
      navbutton.setAttribute("aria-expanded", "true");
    }
  });
}

// --- Contact Form Validation and Submission ---
(function () {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.querySelectorAll(":invalid")[0].focus();
        } else {
          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          })
            .then(async (response) => {
              let jsonResponse = await response.json();
              if (response.status == 200) {
                result.innerHTML = jsonResponse.message;
                result.classList.remove("error-text");
                result.classList.add("success-text");
              } else {
                console.log(response);
                result.innerHTML = jsonResponse.message;
                result.classList.remove("success-text");
                result.classList.add("error-text");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
              result.classList.add("error-text");
              document.querySelector(".empty-feedback").style.display = "block";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
