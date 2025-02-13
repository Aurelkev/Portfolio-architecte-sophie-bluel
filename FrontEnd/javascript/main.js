// Script for index.html


async function getWorks(filter) {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const filtered = json.filter((data) => data.categoryId === filter);
    console.log("Images récupérées depuis l'API:", json)
    document.querySelector(".gallery").innerHTML = "";
    document.querySelector(".editGallery").innerHTML = "";

    if (filter === undefined) {
      for (let i = 0; i < json.length; i++) {
        createFigure(json[i]);
      }
    } else {
      for (let i = 0; i < filtered.length; i++) {
        createFigure(filtered[i]);
      }
    }
    cloneImages();
  } catch (error) {
    console.error(error.message);
  }
}

function createFigure(data) {
  const figure = document.createElement("figure");
  figure.setAttribute("data-id", data.id);
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>`;

  document.querySelector(".gallery").append(figure);
  console.log("Image ajoutée:", data);
}

function cloneImages() {
  const gallery = document.querySelector(".gallery");
  const editGallery = document.querySelector(".editGallery");

  editGallery.innerHTML = "";

  gallery.querySelectorAll("figure").forEach((figure) => {
    const clonedFigure = document.createElement("figure");
    clonedFigure.classList.add("cloned-figure");

    const clonedImg = document.createElement("img");
    const originalImg = figure.querySelector("img");
    clonedImg.src = originalImg.src;
    clonedImg.alt = originalImg.alt;

    const imageId = figure.getAttribute("data-id");
    clonedFigure.setAttribute("data-id", imageId);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

    deleteIcon.addEventListener("click", function () {
      deleteImage(clonedFigure, imageId);
    });

    clonedFigure.appendChild(clonedImg);
    clonedFigure.appendChild(deleteIcon);
    editGallery.appendChild(clonedFigure);
  });
}

getWorks();

async function getCategories() {
  const categoriesApi = "http://localhost:5678/api/categories";
  const response = await fetch(categoriesApi);
  const json = await response.json();
  for (let i = 0; i < json.length; i++) {
    createFilter(json[i]);
  }

}

getCategories();

function createFilter(data) {
  const div = document.createElement("div");
  div.className = data.id;
  div.addEventListener("click", () => getWorks(data.id));
  div.innerHTML = data.name;
  document.querySelector(".filter-container").append(div);
}

document.querySelector(".all").addEventListener("click", () => getWorks());


document.addEventListener("DOMContentLoaded", function () {
  const displayEdit = document.querySelector(".edit-mode");
  const loginButton = document.querySelector(".login");

  if (sessionStorage.getItem("authToken")) {
    displayEdit.classList.remove("hidden");
    document.querySelector(".login").innerHTML = '<a href="#">logout</a>';
    document.querySelector(".modify").innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modifier';
  }

  loginButton.addEventListener("click", function () {
    if (sessionStorage.getItem("authToken")) {
      sessionStorage.removeItem("authToken");
      displayEdit.classList.add("hidden");
      document.querySelector(".login").innerHTML = '<a href="login-page.html">login</a>';
    }
  });
});


async function deleteImage(clonedFigure, imageId) {
  if (!imageId) {
    console.log("Impossible de supprimer l'image : ID introuvable.");
    return;
  }
  const authToken = sessionStorage.getItem("authToken");
  const deleteApi = `http://localhost:5678/api/works/${imageId}`;

  try {
    const response = await fetch(deleteApi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression : ${response.status}`);
    }
    /* delete from modal */
    clonedFigure.remove();
    console.log(`Image ${imageId} supprimée avec succès.`);

    /* delete from principal gallery */
    const originalFigure = document.querySelector(`.gallery figure[data-id='${imageId}']`);
    if (originalFigure) {
      originalFigure.remove();
      console.log(`Image ${imageId} supprimée de la galerie principale.`);
    } else {
      console.log(`Aucune image originale trouvée avec l'ID ${imageId}`);
    }
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modalTitle = document.getElementById("modal-title");
  const addBtn = document.getElementById("add-photo-btn");

  addBtn.addEventListener("click", function () {
    modalTitle.textContent = "Ajout photo";
  });
});
