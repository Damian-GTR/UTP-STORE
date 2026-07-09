// Fetch a la API para obtener todos los productos desde PostgreSQL
fetch("http://localhost:3000/productos")
    .then(response => response.json())
    .then(productos => {
        // Llamar a funciones para mostrar productos por categoría en sus respectivos contenedores
        mostrarProductosCuadernos(productos, "Cuadernos y Papel", "contenedor-cuadernos");
        mostrarProductosEscritura(productos, "Escritura", "contenedor-escritura");
        mostrarProductosCarpetas(productos, "Carpetas y Organización", "contenedor-carpetas");
        mostrarProductosOficina(productos, "Oficina", "contenedor-oficina");
    })
    .catch(error => console.error(error));

function mostrarProductosCuadernos(productos, categoria, idContenedor) {
    // Buscar contenedor por ID en el HTML
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Vaciar contenedor antes de inyectar nuevos productos
    contenedor.innerHTML = "";

    // Filtrar productos por categoría y tomar solo los primeros 3
    const filtrados = productos
        .filter(producto => producto.categoria === categoria)
        .slice(0, 3);

    // Generar HTML para cada producto y inyectarlo en el contenedor
    filtrados.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-12 col-lg-4 col-sm-6">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-5">
                            <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                        </div>
                        <div class="col-7">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <a href="Detalles.html?id=${producto.id}" class="btn btn-dark">Ver detalles</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function mostrarProductosEscritura(productos, categoria, idContenedor) {
    // Buscar contenedor por ID en el HTML
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Vaciar contenedor antes de inyectar nuevos productos
    contenedor.innerHTML = "";

    // Filtrar productos por categoría y tomar solo los primeros 3
    const filtrados = productos
        .filter(producto => producto.categoria === categoria)
        .slice(0, 3);

    // Generar HTML para cada producto (estructura: texto izquierda, imagen derecha)
    filtrados.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-12 col-lg-4 col-sm-6">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-7">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <a href="Detalles.html?id=${producto.id}" class="btn btn-dark">Ver detalles</a>
                            </div>
                        </div>
                        <div class="col-5">
                            <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function mostrarProductosCarpetas(productos, categoria, idContenedor) {
    // Buscar contenedor por ID en el HTML
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Vaciar contenedor antes de inyectar nuevos productos
    contenedor.innerHTML = "";

    // Filtrar productos por categoría y tomar solo los primeros 4
    const filtrados = productos
        .filter(producto => producto.categoria === categoria)
        .slice(0, 4);

    // Generar HTML para cada producto (estructura: card-pequeño con solo imagen)
    filtrados.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-12 col-lg-3 col-sm-6">
                <div class="card card-pequeño">
                    <div class="card-body">
                        <img src="../${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                    </div>
                </div>
            </div>
        `;
    });
}

function mostrarProductosOficina(productos, categoria, idContenedor) {
    // Buscar contenedor por ID en el HTML
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    // Vaciar contenedor antes de inyectar nuevos productos
    contenedor.innerHTML = "";

    // Filtrar productos por categoría y tomar solo los primeros 5
    const filtrados = productos
        .filter(producto => producto.categoria === categoria)
        .slice(0, 5);

    // Si hay al menos 5 productos, generar estructura especial (card1 con 4 productos + card2 con 1 producto)
    if (filtrados.length >= 5) {
        contenedor.innerHTML = `
            <div class="col-md-9">
                <div class="card card1 h-100">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-6">
                            <img src="../${filtrados[0].imagen}" alt="${filtrados[0].nombre}" class="img-fluid">
                            <a href="Detalles.html?id=${filtrados[0].id}">Ver mas</a>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6">
                            <img src="../${filtrados[1].imagen}" alt="${filtrados[1].nombre}" class="img-fluid">
                            <a href="Detalles.html?id=${filtrados[1].id}">Ver mas</a>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6">
                            <img src="../${filtrados[2].imagen}" alt="${filtrados[2].nombre}" class="img-fluid">
                            <a href="Detalles.html?id=${filtrados[2].id}">Ver mas</a>
                        </div>
                        <div class="col-12 col-sm-6 col-md-6">
                            <img src="../${filtrados[3].imagen}" alt="${filtrados[3].nombre}" class="img-fluid">
                            <a href="Detalles.html?id=${filtrados[3].id}">Ver mas</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-12">
                <div class="card card2 h-100">
                    <img src="../${filtrados[4].imagen}" alt="${filtrados[4].nombre}" class="img-fluid">
                    <a href="Detalles.html?id=${filtrados[4].id}">Ver mas</a>
                </div>
            </div>
        `;
    }
}