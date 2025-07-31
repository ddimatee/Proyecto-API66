async function cargarProductos() {
            try {
                const res = await fetch('http://localhost:3000/api/productos');
                if (!res.ok) throw new Error('Error en la respuesta del servidor');
                const productos = await res.json();
                const tbody = document.querySelector("#productosTabla tbody");
                tbody.innerHTML = "";

                productos.forEach(prod => {
                    const fila = document.createElement('tr');

                    fila.innerHTML = `
                        <td>${prod.id}</td>
                        <td>${prod.nombre}</td>
                        <td>$${parseFloat(prod.precio).toFixed(2)}</td>
                        <td>${prod.descripcion}</td>
                        <td><button class="eliminar-btn" data-id="${prod.id}">Eliminar</button></td>
                    `;

                    tbody.appendChild(fila);
                });

               
                document.querySelectorAll('.eliminar-btn').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const id = e.target.getAttribute('data-id');
                        if (confirm(`¿Seguro que quieres eliminar el producto con ID ${id}?`)) {
                            try {
                                const resDelete = await fetch(`http://localhost:3000/api/productos/${id}`, {
                                    method: 'DELETE',
                                });
                                if (!resDelete.ok) throw new Error('No se pudo eliminar el producto');
                                alert(`Producto ID ${id} eliminado.`);
                                cargarProductos();
                            } catch (err) {
                                alert('Error al eliminar: ' + err.message);
                            }
                        }
                    });
                });

            } catch (error) {
                alert("Error al cargar productos: " + error.message);
            }
        }

        cargarProductos();