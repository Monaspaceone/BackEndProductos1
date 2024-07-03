document.addEventListener('DOMContentLoaded', () =>
{
  
    const mostrarCrearProductoFormBtn = document.getElementById('mostrarCrearProductoFormBtn');
    const mostrarCrearMarcaBtn= document.getElementById('mostrarCrearMarcaBtn');
    const crearProductoForm = document.getElementById('crearProductoForm');
    const crearMarcaForm = document.getElementById ('crearMarcaForm'); 
    const editarProductoForm = document.getElementById('editarProductoForm');
    const listarProductosBtn = document.getElementById('listarProductosBtn');
    const listaProductos = document.getElementById('listaProductos');
    const listarMarcasBtn = document.getElementById('listarMarcasBtn');
    //const listarMarcas = document.getElementById('listarMarcas');
   // esta es la constante que hace que no se despliegen los form
   
    const idMarcaSelect = document.getElementById('idMarca');

//para que despliegue el form de Crear Producto
    
   mostrarCrearProductoFormBtn.addEventListener('click',() =>
    {
        crearProductoForm.classList.toggle('hidden');
    });


    mostrarCrearMarcaBtn.addEventListener('click',() =>
        {
            crearMarcaForm.classList.toggle('hidden');
        });



// para introducir las marcas en los formularios
 crearMarcaForm.addEventListener('submit', async (e) => 
            {
                e.preventDefault();//evita qaue la pagina se actualice
        
                const formData = new FormData(crearMarcaForm); // guarda los datos del formulario
          //cuando hago un get recibo un json 
                const data = 
                {
                 
                    nombre: formData.get('nombre'),
                    categorias: formData.get('categorias'),
                    
                };
        
                const response = await fetch('/marcas',
                {
                    method: 'POST',
                    body: formData
                
                });
        
                const result = await response.json();
                alert(result.message);
                crearMarcaForm.reset(); 
                crearMarcaForm.classList.add('hidden');
                listarMarcas();
                cargarMarcas(); 
            });









            
    //CREAR PRODUCTOS NUEVOS
    crearProductoForm.addEventListener('submit', async (e) => 
    {
        e.preventDefault();//evita qaue la pagina se actualice

        const formData = new FormData(crearProductoForm); // guarda los datos del formulario
  //cuando hago un get recibo un json 
        const data = 
        {
            idMarca: formData.get('idMarca'),
            producto: formData.get('producto'),
            descripcion: formData.get('descripcion'),
            categoria: formData.get('categoria'),
            temporada: formData.get('temporada'),
            precio: formData.get('precio'),
        
        };

        const response = await fetch('/productos',
        {
            method: 'POST',
            body: formData
        
        });

        const result = await response.json();
        alert(result.message);
        crearProductoForm.reset(); 
        crearProductoForm.classList.add('hidden');
        listarProductos();
    });

    

    //EDITAR USUARIO
    editarProductoForm.addEventListener('submit', async(e) => 
    {   
        e.preventDefault();
        const formData = new FormData(editarProductoForm);

        const id = formData.get('editID');
        
        const data = 
        {
            //que onda el id de marca
            idMarca: formData.get ('editIdMarca'),
            producto: formData.get('editProducto'),
            descripcion: formData.get('editDescripcion'),
            categoria: formData.get ('editCategoria'),
            editTemporada: formData.get ('editTemporada'),
            precio: formData.get('editPrecio'),
        };

        const response = await fetch(`/productos/${id}`,
        {
            method: 'PUT',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json();
        alert(result.message);
        editarProductoForm.reset();
        editarProductoForm.classList.add('hidden');
        listarProductos();

    });



    

    //listar todos los usuarios
    listarProductosBtn.addEventListener('click', listarProductos);
    //listar todas las marcas
    listarMarcasBtn.addEventListener('click', listarMarcas);



    async function listarProductos()
    {
        const response = await fetch('/productos');
        const productos = await response.json();

        listaProductos.innerHTML = ''; //limpiar la lista , y le vuelvo a pasar los datos

        productos.forEach(producto => 
            {
                const li = document.createElement('li');

                li.innerHTML = `
                    <span> ID: ${producto.id}, IDMarca ${producto.idMarca}, Producto: ${producto.producto}, Descripcion: ${producto.descripcion}, Categoria: ${producto.categoria}, Temporada: ${producto.temporada}, Precio : ${producto.precio}  </span>
                    
                    
                    <div class="actions"> 
                        <button class="update" data-id= "${producto.id}", data-idMarca"${producto.idMarca}", data-producto="${producto.producto}", data-categoria="${producto.categoria}", data-descripcion="${producto.descripcion}",data-temporada="${producto.temporada}" , data-precio="${producto.precio}"> Actualizar </button>
               
                        <button class="delete" data-id="${producto.id}"> Eliminar </button>
                    </div>
                
                `;
                listaProductos.appendChild(li);
            });

            //ACTUALIZAR USUARIO
            document.querySelectorAll('.update').forEach(button => 
                {
                    button.addEventListener('click', (e) => 
                    {
                        const id = e.target.getAttribute('data-id');
                        const idMarca= e.target.getAttribute('data-idMarca');
                        const producto = e.target.getAttribute('data-producto');
                        const descripcion = e.target.getAttribute('data-descripcion');
                        const categoria = e.target.getAttribute('data-categoria');
                        const temporada = e.target.getAttribute('data-temporada');
                        const precio = e.target.getAttribute('data-precio');
                        

                        document.getElementById('editID').value = id;
                        document.getElementById('editIdMarca').value = idMarca;
                        document.getElementById('editProducto').value = producto;
                        document.getElementById('editDescripcion').value = descripcion;
                        document.getElementById('editCategoria').value = categoria;
                        document.getElementById('editTemporada').value = temporada;
                        document.getElementById('editPrecio').value = precio;
                       



                        editarProductoForm.classList.remove('hidden');
                    });
                });


                document.querySelectorAll('.delete').forEach(button =>
                    {
                        button.addEventListener('click', async (e) =>
                        {
                            const id = e.target.getAttribute('data-id');
                            const response = await fetch(`/productos/${id}`,
                            {
                                method: 'DELETE'
                            });

                            const result = await response.json();
                            alert(result.message);
                            listarProductos();

                        });

                    });


    }



async function listarMarcas() {
        const response = await fetch('/marcas');
        const marcas = await response.json();

        listaMarcas.innerHTML = '';

        marcas.forEach(marca => {
            const li = document.createElement('li');
            li.textContent = `ID: ${marca.id}, Nombre: ${marca.nombre}, Categoría: ${marca.categoria}`;
            listaMarcas.appendChild(li);
        });
    }

    async function cargarMarcas() {
        const response = await fetch('/marcas');
        const marcas = await response.json();

        idMarcaSelect.innerHTML = '';

        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.id;
            option.textContent = marca.nombre;
            idMarcaSelect.appendChild(option);
        });
    }

  // Inicializar la página
    //listarProductos();
    listarMarcas();
    cargarMarcas();




    
});







