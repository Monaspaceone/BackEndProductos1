document.addEventListener('DOMContentLoaded', () =>
{
  
    const mostrarCrearProductoFormBtn = document.getElementById('mostrarCrearProductoFormBtn');
    const mostrarCrearMarcaBtn= document.getElementById('mostrarCrearMarcaBtn');
    const crearProductoForm = document.getElementById('crearProductoForm');
    const crearMarcaForm = document.getElementById ('crearMarcaForm'); 
    const editarProductoForm = document.getElementById('editarProductoForm');
    const listarProductosBtn = document.getElementById('listarProductosBtn');
    const listarMarcasBtn = document.getElementById('listarMarcasBtn');
    const closeEditFormBtn = document.getElementById('closeEditForm');
    const idMarcaSelect = document.getElementById('idMarca');
    const editIdMarcaSelect = document.getElementById('editIdMarca');
    const tablaMarcas = document.getElementById('tablaMarcas');
    const bodyTablaMarcas = document.getElementById('bodyTablaMarcas');
    const tablaProductos= document.getElementById('tablaProductos');
    const bodyTablaProductos = document.getElementById('bodyTablaProductos');
    
   mostrarCrearProductoFormBtn.addEventListener('click',() =>
    {
        crearProductoForm.classList.toggle('hidden');
    });


    mostrarCrearMarcaBtn.addEventListener('click',() =>
        {
            crearMarcaForm.classList.toggle('hidden');
        });

      closeEditFormBtn.addEventListener('click', () =>
        {
         editarProductoForm.classList.add('hidden');
      });

        
        listarMarcasBtn.addEventListener('click', () => {
            
            tablaMarcas.classList.toggle('hidden') ; 
        
        });
     

        listarProductosBtn.addEventListener('click', () => {
            
            tablaProductos.classList.toggle('hidden');
            
           
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
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        
        });

        const result = await response.json();
        swal(result.mensaje);
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
        swal(result.mensaje);
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
        
            bodyTablaProductos.innerHTML = '';
        
            productos.forEach(producto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${producto.idProducto}</td>
                    <td>${producto.idMarca}</td>
                    <td>${producto.producto}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.temporada === '1' ? 'Sí' : 'No'}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <button class="update" data-id="${producto.idProducto}" data-idMarca="${producto.idMarca}" data-producto="${producto.producto}" data-descripcion="${producto.descripcion}" data-categoria="${producto.categoria}" data-temporada="${producto.temporada}" data-precio="${producto.precio}">Editar</button>
                        <button class="delete" data-id="${producto.idProducto}">Borrar</button>
                    </td>
                `;
                bodyTablaProductos.appendChild(tr);
            });
        


            document.querySelectorAll('.update').forEach(button => {

                button.addEventListener('click', (e) => {

                    const id = e.target.getAttribute('data-id');
                    const idMarca = e.target.getAttribute('data-idMarca');
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
        
            document.querySelectorAll('.delete').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const response = await fetch(`/productos/${id}`, {
                        method: 'DELETE'
                    });
                    const result = await response.json();
                    swal(result.mensaje);
                    listarProductos();
                });
            });
        
        } 


    async function listarMarcas() {
        const response = await fetch('/marcas');
        const marcas = await response.json();
    
      //  const tablaMarcas = document.getElementById('tablaMarcas');
       // const bodyTablaMarcas = document.getElementById('bodyTablaMarcas');
    
        bodyTablaMarcas.innerHTML = '';
    
        marcas.forEach(marca => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${marca.idMarca}</td>
                <td>${marca.nombre}</td>
                <td>${marca.categorias}</td>
               
            `;
                 //esto va adentro por si haccemos para editar marcas
                // <td>
                //    <button class="update" data-id="${marca.idMarca}" data-nombre="${marca.nombre}" data-categorias="${marca.categorias}">Editar</button>
                 //   <button class="delete" data-id="${marca.idMarca}">Borrar</button>
               // </td>


            bodyTablaMarcas.appendChild(tr);
        });
    
        
   cargarMarcas();

           async function cargarMarcas() {
          const response = await fetch('/marcas');
            const marcas = await response.json();

            idMarcaSelect.innerHTML = '';

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
      } 

    async function cargarMarcasEdit() {
        const response = await fetch('/marcas');
        const marcas = await response.json();

        editIdMarcaSelect.innerHTML = '';

        marcas.forEach(marca => {
            const option = document.createElement('option');
            option.value = marca.idMarca;
            option.textContent = marca.nombre;

            editIdMarcaSelect.appendChild(option);

        });
    }
     
    cargarMarcasEdit();

   
    
});







