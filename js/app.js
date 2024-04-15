//CARRITO DE COMPRA 
const carrito = document.querySelector("#carrito");
const loginuser = document.querySelector("#myForm")
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const Totalcarrito = document.querySelector("#lista-carrito thead")
const productos = document.querySelector("#lista-cursos")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const totalCompra= document.querySelector("#lista-carrito tfoot")
let logueado = false;
let productosCarrito = [];


cargarEventos();

function cargarEventos(){
    loginuser.addEventListener("click",login)
    productos.addEventListener("click" ,agregarProductos)
    carrito.addEventListener("click", eliminar)
    vaciarCarritoBtn.addEventListener("click",()=>{
        productosCarrito = [];
        limpiar();
    })
}
/**/
/*/Login/*/



function agregarProductos(e){
    e.preventDefault(); 
    if(logueado == false){
        alert("Por favor ingresar usuario y contraseña")
        openForm()
    } else{
        if(e.target.classList.contains('agregar-carrito')){
            const productoSeleccionados =e.target.parentElement.parentElement
            leerDatos(productoSeleccionados);
           
        }
    }
}

function login(e){
    if(e.target.classList.contains("btn")){
        if(document.querySelector("#usuario").value ==="yeral" && document.querySelector("#password").value === "12345"){
            logueado = true
            alert("Usuario Correcto")
            document.getElementById("abrir").style.display="none"
            document.getElementById("cerrar").style.display="block"
            closeForm()
        } else{
            alert("Usuario incorrecto, intentelo de nuevo")
            openForm()
        
        }
    }
}

function cerrarsesion(e){
    alert("Cerraste Sesion")
    document.getElementById("abrir").style.display="block"
    document.getElementById("cerrar").style.display="none"
    logueado=false
    limpiar()
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }




function eliminar(e){ if (e.target.classList.contains("borrar")) {
        const productoid = e.target.getAttribute("data-id")
        productosCarrito=productosCarrito.filter(producto => producto.id !== productoid) 
        carritoHTML() 
    } 
}

function leerDatos(datos){
    
    precioStr = datos.querySelector(".precio span.num-price").textContent;
    precio = precioStr.replace(".", "");

    const info = {
        imagen: datos.querySelector("img").src,
        titulo: datos.querySelector("h4").textContent,
        precio: parseInt(precio),
        id: datos.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
        total: parseInt(precio)
    }


    let existe = productosCarrito.some(productos=> productos.id === info.id);
    if (existe) {
        let pro = productosCarrito.map(mapeo => {
            if (mapeo.id === info.id) {
               mapeo.cantidad = mapeo.cantidad + 1;
               mapeo.total = precio * mapeo.cantidad;
               return mapeo;
            }else{
                return mapeo;
            }
        });
    }else{
        productosCarrito =[...productosCarrito,info]
    }

    carritoHTML()
        
}

function carritoHTML (){
    limpiar();
    productosCarrito.forEach(producto=>{
        let row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${producto.imagen}" width= "100"> </td>
        <td>${producto.titulo} </td>
        <td>$${producto.precio.toLocaleString('es-ES')} </td>
        <td>${producto.cantidad} </td>
        <td>$<span class="total-item">${producto.total.toLocaleString('es-ES')}</span> </td>
        <a href="#" class="borrar" data-id="${producto.id}"> X </a>
        </td>
        `;

        contenedorCarrito.appendChild(row);
    })
    
}

function limpiar(){
    contenedorCarrito.innerHTML = " ";
    
}
