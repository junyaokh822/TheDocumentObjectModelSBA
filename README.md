# Warehouse Inventory Manager

A simple, interactive web application for managing warehouse inventory items with real-time validation and visual feedback.

## Features

- **Add Items**: Create new inventory items with name, quantity, and location
- **Edit Items**: Modify existing items by clicking the edit button
- **Delete Items**: Remove items with confirmation dialog
- **Low Stock Warning**: Automatic highlighting for items with quantity less than 5
- **Real-time Validation**: Input validation for name length and location format
- **Visual Feedback**: Border highlighting when editing adjacent items

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- DocumentFragment for efficient DOM manipulation
- HTML5 Template element

## Project Structure
```
warehouse-app/
│
├── index.html           # Main HTML structure
├── script/
│   └── script.js        # JavaScript functionality
└── style/
    └── styles.css       # Styling and layout
```

## Installation

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required!

## Usage

### Adding an Item

1. Fill in the item name (minimum 2 characters)
2. Enter the quantity (minimum 1)
3. Optionally enter a location in format `A01-01`
4. Click "Add Item" button

### Editing an Item

1. Click the "Edit" button on any item
2. The form will populate with the item's data
3. The next item in the list will briefly highlight with a blue border
4. Modify the values and submit to save changes

### Deleting an Item

1. Click the "Delete" button on any item
2. Confirm the deletion in the dialog box
3. Item will be removed from the list

### Clearing the Form

Click the "Clear" button to reset all form fields

## Validation Rules

### Name Field
- Required field
- Minimum 2 characters
- Validated on form submission

### Quantity Field
- Required field
- Must be at least 1
- HTML5 number input validation

### Location Field
- Optional field
- Must match pattern: `[A-Z][0-9]{2}-[0-9]{2}` (e.g., A01-01)
- Real-time validation on input

## Visual Indicators

- **Low Stock Items**: Items with quantity < 5 display with yellow background and bold text
- **Edit Highlight**: When editing an item, the next item shows a temporary blue border
- **Item Count**: Title displays total number of items
- **Total Display**: Bottom of inventory shows total item count

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- DocumentFragment
- HTML5 Template elements
- CSS Grid/Flexbox

## Technical Implementation Highlights

This project demonstrates proficiency in:

- **DOM Manipulation**: getElementById, querySelector, createElement
- **Element Caching**: Efficient element reference storage
- **Event Handling**: Multiple event listeners (submit, click, input)
- **DOM Navigation**: Parent-child-sibling relationships
- **Templating**: DocumentFragment and cloneNode
- **BOM Usage**: window.location and window.confirm
- **Form Validation**: Both HTML5 attributes and JavaScript validation
- **Dynamic Styling**: classList manipulation and inline style changes
- **Collection Iteration**: Traditional for loops over NodeLists

## Code Structure

### Main Functions

- `addItem()` - Adds new item using template cloning
- `editItem()` - Loads item data into form for editing
- `deleteItem()` - Removes item with confirmation
- `highlightLowStock()` - Applies visual warning to low quantity items
- `validateLocation()` - Real-time location format validation
- `updateDisplay()` - Updates item count displays
- `updateTitleAttr()` - Updates title attribute with count

### Event Listeners

- Form submit handler for adding items
- Clear button click handler
- Dynamic delete button handlers
- Dynamic edit button handlers
- Input event for location validation


