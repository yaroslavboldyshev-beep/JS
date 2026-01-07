"use strict";

const steen1 = document.getElementById("steen1");
const steen2 = document.getElementById("steen2");
const werpKnop = document.getElementById("werp");
const scoreSpan = document.getElementById("score");
const totaleScoreSpan = document.getElementById("totaleScore");

let score = 0;
let totaleScore = 0;

const randomSteen = () => Math.floor(Math.random() * 6) + 1;

const handvatKlik = () => {
  const getal1 = randomSteen();
  const getal2 = randomSteen();

  score = getal1 + getal2;

  if (getal1 === getal2) score *= 2;

  totaleScore += score;

  scoreSpan.textContent = score;
  totaleScoreSpan.textContent = totaleScore;

  steen1.src = `afbeeldingen/steen${getal1}.svg`;
  steen2.src = `afbeeldingen/steen${getal2}.svg`;

  steen1.alt = `Dobbelsteen met waarde ${getal1}`;
  steen2.alt = `Dobbelsteen met waarde ${getal2}`;
};

werpKnop.addEventListener("click", handvatKlik);
