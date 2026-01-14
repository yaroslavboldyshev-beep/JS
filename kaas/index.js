"use strict";

const products = await fetch("kazen.json")
  .then((res) => res.json())
  .catch((e) => console.error(e));

const form = document.getElementById("form");
const selectEl = document.getElementById("kaas");
const cart = [];

function generateProductOptions() {
  const fragment = document.createDocumentFragment();

  products.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.id;
    option.textContent = el.naam;
    fragment.appendChild(option);
  });

  selectEl.appendChild(fragment);
}

function showError(id, errText) {
  const errEl = document.getElementById(id);
  errEl.textContent = errText;
  errEl.classList.remove("hidden");
}

function hideError(id) {
  const errEl = document.getElementById(id);
  errEl.textContent = "";
  errEl.classList.add("hidden");
}

function validateForm(productId, amount) {
  if (!productId) {
    showError("product-err", "Verplicht");
  } else {
    hideError("product-err");
  }

  if (amount < 1) {
    showError("amount-err", "Minstens 1");
  } else if (amount > 100) {
    showError("amount-err", "Maximaal 100");
  } else {
    hideError("amount-err");
  }

  return productId && amount >= 1 && amount <= 100;
}

function updateTableVisibility() {
  const cartTable = document.getElementById("mandjeTable");
  cartTable.hidden = !cart.length;
}

function updateTotal() {
  const totalEl = document.getElementById("totaal");
  const total = cart.reduce((acc, el) => acc + el.price * el.amount, 0);
  totalEl.textContent = total.toFixed(2);
}

function handleDelete(productId) {
  return function handler() {
    const index = cart.findIndex((el) => el.id == productId);
    cart.splice(index, 1);

    const row = document.getElementById(productId);
    row.remove();

    updateTotal();
    updateTableVisibility();
  };
}

function changeAmount(productId, amount) {
  return function handler() {
    const cartItem = cart.find((el) => el.id == productId);
    cartItem.amount += amount;
    const newTotal = cartItem.amount * cartItem.price;

    if (cartItem.amount < 1) {
      handleDelete(productId)();
      return;
    }

    const row = document.getElementById(productId);
    const amountEl = row.querySelector(".amount");
    const totalEl = row.querySelector(".total");

    amountEl.textContent = cartItem.amount;
    totalEl.textContent = newTotal.toFixed(2);

    updateTotal();
  };
}

function addToCart(productId, amount) {
  const cartBody = document.getElementById("mandjeBody");
  const { naam: name, prijs: price } = products.find(
    (el) => el.id == productId
  );

  const cartItem = cart.find((el) => el.id == productId);

  if (cartItem) {
    // product is already in the cart
    const newAmount = cartItem.amount + amount;
    const newTotal = newAmount * price;

    cartItem.amount = newAmount;

    const row = document.getElementById(productId);
    const amountEl = row.querySelector(".amount");
    const totalEl = row.querySelector(".total");

    amountEl.textContent = newAmount;
    totalEl.textContent = newTotal.toFixed(2);
  } else {
    // product is not yet in the cart
    cart.push({ id: productId, name, amount, price });

    const total = amount * price;
    const nameEl = document.createElement("td");
    const amountEl = document.createElement("td");
    const priceEl = document.createElement("td");
    const totalEl = document.createElement("td");
    const deleteEl = document.createElement("td");
    const deleteBtn = document.createElement("button");
    const increaseAmountBtn = document.createElement("button");
    const decreaseAmountBtn = document.createElement("button");

    nameEl.textContent = name;
    amountEl.textContent = amount;
    amountEl.classList.add("amount");
    priceEl.textContent = price;
    totalEl.textContent = total.toFixed(2);
    totalEl.classList.add("total");
    deleteBtn.innerHTML = '<img src="vuilbak.png" alt="vuilbak" />';
    deleteBtn.addEventListener("click", handleDelete(productId));
    deleteBtn.ariaLabel = `${name} verwijderen`;
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-btn");
    deleteEl.classList.add("btn-wrapper");

    increaseAmountBtn.textContent = "+";
    increaseAmountBtn.type = "button";
    increaseAmountBtn.classList.add("change-amount-btn");
    increaseAmountBtn.addEventListener("click", changeAmount(productId, 1));
    increaseAmountBtn.ariaLabel = `aantal ${name} verhogen`;

    decreaseAmountBtn.textContent = "-";
    decreaseAmountBtn.type = "button";
    decreaseAmountBtn.classList.add("change-amount-btn");
    decreaseAmountBtn.addEventListener("click", changeAmount(productId, -1));
    decreaseAmountBtn.ariaLabel = `aantal ${name} verminderen`;

    deleteEl.append(deleteBtn, increaseAmountBtn, decreaseAmountBtn);

    const tableRow = document.createElement("tr");
    tableRow.id = productId;

    tableRow.append(nameEl, amountEl, priceEl, totalEl, deleteEl);

    cartBody.appendChild(tableRow);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const amount = Number(document.getElementById("aantal").value);
  const productId = selectEl.value;

  const isValid = validateForm(productId, amount);

  if (!isValid) return;

  addToCart(productId, amount);
  updateTableVisibility();
  updateTotal();
  form.reset();
}

form.addEventListener("submit", handleSubmit);
generateProductOptions();
