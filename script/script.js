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

//notify if stock is low
function highlightLowStock() {
  const itemDivs = document.querySelectorAll(".item");
  itemDivs.forEach((div, i) => {
    if (items[i] && items[i].quantity < 5) {
      div.classList.add("low-stock");
    } else {
      div.classList.remove("low-stock");
    }
  });
}

function updateTitleAttr() {
  titleEl.setAttribute("title", `${items.length} items in warehouse`);
}

//Event-based validation
function validateLocation() {
  const input = document.getElementById("location");
  const error = document.getElementById("location-error");
  const isValid = !input.value || /^[A-Z][0-9]{2}-[0-9]{2}$/.test(input.value);

  error.style.display = isValid ? "none" : "block";
  return isValid;
}

//parent-child-sibling navigation
function editItem(itemDiv) {
  const nameSpan = itemDiv.querySelector(".item-name");
  const qtySpan = itemDiv.querySelector(".item-qty");
  const locSpan = itemDiv.querySelector(".item-loc");

  //navigate using sibling relationship
  const nameCell = nameSpan.parentNode;
  const nextCell = nameCell.nextElementSibling;
  console.log("Next Element after name:", nextCell?.textContent);

  //fill form with item data
  document.getElementById("name").value = nameSpan.textContent;
  document.getElementById("quantity").value = qtySpan.textContent;
  document.getElementById("location").value = locSpan.textContent;

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

  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.getElementById("location").value;

  if (name.length < 2) {
    document.getElementById("name-error").style.display = "block";
    return;
  }

  if (!validateLocation()) return;

  addItem(name, quantity, location);
  highlightLowStock();
  updateTitleAttr();

  //clear form
  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("location").value = "";
  document.getElementById("name-error").style.display = "none";
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("location").value = "";
  document.getElementById("name-error").style.display = "none";
  document.getElementById("location-error").style.display = "none";
}

//added event listeners
formEl.addEventListener("submit", handleSubmit);
clearBtn.addEventListener("click", clearForm);

//event based validation
document.getElementById("location").addEventListener("input", validateLocation);
