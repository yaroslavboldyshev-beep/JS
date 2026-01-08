"use strict";

const list = document.getElementById("list");
const form = document.getElementById("form");
const input = document.getElementById("name");

const names = {};

const handleSubmit = (e) => {
  e.preventDefault();

  const name = input.value.trim();

  if (name === "") return;

  if (names[name]) {
    names[name]++;
  } else {
    names[name] = 1;
  }

  renderList();
  input.value = "";
};

const renderList = () => {
  list.innerHTML = "";

  for (const name in names) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${names[name]}`;
    list.appendChild(li);
  }
};

form.addEventListener("submit", handleSubmit);
