"use strict";

const form = document.getElementById("form");

const names = {};

const handleSubmit = (e) => {
  const input = document.getElementById("name");

  e.preventDefault();

  const name = input.value.trim();

  if (names[name]) {
    names[name]++;
  } else {
    names[name] = 1;
  }

  renderList();
  input.value = "";
  input.focus();
};

const renderList = () => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  for (const name in names) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${names[name]}`;
    list.appendChild(li);
  }
};

form.addEventListener("submit", handleSubmit);
