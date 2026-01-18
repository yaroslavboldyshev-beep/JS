"use strict";
// --- constants ---
const ships = await fetch("boten.json")
  .then((res) => res.json())
  .catch((e) => console.error(e));

let errorTimeout;
const form = document.getElementById("form");
const newBtn = document.getElementById("nieuw");
const errorEl = document.getElementById("error");
const placeBtn = document.getElementById("plaats");
const shipSelectEl = document.getElementById("boot");

let shipsMatrix = Array(10)
  .fill(null)
  .map(() => Array(10).fill(null));

// --- functions ---
function generateShipOptions() {
  const fragment = document.createDocumentFragment();

  ships.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.naam;
    option.textContent = `${el.naam} (lengte: ${el.lengte})`;

    fragment.appendChild(option);
  });

  shipSelectEl.appendChild(fragment);
}

function letterToNumber(letter) {
  return letter.toLowerCase().charCodeAt(0) - 96;
}

function showError(text) {
  errorEl.textContent = text;
  errorEl.classList.remove("hidden");

  clearTimeout(errorTimeout);
  errorTimeout = setTimeout(hideError, 4000);
}

function hideError() {
  errorEl.classList.add("hidden");
}

function updateUI() {
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const value = shipsMatrix[row][col];
      if (!value) continue;

      const cell = document.getElementById(`${row}${col}`);

      if (!cell.querySelector("img")) {
        cell.innerHTML = `<img src="icons/${value}" alt="${value}" />`;
      }
    }
  }
}

function checkForErrors(dir, rowI, colI, length) {
  if (
    (dir === "horizontal" && colI + length > 10) ||
    (dir === "vertical" && rowI + length > 10)
  ) {
    showError(`Schip past niet ${dir}`);
    return true;
  }

  for (let i = 0; i < length; i++) {
    const r = dir === "horizontal" ? rowI : rowI + i;
    const c = dir === "horizontal" ? colI + i : colI;

    if (shipsMatrix[r][c]) {
      showError("Er zijn al plaatsen bezet");
      return true;
    }
  }
}

function updateMatrix(dir, rowI, colI, length, value) {
  for (let i = 0; i < length; i++) {
    const r = dir === "horizontal" ? rowI : rowI + i;
    const c = dir === "horizontal" ? colI + i : colI;

    shipsMatrix[r][c] = value;
  }
}

function handleSubmit(e) {
  e.preventDefault();

  // constants
  const ship = shipSelectEl.selectedOptions[0];
  const row = Number(document.getElementById("rij").selectedOptions[0].value);
  const columnLetter =
    document.getElementById("kolom").selectedOptions[0].value;
  const column = letterToNumber(columnLetter);
  const direction =
    document.getElementById("richting").selectedOptions[0].value;
  const rowIndex = row - 1;
  const colIndex = column - 1;
  const shipData = ships.find((el) => el.naam === ship.value);
  const { lengte, afbeelding } = shipData;

  // actions
  if (checkForErrors(direction, rowIndex, colIndex, lengte)) {
    return;
  }

  updateMatrix(direction, rowIndex, colIndex, lengte, afbeelding);
  updateUI();
  ship.remove();
  form.reset();
  hideError();
}

form.addEventListener("submit", handleSubmit);
generateShipOptions();
