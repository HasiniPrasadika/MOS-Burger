document.addEventListener('DOMContentLoaded', function() {
    const pendingOrdersList = document.getElementById('pending-orders-list');
    const completedOrdersList = document.getElementById('completed-orders-list');

    // Function to load and display orders
    function loadOrders() {
        // Retrieve orders from local storage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Clear existing orders
        pendingOrdersList.innerHTML = '';
        completedOrdersList.innerHTML = '';

        // Display each order
        orders.forEach((order, index) => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <h4>Order Details</h4>
                <p><strong>Name:</strong> ${order.userName}</p>
                <p><strong>Phone:</strong> ${order.userPhone}</p>
                <h5>Items:</h5>
                <ul>
                    ${order.items.map(item => `<li>${item.name} - LKR ${item.price} (Discount: LKR ${item.discount || 0})</li>`).join('')}
                </ul>
                <p><strong>Total Price:</strong> LKR ${order.totalPrice}</p>
                <p><strong>Total Discount:</strong> LKR ${order.discountAmount}</p>
                <p><strong>Final Price:</strong> LKR ${order.finalPrice}</p>
                <p><strong>Status:</strong> ${order.status || 'Pending'}</p>
                ${order.status === 'Pending' ? `
                    <button class="btn btn-success" onclick="completeOrder(${index})">Complete Order</button>
                    <button class="btn btn-danger" onclick="deleteOrder(${index})">Delete Order</button>
                ` : `<button class="btn btn-danger" onclick="deleteOrder(${index})">Delete Order</button>`}
            `;
            
            if (order.status === 'Pending') {
                pendingOrdersList.appendChild(orderElement);
            } else {
                completedOrdersList.appendChild(orderElement);
            }
        });
    }

    // Function to mark an order as completed
    window.completeOrder = function(index) {
        // Retrieve orders from local storage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Update the status of the selected order
        if (orders[index]) {
            orders[index].status = 'Completed';
            localStorage.setItem('orders', JSON.stringify(orders));
            loadOrders(); // Reload the orders list
        }
    }

    // Function to delete an order
    window.deleteOrder = function(index) {
        if (confirm('Are you sure you want to delete this order?')) {
            // Retrieve orders from local storage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];

            // Remove the selected order
            orders.splice(index, 1);

            // Update local storage
            localStorage.setItem('orders', JSON.stringify(orders));

            // Reload the orders list
            loadOrders();
        }
    }

    // Load orders when the page loads
    loadOrders();
});
