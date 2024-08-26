function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const discountAmountElement = document.getElementById('discount-amount');
    const finalPriceElement = document.getElementById('final-price');

    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate total price and total discount
    let totalPrice = 0;
    let totalDiscount = 0;

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item border p-3 mb-3 d-flex justify-content-between align-items-center';
        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Price: LKR ${item.price}</p>
                <p>Discount: LKR ${item.discount || 0}</p>
            </div>
            <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += parseFloat(item.price);
        totalDiscount += parseFloat(item.discount || 0);
    });

    // Update total price and discount display
    totalPriceElement.textContent = totalPrice.toFixed(2);
    discountAmountElement.textContent = totalDiscount.toFixed(2);
    finalPriceElement.textContent = (totalPrice - totalDiscount).toFixed(2);
}

function showOrderForm() {
    document.getElementById('order-form').style.display = 'block';
}

function submitOrder() {
    // Get user details
    const userName = document.getElementById('user-name').value;
    const userPhone = document.getElementById('user-phone').value;

    if (!userName || !userPhone) {
        alert('Please fill in all the details.');
        return;
    }

    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate total price and total discount
    let totalPrice = 0;
    let totalDiscount = 0;

    cart.forEach(item => {
        totalPrice += parseFloat(item.price);
        totalDiscount += parseFloat(item.discount || 0);
    });

    const finalPrice = totalPrice - totalDiscount;

    // Create an order object with total price, discount amount, and final price
    const order = {
        userName,
        userPhone,
        items: cart,
        totalPrice: totalPrice.toFixed(2),
        discountAmount: totalDiscount.toFixed(2),
        finalPrice: finalPrice.toFixed(2),
        status: 'Pending'
    };

    // Store the order in local storage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Decrease item quantities
    let items = JSON.parse(localStorage.getItem('items')) || [];
    cart.forEach(cartItem => {
        const item = items.find(i => i.name === cartItem.name);
        if (item) {
            item.quantity = Math.max((item.quantity || 1) - 1, 0); // Ensure quantity does not go negative
        }
    });

    // Save the updated items list to local storage
    localStorage.setItem('items', JSON.stringify(items));

    // Clear the cart from local storage
    localStorage.removeItem('cart');

    // Display confirmation message
    alert('Order confirmed!');

    // Reload the cart page to show the empty cart
    location.reload();
}

// Remove an item from the cart
function removeItem(index) {
    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item at the specified index
    cart.splice(index, 1);

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart to reflect changes
    loadCart();
}

// Load orders in the "My Orders" section
function loadOrders() {
    const ordersList = document.getElementById('orders-list');

    // Retrieve the orders from local storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Clear the orders list container
    ordersList.innerHTML = '';

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders placed yet.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item border p-3 mb-3';

        // Determine status color
        let statusColor = 'red';
        if (order.status === 'Completed') {
            statusColor = 'green';
        }

        orderElement.innerHTML = `
            <h4>Order #${index + 1}</h4>
            <p><strong>Name:</strong> ${order.userName}</p>
            <p><strong>Phone Number:</strong> ${order.userPhone}</p>
            <p><strong>Total Price:</strong> LKR ${order.totalPrice}</p>
            <p><strong>Discount Amount:</strong> LKR ${order.discountAmount}</p>
            <p><strong>Final Price:</strong> LKR ${order.finalPrice}</p>
            <p><strong>Status:</strong> <span style="color: ${statusColor};">${order.status}</span></p>
            <h5>Items:</h5>
            <ul>
                ${order.items.map(item => `
                    <li>${item.name} - LKR ${item.price} (Discount: LKR ${item.discount || 0})</li>
                `).join('')}
            </ul>
        `;
        ordersList.appendChild(orderElement);
    });
}


// Load the cart and orders when the page loads
window.onload = function() {
    loadCart();
    loadOrders();
};
