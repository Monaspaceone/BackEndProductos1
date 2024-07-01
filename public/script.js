document.addEventListener('DOMContentLoaded', () =>
{
  
    const mostrarCrearProductoFormBtn = document.getElementById('mostrarCrearProductoFormBtn');
    const mostrarCrearMarcaBtn= document.getElementById('mostrarCrearMarcaBtn');
    const crearProductoForm = document.getElementById('crearProductoForm');
    const crearMarcaForm = document.getElementById ('crearMarcaForm'); 
    //const editarProductoForm = document.getElementById('editarProductoForm');
    //const listarProductosBtn = document.getElementById('listarProductosBtn');
    //const listarMarcasBtn = document.getElementById('listarMarcasBtn');

    const listarProductos = document.getElementById('listarProductos');
    //const listarMarcas = document.getElementById('listarMarcas');


    //mostrar imagen de multer
//const currentImage = document.getElementById('currentImage');

//para que despliegue el form de Crear Producto
    mostrarCrearProductoFormBtn.addEventListener('click',() =>
    {
        crearProductoForm.classList.toggle('hidden');
    });


    mostrarCrearMarcaBtn.addEventListener('click',() =>
        {
            crearMarcaForm.classList.toggle('hidden');
        });

    }
    /*
    //crear Marcas
    crearMarcaForm.addEventListener('submit', async (e) => 
        {
            e.preventDefault();//evita qaue la pagina se actualice
    
            const formData = new FormData(crearMarcaForm);
    
            const data = 
            {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                mail: formData.get('mail'),
                //archivo: formData.get('archivo')
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
            listarUsuarios();
        });
    //CREAR PRODUCTOS NUEVOS
    crearProductoForm.addEventListener('submit', async (e) => 
    {
        e.preventDefault();//evita qaue la pagina se actualice

        const formData = new FormData(crearProductoForm); // guarda los datos del formulario
  //cuando hago un get recibo un json 
        const data = 
        {
            producto: formData.get('producto'),
            descripcion: formData.get('descripcion'),
            categoria: formData.Dataget('categoria'),
            precio: formData.get('precio'),
            //archivo: formData.get('archivo')
        };

        const response = await fetch('/productos',
        {
            method: 'POST',
            body: formData
         //en la clase puso algo distiendo
         // method: 'post',
         //headers: {
           // 'content-type': 'application/json'
           //}, body: json.stringgify(data)
         


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
            producto: formData.get('editProducto'),
            descripcion: formData.get('editDescripcion'),
            categoria: formData.get (editCategoria),
            precio: formData.get('editPrecio')
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
        editarUsuarioForm.reset();
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();

    });





    //listar todos los usuarios
    listarProductosBtn.addEventListener('click', listarProductos);

    async function listarProductos()
    {
        const response = await fetch('/productos');
        const productos = await response.json();

        listaUsuarios.innerHTML = ''; //limpiar la lista , y le vuelvo a pasar los datos

        productos.forEach(producto => 
            {
                const li = document.createElement('li');

                //const imageSrc = producto.ruta_archivo ? `/uploads/${usuario.ruta_archivo}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBbNf8tPjjMylsbREVGlN1Dj30k5_JVDZOg&s';
 ///voy a guardar en un json

                li.innerHTML = `
                    <span> ID: ${producto.id}, IDMarca ${producto.idMarca}, Producto: ${producto.producto}, Descripcion: ${producto.descripcion}, Categoria: ${producto.categoria}, Precio : ${producto.precio}  </span>
                    
                    
                    <div class="actions"> 
                        <button class="update" data-id= "${producto.id}", data-idMarca"${producto.idMarca}", data-producto="${producto.producto}", data-categoria="${producto.categoria}", data-descripcion="${producto.descripcion}" data-precio="${usuario.precio}"> Actualizar </button>
               
                        <button class="delete" data-id="${producto.id}"> Eliminar </button>
                    </div>
                
                `;
                listaProducto.appendChild(li);
            });

            //ACTUALIZAR USUARIO
            document.querySelectorAll('.update').forEach(button => 
                {
                    button.addEventListener('click', (e) => 
                    {
                        const id = e.target.getAttribute('data-id');
                        //const idMarca= e.target.getAttribute('data-idMarca');
                        const producto = e.target.getAttribute('data-producto');
                        const descripcion = e.target.getAttribute('data-descripcion');
                        const categoria = e.target.getAttribute('data-categoria');
                        const precio = e.target.getAttribute('data-precio');
                        //const imagen = e.target.getAttribute('data-image');


                        document.getElementById('editID').value = id;
                        //id marca??
                        document.getElementById('editProducto').value = producto;
                        document.getElementById('editDescripcion').value = descripcion;
                        document.getElementById('editCategoria').value = Categoria;
                        document.getElementById('editPrecio').value = precio;
                        //currentImage.src = imagen;



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


});