let totalPrice = 0;

function add() {
    const item = document.getElementById('item').value.trim();
    const price = parseFloat(document.getElementById('price').value);

    if (!item || isNaN(price) || price <= 0) {
        alert("Please enter a valid product name and price.");
        return;
    }

    const table = document.getElementById('product');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${item}</td>
        <td>${price.toFixed(2)}</td>
        <td>
            <button onclick="editProduct(this)">Edit</button>
            <button onclick="deleteProduct(this, ${price})">Delete</button>
        </td>
    `;

    table.appendChild(row);

    // Update total price
    totalPrice += price;
    updateTotal();

    // Clear inputs
    document.getElementById('item').value = '';
    document.getElementById('price').value = '';
}

function delall() {
    const table = document.getElementById('product');
    table.innerHTML = ''; // Clear all rows
    totalPrice = 0; // Reset total price
    updateTotal();
}

function deleteProduct(button, price) {
    const row = button.parentElement.parentElement;
    row.remove();

    // Subtract price from total
    totalPrice -= price;
    updateTotal();
}

function editProduct(button) {
    const row = button.parentElement.parentElement;
    const nameCell = row.cells[0];
    const priceCell = row.cells[1];

    const newName = prompt("Edit Product Name:", nameCell.textContent.trim());
    const newPrice = parseFloat(prompt("Edit Product Price:", priceCell.textContent.trim()));

    if (!newName || isNaN(newPrice) || newPrice <= 0) {
        alert("Invalid product name or price. No changes made.");
        return;
    }

    // Update total price
    const oldPrice = parseFloat(priceCell.textContent.trim());
    totalPrice -= oldPrice;
    totalPrice += newPrice;

    // Update row content
    nameCell.textContent = newName;
    priceCell.textContent = newPrice.toFixed(2);

    updateTotal();
}

function updateTotal() {
    // Display the total price with two decimal places
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}
