document.addEventListener('DOMContentLoaded', () => {
    //seleccionamos los elementos del dom que necesitamos

    const mostrarCrearProductoFormBtn = document.getElementById('mostrarCrearProductoFormBtn');
    const mostrarCrearMarcaBtn = document.getElementById('mostrarCrearMarcaBtn');
    const crearProductoForm = document.getElementById('crearProductoForm');
    const crearMarcaForm = document.getElementById('crearMarcaForm');
    const editarProductoForm = document.getElementById('editarProductoForm');
    const listarProductosBtn = document.getElementById('listarProductosBtn');
    const listarMarcasBtn = document.getElementById('listarMarcasBtn');
    const closeEditFormBtn = document.getElementById('closeEditForm');
    const idMarcaSelect = document.getElementById('idMarca');
    const editIdMarcaSelect = document.getElementById('editIdMarca');
    const tablaMarcas = document.getElementById('tablaMarcas');
    const bodyTablaMarcas = document.getElementById('bodyTablaMarcas');
    const tablaProductos = document.getElementById('tablaProductos');
    const bodyTablaProductos = document.getElementById('bodyTablaProductos');

    //eventos para mostrar y ocultar formularios




  //mostrar imagen de multer
  /*const currentImage = document.getElementById('currentImage');


  mostrarCrearUsuarioFormBtn.addEventListener('click',() =>
  {
      crearUsuarioForm.classList.toggle('hidden');
  });

   */


    mostrarCrearProductoFormBtn.addEventListener('click', () => {
        crearProductoForm.classList.toggle('hidden');
    });

    mostrarCrearMarcaBtn.addEventListener('click', () => {
        crearMarcaForm.classList.toggle('hidden');
    });

    closeEditFormBtn.addEventListener('click', () => {
        editarProductoForm.classList.add('hidden');
    });

    listarMarcasBtn.addEventListener('click', () => {
        tablaMarcas.classList.toggle('hidden');
    });

    listarProductosBtn.addEventListener('click', () => {
        tablaProductos.classList.toggle('hidden');
    });

    // Función para cargar marcas en los select de los formularios
    async function cargarMarcas() {
        const response = await fetch('/marcas'); //hacemos la peticion para obtener las marcas
        const marcas = await response.json();  //parseamos la respuesta a json
        //limpiamos los selec antes de anadir las nuevas opciones
        idMarcaSelect.innerHTML = '';
        editIdMarcaSelect.innerHTML = '';
         //anadimos las opciones al select al select de crear producto y al de editar
        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.idMarca;
            option.textContent = marca.nombre;
            idMarcaSelect.appendChild(option);

            const editOption = document.createElement('option');
            editOption.value = marca.idMarca;
            editOption.textContent = marca.nombre;
            editIdMarcaSelect.appendChild(editOption);
        });
    }

    cargarMarcas();   //llamamos a la funcion para cargar las marcas al inciio

    //evento para crear una nueva marca
    crearMarcaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(crearMarcaForm);
        const data = {
            nombre: formData.get('nombre'),
            categorias: formData.get('categorias'),
        };

        const response = await fetch('/marcas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        swal(result.mensaje);
        crearMarcaForm.reset();
        crearMarcaForm.classList.add('hidden');
        listarMarcas();
        cargarMarcas(); 
    });

    

   // evento para crear un nuevo producto

    crearProductoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(crearProductoForm);
        const data = {
            idMarca: formData.get('idMarca'),
            producto: formData.get('producto'),
            descripcion: formData.get('descripcion'),
            categoria: formData.get('categoria'),
            precio: formData.get('precio'),
           // archivo: formData.get('archivo'),

        };

        const response = await fetch('/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

            //aca tendriamos que enviarlo como form-data (con multer) 1:19 youtube (te envio todo este paquete)
        });
    // procesa la respuesta del servidor
        const result = await response.json();
        swal(result.mensaje);  //muestra el mensaje al usuario
        crearProductoForm.reset();  //resetear el formulario
        crearProductoForm.classList.add('hidden'); //ocultar el formulario
        listarProductos();  //actualiza la lista
    });
  //evento para editr un nuevo producto
    editarProductoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(editarProductoForm);

        const id = formData.get('editID');
        const data = {
            idMarca: formData.get('editIdMarca'),
            producto: formData.get('editProducto'),
            descripcion: formData.get('editDescripcion'),
            categoria: formData.get('editCategoria'),
            precio: formData.get('editPrecio'),
        

        };

        const response = await fetch(`/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        swal(result.mensaje);
        editarProductoForm.reset();
        editarProductoForm.classList.add('hidden');
        listarProductos();
    });
  //funcion de listar productos
    async function listarProductos() {
        const response = await fetch('/productos'); // Hacemos una petición para obtener los productos
        const productos = await response.json(); /// Parseamos la respuesta a JSON

        bodyTablaProductos.innerHTML = '';  // Limpiamos el cuerpo de la tabla

        productos.forEach(producto => {
            //const imageSrc = producto.ruta_archivo ? `/uploads/${producto.ruta_archivo}` :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBbNf8tPjjMylsbREVGlN1Dj30k5_JVDZOg&s';
            
            const tr = document.createElement('tr'); //creamos una nueva fila para cada prodcuto
            tr.innerHTML = `
                <td>${producto.idProducto}</td>
                <td>${producto.idMarca}</td>
                <td>${producto.producto}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.categoria}</td>
                <td>${producto.precio}</td>
                <td>
                    <button class="update" data-id="${producto.idProducto}" data-idMarca="${producto.idMarca}" data-producto="${producto.producto}"data-descripcion="${producto.descripcion}"data-categoria="${producto.categoria}" data-precio="${producto.precio}">Editar</button>
                    <button class="delete" data-id="${producto.idProducto}">Borrar</button>
                </td>
            `;
            bodyTablaProductos.appendChild(tr); //agregamos la fila a la tabla
        });

        //   <td><img src="${imageSrc}" alt="Img de perfil" width="20px"></td>
        //data-image:"${imageSrc} 

        document.querySelectorAll('.update').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const idMarca = e.target.getAttribute('data-idMarca');
                const producto = e.target.getAttribute('data-producto');
                const descripcion = e.target.getAttribute('data-descripcion');
                const categoria = e.target.getAttribute('data-categoria');
                const precio = e.target.getAttribute('data-precio');
                //const imagen = e.target.getAttribute('data-image');

                document.getElementById('editID').value = id;
                document.getElementById('editIdMarca').value = idMarca;
                document.getElementById('editProducto').value = producto;
                document.getElementById('editDescripcion').value = descripcion;
                document.getElementById('editCategoria').value = categoria;
                document.getElementById('editPrecio').value = precio;
                //currentImage.src = imagen;
             

                editarProductoForm.classList.remove('hidden');
            });
        });

        //anadimos eventos a los botones de borrar 

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const response = await fetch(`/productos/${id}`, {
                    method: 'DELETE'
                });
                const result = await response.json(); ///parseamos la respuesta
                swal(result.mensaje);
                listarProductos();
            });
        });
    }

    async function listarMarcas() {
        const response = await fetch('/marcas');
        const marcas = await response.json();

        bodyTablaMarcas.innerHTML = '';

        marcas.forEach(marca => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${marca.idMarca}</td>
                <td>${marca.nombre}</td>
                <td>${marca.categorias}</td>
            `;
            bodyTablaMarcas.appendChild(tr);
        });

        cargarMarcas();
    }


    listarProductos(); 
    //listarProductosBtn.addEventListener('click', listarProductos);
    listarMarcasBtn.addEventListener('click', listarMarcas);

    // Cargar marcas al inicio
    cargarMarcas();

});







