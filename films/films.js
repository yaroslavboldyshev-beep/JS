"use strict";
const data = await fetch("./films.json")
  .then((res) => res.json())
  .catch((e) => {
    alert("Fout bij het laden van gegevens.");
    console.error(e);
  });

const buttonPrev = document.getElementById("vorige");
const buttonNext = document.getElementById("volgende");

let page = 1;

function renderList(listEl, items) {
  listEl.textContent = "";
  const fragment = document.createDocumentFragment();

  items?.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  listEl.appendChild(fragment);
}

function render() {
  if (!data.length) return;

  const castEl = document.getElementById("cast");
  const titleEl = document.getElementById("titel");
  const photoEl = document.getElementById("foto");
  const genresEl = document.getElementById("genres");
  const ratingEl = document.getElementById("rating");
  const directorsEl = document.getElementById("regisseurs");
  const descriptionEl = document.getElementById("beschrijving");

  const { titel, beschrijving, cast, foto, genres, rating, regisseurs } =
    data[page - 1];

  titleEl.textContent = titel;
  descriptionEl.textContent = beschrijving;

  ratingEl.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("img");
    star.src = "ster.png";
    star.alt = "ster";
    fragment.appendChild(star);
  }
  ratingEl.appendChild(fragment);

  photoEl.src = `images/${foto}`;
  photoEl.alt = `Affiche van ${titel}`;

  renderList(castEl, cast);
  renderList(genresEl, genres);
  renderList(directorsEl, regisseurs);
}

function updateButtons() {
  buttonPrev.disabled = page <= 1;
  buttonNext.disabled = page >= data.length;
}

function showNextPage() {
  page++;
  updateButtons();
  render();
}

function showPrevPage() {
  page--;
  updateButtons();
  render();
}

buttonNext.addEventListener("click", showNextPage);
buttonPrev.addEventListener("click", showPrevPage);
render();
