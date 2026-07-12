// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarProductos);

// Buscar elementos del formulario
const formAgregarProducto = document.getElementById('form-agregar-producto');
const contenedorProductos = document.getElementById('contenedor-productos');

// Manejar envío del formulario
formAgregarProducto.addEventListener('submit', agregarProducto);

// Cargar lista de productos desde backend
function cargarProductos() {
    fetch("http://localhost:3000/productos")
        .then(response => response.json())
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

// Mostrar productos en tarjetas
function mostrarProductos(productos) {
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
        contenedorProductos.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p>Precio: $${parseFloat(producto.precio).toFixed(2)}</p>
                        <p>Categoría: ${producto.categoria}</p>
                        <p>Stock: ${producto.stock}</p>
                        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Agregar nuevo producto
function agregarProducto(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const imagen = document.getElementById('imagen').value;
    const categoria = document.getElementById('categoria').value;
    const stock = parseInt(document.getElementById('stock').value);

    const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        imagen,
        categoria,
        stock
    };

    fetch("http://localhost:3000/productos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto agregado correctamente');
        formAgregarProducto.reset();
        cargarProductos();
    })
    .catch(error => {
        console.error('Error al agregar producto:', error);
        alert('Error al agregar producto');
    });
}

// Eliminar producto
function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
        return;
    }

    fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto eliminado correctamente');
        cargarProductos();
    })
    .catch(error => {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar producto');
    });
}
