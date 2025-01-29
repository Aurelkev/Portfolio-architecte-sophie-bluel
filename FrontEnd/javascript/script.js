async function getWorks(filter) {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const filtered = json.filter((data) => data.categoryId === filter);

    document.querySelector(".gallery").innerHTML = "";

    if (filter === undefined) {
      for (let i = 0; i < json.length; i++) {
        createFigure(json[i]);
      }
    } else {
      for (let i = 0; i < filtered.length; i++) {
        createFigure(filtered[i]);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}
getWorks();

function createFigure(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
				<figcaption>${data.title}</figcaption>`;

  document.querySelector(".gallery").append(figure);
}

async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      createFilter(json[i]);
    }

  } catch (error) {
    console.error(error.message);
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