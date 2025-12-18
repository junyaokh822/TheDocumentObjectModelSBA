const formEl = document.getElementById("item-form");
const titleEl = document.getElementById("title");
const inventoryEl = document.getElementById("inventory");

const clearBtn = document.querySelector("#clear");
const itemTemplate = document.querySelector("#item-template");

const subtitle = document.createElement("p");
subtitle.textContent = "Add items to warehouse";
document.body.insertBefore(subtitle, formEl);

