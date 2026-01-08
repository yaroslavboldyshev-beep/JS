"use strict";
const knoppen = document.querySelectorAll(".keuze");
const winnarEl = document.getElementById("winnar");
const opnieuwBtn = document.getElementById("opnieuw");
const resultaatWikkelEl = document.getElementById("resultaatWikkel");
const computerKeuzeRefEl = document.getElementById("computerKeuze");

let gebruikerKeuze;
let computerKeuze;

const knoppenVerbergen = () =>
  knoppen.forEach((el) => {
    if (el.id !== gebruikerKeuze) el.classList.add("verborgen");
  });

const winnarWinden = () => {
  if (gebruikerKeuze == computerKeuze) return "Gelijkspel";

  if (
    (gebruikerKeuze === "steen" && computerKeuze === "schaar") ||
    (gebruikerKeuze === "schaar" && computerKeuze === "blad") ||
    (gebruikerKeuze === "blad" && computerKeuze === "steen")
  ) {
    return "Gebruiker";
  }

  return "Computer";
};

const computerKeuzeMaken = () => {
  const index = Math.floor(Math.random() * 3);
  computerKeuze = knoppen[index].id;

  const afbeelding = document.createElement("img");
  afbeelding.src = `afbeeldingen/${computerKeuze}.svg`;
  afbeelding.alt = computerKeuze;

  resultaatWikkelEl.classList.remove("verborgen");
  computerKeuzeRefEl.insertAdjacentElement("afterend", afbeelding);

  const winnar = winnarWinden();

  winnarEl.textContent = winnar;
};

const verwerkKlik = (e) => {
  gebruikerKeuze = e.currentTarget.id;
  knoppenVerbergen();
  computerKeuzeMaken();
};

const opnieuwStarten = () => {
  location.reload();
};

knoppen.forEach((el) => {
  el.addEventListener("click", verwerkKlik);
});

opnieuwBtn.addEventListener("click", opnieuwStarten);
