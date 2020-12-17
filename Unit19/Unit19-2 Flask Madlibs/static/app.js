"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  const madlibForm = document.querySelector("#madlib-form");

  madlibForm.addEventListener("submit", function (e) {
    for (let i = 0; i < madlibForm.length - 1; i++) {
      if (madlibForm[i].value === "") {
        e.preventDefault();
        alert("No blank entries allowed");
        return;
      }
    }
  });
});
