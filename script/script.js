const formEl = document.getElementById("item-form");
const titleEl = document.getElementById("title");
const inventoryEl = document.getElementById("inventory");

const clearBtn = document.querySelector("#clear");
const itemTemplate = document.querySelector("#item-template");

const subtitle = document.createElement("p");
subtitle.textContent = "Add items to warehouse";
document.body.insertBefore(subtitle, formEl);

const totalEl = document.createElement("div");
totalEl.id = "total";
totalEl.textContent = "Total items: 0";
inventoryEl.appendChild(totalEl);

