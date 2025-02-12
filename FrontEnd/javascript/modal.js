document.addEventListener("DOMContentLoaded", function() {
  const modifyMode = document.querySelector(".modify");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".close-btn");

  modifyMode.addEventListener("click", function() {
      modal.style.display = "block";
      overlay.style.display = "block";
  });

  closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
      overlay.style.display = "none";
  });

});
