// CONSOLE.LOG ABREVIADO
const c = (a) => {console.log(a)}

// OBJETO CON EL QUE SE GENERAN CADA UNO DE LOS PRODUCTOS
class Producto {
    constructor (id, tipo, sab, precio) {
        this.id = id;
        this.tipo = tipo;
        this.sab = sab;
        this.precio = precio
    }
}
// ARRAY QUE CONTIENE LOS PRODUCTOS
const productos = [
    new Producto (id = 0, tipo = "empanadas", sab = "Carne", precio = 250),
    new Producto (id = 1, tipo = "empanadas", sab = "Jamón y queso", precio = 250),
    new Producto (id = 2, tipo = "empanadas", sab = "Árabes", precio = 250),
    new Producto (id = 3, tipo = "empanadas", sab = "Verdura", precio = 250),
    new Producto (id = 4, tipo = "empanadas", sab = "Matambre", precio = 250),
    new Producto (id = 5, tipo = "empanadas", sab = "Cebolla", precio = 250),
    new Producto (id = 6, tipo = "budines", sab = "Zanahoria", precio = 700),
    new Producto (id = 7, tipo = "budines", sab = "Limón glaseado", precio = 700),
    new Producto (id = 8, tipo = "budines", sab = "Marmolado", precio = 700),
    new Producto (id = 9, tipo = "budines", sab = "Chocolate y nueces", precio = 700),
];

// ESTRUCTURA PARA INSERTAR LAS VARIEDADES DE PRODUCTOS EN SUS CORRESPONDIENTES SECCIONES
const seccEmp = document.getElementById("seccEmp");
const seccBud = document.getElementById("seccBud");
let variedadE = " ";
let variedadB = " ";

productos.forEach((prop) => {
    if (prop.tipo == "empanadas") {
        variedadE +=
        document.getElementById("seccEmp").innerHTML= 
        `<div class="variedades">
            <label class="col-8" for="${prop.sab}">${prop.sab}   ($${prop.precio})</label>
            <input class="col-4" id="${prop.id}" name="${prop.sab}" type="number" value="0"> 
        </div>`
    }
    else {
        variedadB +=
        document.getElementById("seccBud").innerHTML= 
        `<div class="variedades">
            <label class="col-8" for="${prop.sab}">${prop.sab}   ($${prop.precio})</label>
            <input class="col-4" id="${prop.id}" name="${prop.sab}" type="number" value="0"> 
        </div>`
    
    }    
})

// IMPRIMIR LAS VARIEDADES EN CADA UNA DE LAS SECCIONES DE PRODUCTOS
seccEmp.innerHTML = variedadE;
seccBud.innerHTML = variedadB;

// ARRAY QUE ACUMULA LOS PEDIDOS
let pedidoT = Array(productos.length - 1);

// VARIABLES QUE PARA MODIFICAR LO QUE MUESTRA EL CARRITO
const carrito = document.getElementById("carrito");
const lineaTotal = document.getElementById("totalCarr");
let verCarrito = `<p class="vacio">Su carrito está vacío</p>`;
let pedidoTJSON;
let total = 0;
carrito.innerHTML = verCarrito;


// FUNCION PARA METER LOS PEDIDOS DE LOS USUARIOS EN EL ARRAY 
// Y MOSTRARLO EN LA SECCION CARRITO CUANDO DEN CLICK A "AÑADIR AL CARRITO"
function addCarrito() {
    total = 0;
    verCarrito = " ";
    for (let i = 0; i < productos.length; i++) {
        let pedido = document.getElementById(i).value;
        pedidoT[i] = [pedido];
    } 

    // acumular el array de pedidos en el localstorage para poder recuperarlo 
    // si al usuario se le cayo la pagina antes de poder abonar la compra
    pedidoTJSON = JSON.stringify(pedidoT)
    localStorage.setItem("pedidos", pedidoTJSON)

    productos.forEach((prop)=> { 
        if (pedidoT[prop.id] > 0) {
            verCarrito += 
            document.getElementById("carrito").innerHTML = 
            `<div class="detalle">
            <p class="col-8 cantidad">${pedidoT[prop.id]} ${prop.tipo} de ${prop.sab}</p>
            <p class="col-4 precio">$ ${pedidoT[prop.id] *prop.precio}</p>
            </div>`;

            total += ((pedidoT[prop.id]) * (prop.precio))

        }
    })
    carrito.innerHTML = verCarrito;
    lineaTotal.innerHTML = 
    `<div class="detalle">
    <p class="col-8 cantidad">TOTAL</p>
    <p class="col-4 precio">$ ${total}</p>
    </div>`

}

// PARA LIMPIAR EL CARRITO
function limpiar() { 
    localStorage.clear();
    verCarrito = `<p class="vacio">Su carrito está vacío</p>`;
    carrito.innerHTML = verCarrito;
    lineaTotal.innerHTML = " ";

}
document.getElementById("limpCarr").addEventListener("click", limpiar);

// RECUPERAR EL CARRITO CON LOCALSTORAGE 
function recuperarCarr() {
    let traerLS = JSON.parse(localStorage.getItem("pedidos"));
    
    if (traerLS){
        pedidoT = traerLS;
        verCarrito = " ";

        productos.forEach((prop)=> { 
            if (pedidoT[prop.id] > 0) {
                verCarrito += 
                document.getElementById("carrito").innerHTML = 
                `<div class="detalle">
                <p class="col-8 cantidad">${pedidoT[prop.id]} ${prop.tipo} de ${prop.sab}</p>
                <p class="col-4 precio">$ ${pedidoT[prop.id] *prop.precio}</p>
                </div>`;

                total += ((pedidoT[prop.id]) * (prop.precio))

                carrito.innerHTML = verCarrito;
                document.getElementById("totalCarr").innerHTML = 
                `<div class="detalle">
                <p class="col-8 cantidad">TOTAL</p>
                <p class="col-4 precio">$ ${total}</p>
                </div>`
            
            }
        })
    }
}
 
// PARA PAGAR LO QUE HAY EN EL CARRITO
function pagar() {
    if (pedidoT.reduce((a,b)=>{a+b},0) == 0) {
        alert("Su carrito está vacío")
    }
    else {
        limpiar();

        alert("El valor total de su compra es $" + total)

        alert("Por el momento, el unico medio de cobro del que disponemos es por transferencia.\nA continuación le mostraremos los datos de la cuenta.\nDisculpe las moelstias.")

        alert("-Alias: cheff.gina\n-CBU: 1234567890098765432112\n-Titular: Cheff Gina\n-CUIT: 27-12345678-9")
        
        alert("Muchas gracias por su compra!\nQue lo disfrute!")
    }
}
document.getElementById("btnPago").addEventListener("click", pagar);
