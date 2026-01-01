const API_URL = "http://127.0.0.1:5000";

async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const productos = await response.json();

        const contenedor = document.getElementById("productos");
        contenedor.innerHTML = ""; 

        if (productos.length === 0) {
            contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        productos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("producto-card");

            // Lógica para deshabilitar el botón si no hay stock
            const botonHTML = producto.stock > 0 
                ? `<button onclick="comprarProducto('${producto.name}', ${producto.price})">Comprar ahora</button>`
                : `<button disabled style="background-color: gray; cursor: not-allowed;">Agotado</button>`;

            card.innerHTML = `
                <h3>${producto.name}</h3>
                <p>${producto.description}</p>
                <p><strong>Precio: $${producto.price}</strong></p>
                <p>Disponibles: ${producto.stock}</p>
                ${botonHTML}
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

async function comprarProducto(nombre, precio) {
    try {
        const response = await fetch(`${API_URL}/create-checkout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: nombre, price: precio })
        });

        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert("Error al procesar el pago");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

document.addEventListener("DOMContentLoaded", cargarProductos);