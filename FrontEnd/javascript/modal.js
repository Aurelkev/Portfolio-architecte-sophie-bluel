document.addEventListener("DOMContentLoaded", function () {
    const modifyMode = document.querySelector(".modify");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const closeButtons = document.querySelectorAll(".close-btn");
    const addPicture = document.getElementById("addPicture");
    const leftArrows = document.querySelectorAll(".left-arrow");
    const editGallery = document.getElementById("editGallery");

    modifyMode.addEventListener("click", function () {
        modal.style.display = "block";
        overlay.style.display = "block";
        addPicture.style.display = "none";
        editGallery.style.display = "block";
    });


    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            modal.style.display = "none";
            overlay.style.display = "none";
            addPicture.style.display = "none";
        });
    });

    leftArrows.forEach(leftArrow => {
        leftArrow.addEventListener("click", function () {
            console.log(leftArrow);
            addPicture.style.display = "none";
            editGallery.style.display = "block";
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            modal.style.display = "none";
            overlay.style.display = "none";
            addPicture.style.display = "none";
        }
    });

    overlay.addEventListener("click", function () {
        modal.style.display = "none";
        overlay.style.display = "none";
        addPicture.style.display = "none";
    });
});
