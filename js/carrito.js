// Funcion para renderizar el carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartFooter.innerHTML = '<p class="carrito">El carrito está vacío</p>';
        return;
    }

    cart.forEach((item, index) => {
        total += item.precio * item.cantidad;
        const cartItem = document.createElement('div');
        cartItem.className = 'col-12 col-md-6 col-lg-3';
        cartItem.innerHTML = `
        <div class="card h-100" data-aos="zoom-in" data-aos-duration="700">
                <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">Precio: $${item.precio.toFixed(2)} x ${item.cantidad}</p>
                    <p class="card-text">Total: $${(item.precio * item.cantidad).toFixed(2)}</p>
                    <button class="btn btn-outline-dark btn-lg" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartFooter.innerHTML = `
        <h4>Total: $${total.toFixed(2)}</h4>
        <button class="btn btn-dark btn-lg" onclick="clearCart()">Vaciar Carrito</button>
    `;
}

// Funcion para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    
}

// Funcion para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
    Toastify({
        text: 'Carrito vaciado',
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true
    }).showToast();
}

// Renderizar el carrito cuando la pagina se cargue
window.onload = renderCart;
