document.addEventListener("DOMContentLoaded", function() {
    const itemForm = document.getElementById('item-form');
    const itemsContainer = document.getElementById('items-container');

    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        const itemDiscount = document.getElementById('item-discount').value || 0;
        const itemExpiry = document.getElementById('item-expiry').value;
        const itemCategory = document.getElementById('item-category').value;

        const item = {
            id: Date.now(),
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            discount: itemDiscount,
            expiry: itemExpiry,
            category: itemCategory
        };

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));

        renderItems();
        itemForm.reset();
    });

    function renderItems() {
        itemsContainer.innerHTML = '';
        const items = JSON.parse(localStorage.getItem('items')) || [];

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'card mb-3';
            itemElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: LKR ${item.price}</p>
                    <p class="card-text">Quantity: ${item.quantity}</p>
                    <p class="card-text">Discount: ${item.discount}%</p>
                    <p class="card-text">Expiry Date: ${item.expiry}</p>
                    <p class="card-text">Category: ${item.category}</p>
                    <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                    <button class="btn btn-primary" onclick="editItem(${item.id})">Edit</button>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });
    }

    window.deleteItem = function(id) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items = items.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    };

    window.editItem = function(id) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items.find(item => item.id === id);

        document.getElementById('item-name').value = item.name;
        document.getElementById('item-price').value = item.price;
        document.getElementById('item-quantity').value = item.quantity;
        document.getElementById('item-discount').value = item.discount;
        document.getElementById('item-expiry').value = item.expiry;
        document.getElementById('item-category').value = item.category;

        deleteItem(id);
    };

    renderItems();
});
