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

//BOM properties/method
console.log("Page URL:", window.location.href); //BOM property

function useConfirm() {
  return window.confirm("Are you sure?"); //BOM method
}

//documentFragment for templating
let items = []; //array to store warehouse items
let nextId = 1; //unique id given to each item

function addItem(name, quantity, location) {
  const fragment = new DocumentFragment(); //create an documentfragment
  const clone = itemTemplate.textContent.cloneNode(true); //gets the content inside <template> and clone them

  //fill the cloned template with data
  clone.querySelector(".item-name").textContent = name;
  clone.querySelector(".item-qty").textContent = quantity;
  clone.querySelector(".item-loc").textContent = location || "N/A";

  //add event listener to delete button
  const deleteBtn = clone.querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    if (useConfirm()) {
      // show confirmation dialog
      deleteItem(this.parentElement); // delete the item's parent div
    }
  });

  const editBtn = clone.querySelector(".edit");
  //add event listener to edit button
  editBtn.addEventListener("click", function () {
    editItem(this.parentElement); //edit the item's parent div
  });

  fragment.appendChild(clone); //add clone to the documentFragment
  inventoryEl.appendChild(fragment); //add the fragment to the page DOM

  items.push({ id: nextId++, name, quantity, location }); //add item data to the array
  updateDisplay(); //refresh total counts
}
