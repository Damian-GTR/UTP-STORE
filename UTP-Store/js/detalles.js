// Obtener el ID de la URL (ej: Detalles.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

// Buscar contenedor en el HTML
const contenedor = document.getElementById('contenedor-detalles');

console.log('ID del producto:', productoId);
console.log('Contenedor encontrado:', contenedor);

if (productoId) {
    // Si hay ID en URL, mostrar solo ese producto
    console.log('Obteniendo producto individual:', productoId);
    fetch(`http://localhost:3000/productos/${productoId}`)
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(producto => {
            console.log('Producto recibido:', producto);
            mostrarProductoIndividual(producto);
        })
        .catch(error => {
            console.error('Error al obtener producto:', error);
        });
} else {
    // Si no hay ID en URL, mostrar todos los productos
    console.log('Obteniendo todos los productos');
    fetch("http://localhost:3000/productos")
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(productos => {
            console.log('Productos recibidos:', productos);
            mostrarTodosLosProductos(productos);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

function mostrarProductoIndividual(producto) {
    if (!contenedor) return;

    contenedor.innerHTML = `
        <div class="col-12 col-md-8 col-lg-6 mx-auto">
            <div class="card">
                <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p>$${parseFloat(producto.precio).toFixed(2)}</p>
                    <button class="btn btn-primary mt-3" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `;
}

function mostrarTodosLosProductos(productos) {
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-12 col-md-4 col-lg-3 col-sm-6">
                <div class="card">
                    <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p>$${parseFloat(producto.precio).toFixed(2)}</p>
                        <button class="btn btn-primary mt-3" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function agregarAlCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(p => p.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
}
