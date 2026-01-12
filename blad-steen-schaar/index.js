"use strict";
const knoppen = document.querySelectorAll(".keuze");
const opnieuwBtn = document.getElementById("opnieuw");

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

  const afbeelding = document.getElementById("afbeelding");
  afbeelding.src = `afbeeldingen/${computerKeuze}.svg`;
  afbeelding.alt = computerKeuze;

  const winnar = winnarWinden();

  const winnarEl = document.getElementById("winnar");
  winnarEl.textContent = winnar;

  const resultaatWikkelEl = document.getElementById("resultaatWikkel");
  resultaatWikkelEl.classList.remove("verborgen");
};

const verwerkKlik = (e) => {
  if (gebruikerKeuze) return;

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
