document.addEventListener("DOMContentLoaded", function() {
  const editModeBtn = document.querySelector(".edit-mode");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const closeBtn = document.querySelector(".close-btn");

  editModeBtn.addEventListener("click", function() {
      modal.style.display = "block";
      overlay.style.display = "block";
  });

  closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
      overlay.style.display = "none";
  });

});
