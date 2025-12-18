//cache with getElementById
const formEl = document.getElementById("item-form");
const titleEl = document.getElementById("title");
const inventoryEl = document.getElementById("inventory");

//cache with querySelector
const clearBtn = document.querySelector("#clear");
const itemTemplate = document.querySelector("#item-template");

//apply createElement
const subtitle = document.createElement("p");
subtitle.textContent = "Add items to warehouse";
document.body.insertBefore(subtitle, formEl);

//apply appendChild
const totalEl = document.createElement("div");
totalEl.id = "total";
totalEl.textContent = "Total items: 0";
inventoryEl.appendChild(totalEl);

//added event listeners
formEl.addEventListener("submit", handleSubmit);
clearBtn.addEventListener("click", clearForm);

//event based validation
document.getElementById("location").addEventListener("input", validateLocation);
