"use strict";

const tableBody = document.getElementById("table-body");
const buttons = document.querySelectorAll("button");
const data = await fetch("./geslachten.json").then((res) => res.json());

const getIcon = (gender) => {
  switch (gender) {
    case "vrouw": {
      return "♀️";
    }
    case "man": {
      return "♂️";
    }
    default: {
      return "X";
    }
  }
};

const renderTable = (rows) => {
  tableBody.innerHTML = "";

  rows.forEach(({ voornaam, familienaam, geslacht, foto }) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${voornaam}</td>
    <td>${familienaam}</td>
    <td>${getIcon(geslacht)}</td>
    <td>
      <img
        src="images/${foto}"
        alt="Foto van ${voornaam} ${familienaam}"
        width="60"
        class="profile-pic"
      />
    </td>
    `;

    tableBody.appendChild(tr);
  });
};

const handleFilter = (e) => {
  if (e.target.classList.contains("active")) return;

  buttons.forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");

  if (!e.target.id) {
    renderTable(data);
  } else {
    renderTable(data.filter((el) => el.geslacht === e.target.id));
  }
};

buttons.forEach((el) => el.addEventListener("click", handleFilter));

renderTable(data);
