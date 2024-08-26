
function placeOrder(button) {
    // Retrieve item details from the card body
    const cardBody = button.closest('.card-body');

    // Get all elements with class 'card-title' inside the card body
    const nameElements = cardBody.querySelectorAll('.item-name');

    // Combine the text content of all title elements to form the item name
    let itemName = '';
    nameElements.forEach(name => {
        itemName += name.textContent + ' ';
    });
    itemName = itemName.trim(); // Remove any trailing spaces

    // Get the price from the card body
    const itemPrice = cardBody.querySelector('.d-flex .card-title').textContent.trim();

    // Retrieve the current cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push({ name: itemName, price: itemPrice });

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Display a confirmation message
    alert(`${itemName} has been added to your cart!`);
}
