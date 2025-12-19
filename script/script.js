//cache with getElementById
const formEl = document.getElementById("item-form");
const titleEl = document.getElementById("title");
const inventoryEl = document.getElementById("inventory");
const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("quantity");
const locationInput = document.getElementById("location");

//cache with querySelector
const clearBtn = document.querySelector("#clear");
const itemTemplate = document.querySelector("#item-template");
const nameError = document.querySelector("#name-error");
const locationError = document.querySelector("#location-error");

//apply createElement
const subtitle = document.createElement("p");
subtitle.textContent = "Add items to warehouse";
document.body.insertBefore(subtitle, formEl);

//apply appendChild
const totalEl = document.createElement("div");
totalEl.id = "total";
totalEl.textContent = "Total items: 0";
totalEl.classList.add("total-center");
inventoryEl.appendChild(totalEl);

//BOM properties/method
console.log("Page URL:", window.location.href); //BOM property

function useConfirm() {
  return window.confirm("Are you sure?"); //BOM method
}

//documentFragment for templating
let items = []; //array to store warehouse items
let nextId = 1; //unique id given to each item

function addItem(name, quantity, location) {
  const fragment = new DocumentFragment(); //create a documentfragment
  const templateContent = itemTemplate.content;
  const clone = templateContent.firstElementChild.cloneNode(true); // Clone the div element

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
  highlightLowStock(); // Apply low-stock highlighting
  updateTitleAttr(); // Update title attribute
}

function updateDisplay() {
  titleEl.textContent = `Warehouse Items: ${items.length}`;
  document.getElementById("total").textContent = `Total items: ${items.length}`;
}

//highlight if stock is low for items
function highlightLowStock() {
  const itemDivs = document.querySelectorAll(".item");
  for (let i = 0; i < itemDivs.length; i++) {
    const div = itemDivs[i];
    if (items[i] && items[i].quantity < 5) {
      div.classList.add("low-stock");
      div.style.fontWeight = "Bold";
    } else {
      div.classList.remove("low-stock");
      div.style.fontWeight = "normal";
    }
  }
}

function updateTitleAttr() {
  titleEl.setAttribute("title", `${items.length} items in warehouse`);
}

//Event-based validation
function validateLocation() {
  const isValid =
    !locationInput.value ||
    /^[A-Z][0-9]{2}-[0-9]{2}$/.test(locationInput.value);
  locationError.style.display = isValid ? "none" : "block";
  return isValid;
}

//parent-child-sibling navigation
function editItem(itemDiv) {
  const nameSpan = itemDiv.querySelector(".item-name");
  const qtySpan = itemDiv.querySelector(".item-qty");
  const locSpan = itemDiv.querySelector(".item-loc");

  //highlight the border of the following item in the list after clicking the the edit button
  const nextItem = itemDiv.nextElementSibling; //gets the next item from the list
  if (nextItem) {
    nextItem.style.border = "5px solid blue"; //thicken border
    setTimeout(() => {
      nextItem.style.border = ""; //removes the border after 1 sec
    }, 1000);
  }

  //fill form with current item
  nameInput.value = nameSpan.textContent;
  quantityInput.value = qtySpan.textContent;
  locationInput.value =
    locSpan.textContent === "N/A" ? "" : locSpan.textContent;

  //remove from display
  itemDiv.remove();

  //remove from array
  const itemName = nameSpan.textContent;
  items = items.filter((item) => item.name !== itemName);

  updateDisplay();
  highlightLowStock();
  updateTitleAttr();
}

//iterate over collection
function deleteItem(itemDiv) {
  const name = itemDiv.querySelector(".item-name").textContent;

  // Create new array without the deleted item
  items = items.filter((item) => item.name !== name);

  // Delete from DOM
  itemDiv.remove();

  updateDisplay();
  highlightLowStock();
  updateTitleAttr();
}

//form handler
function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;
  const quantity = quantityInput.value;
  const location = locationInput.value;

  if (name.length < 2) {
    nameError.style.display = "block";
    return;
  } else {
    nameError.style.display = "none";
  }

  if (!validateLocation()) return;

  addItem(name, quantity, location);

  // Clear form
  clearForm();
}

function clearForm() {
  nameInput.value = "";
  quantityInput.value = "";
  locationInput.value = "";
  nameError.style.display = "none";
  locationError.style.display = "none";
}

//added event listeners
formEl.addEventListener("submit", handleSubmit);
clearBtn.addEventListener("click", clearForm);

//event based validation
locationInput.addEventListener("input", validateLocation);
