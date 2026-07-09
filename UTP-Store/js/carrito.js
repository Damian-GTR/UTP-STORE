// Cargar carrito desde localStorage (si no existe, crear array vacío)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Buscar elementos del HTML por ID
const contenedorCarrito = document.getElementById('contenedor-carrito');
const mensajeCarritoVacio = document.getElementById('mensaje-carrito-vacio');
const resumenCarrito = document.getElementById('resumen-carrito');

// Mostrar carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);

function mostrarCarrito() {
    if (!contenedorCarrito) return;

    // Vaciar contenedor antes de inyectar nuevos productos
    contenedorCarrito.innerHTML = '';

    // Si el carrito está vacío, mostrar mensaje y ocultar resumen
    if (carrito.length === 0) {
        mensajeCarritoVacio.classList.remove('d-none');
        resumenCarrito.classList.add('d-none');
        return;
    }

    // Si hay productos, ocultar mensaje y mostrar resumen
    mensajeCarritoVacio.classList.add('d-none');
    resumenCarrito.classList.remove('d-none');

    // Generar HTML para cada producto en el carrito
    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;

        contenedorCarrito.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p>Precio: $${parseFloat(producto.precio).toFixed(2)}</p>
                        <div class="d-flex align-items-center mb-2">
                            <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${index}, -1)">-</button>
                            <span class="mx-2">${producto.cantidad}</span>
                            <button class="btn btn-sm btn-secondary" onclick="modificarCantidad(${index}, 1)">+</button>
                        </div>
                        <p>Subtotal: $${subtotal.toFixed(2)}</p>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Calcular y mostrar totales
    calcularTotal();
}

function modificarCantidad(index, cambio) {
    // Incrementar o decrementar cantidad del producto
    carrito[index].cantidad += cambio;

    // Si cantidad es 0 o menos, eliminar producto del carrito
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    // Guardar cambios en localStorage y actualizar vista
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarProducto(index) {
    // Eliminar producto del array usando splice
    carrito.splice(index, 1);

    // Guardar cambios en localStorage y actualizar vista
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    // Vaciar el array del carrito
    carrito = [];

    // Guardar array vacío en localStorage y actualizar vista
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function calcularTotal() {
    // Calcular subtotal sumando (precio × cantidad) de todos los productos
    const subtotal = carrito.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);

    // Calcular IGV (18% del subtotal)
    const igv = subtotal * 0.18;

    // Calcular total (subtotal + IGV)
    const total = subtotal + igv;

    // Actualizar elementos HTML con los valores calculados
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('igv').textContent = `$${igv.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}
