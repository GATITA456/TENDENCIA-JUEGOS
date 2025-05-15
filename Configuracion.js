const productosAdultos = [
  {
    nombre: "Blusa de tira + short",
    precio: 20,
    imagen: "img/1m.jpeg",
    tallas: ["S", "M", "L"]
  },
  {
    nombre: "Conjuntos para niña deportivo",
    precio: 40,
    imagen: "img/2m.jpeg",
    tallas: ["S", "M", "L"]
  },
  {
    nombre: "Top + short",
    precio: 18,
    imagen: "img/3m.jpeg",
    tallas: ["M", "L", "XL"]
  },
  {
    nombre: "Patins",
    precio: 5,
    imagen: "img/4m.jpeg",
    tallas: ["S", "M", "L", "XL"]
  },
  {
    nombre: "Conjutos elegante",
    precio: 35,
    imagen: "img/5m.jpeg",
    tallas: ["S", "M", "L"]
  },
  {
    nombre: "Conjunto plisado",
    precio: 35,
    imagen: "img/6m.jpeg",
    tallas: ["S", "M", "L", "XL"]
  },
  {
    nombre: "Camisa para hombre",
    precio: 10,
    imagen: "img/19m.jpeg",
    tallas: ["M", "L", "XL"]
  },
  {
    nombre: "Palazo",
    precio: 15,
    imagen: "img/20m.jpeg",
    tallas: ["S", "M", "L"]
  },
  {
    nombre: "Conjuto para varones",
    precio: 20,
    imagen: "img/21m.jpeg",
    tallas: ["S", "M", "L", "XL"]
  }
];

const productosInfantil = [
  {
    nombre: "Mansion para niñas",
    precio: 10,
    imagen: "img/7m.jpeg",
    tallas: ["1"]
  },
  {
    nombre: "Linterna de hologramas - Animales",
    precio: 5,
    imagen: "img/8m.jpeg",
    tallas: ["1"]
  },
  {
    nombre: "Computadora unisex de juguetes - Laptop",
    precio: 30,
    imagen: "img/9m.jpeg",
    tallas: ["1"]
  },
  {
    nombre: "Muñeca de latex real para niñas",
    precio: 45,
    imagen: "img/10m.jpeg",
    tallas: ["1"]
  },

    {
    nombre: "Lego unisex",
    precio: 10,
    imagen: "img/11m.jpeg",
    tallas: ["1"]
  },
  {
    nombre: "Pistola de burbujas",
    precio: 17,
    imagen: "img/12m.jpeg",
    tallas: ["1"]
  },
  {
    nombre: "Cocodrilo Trampa",
    precio: 19.50,
    imagen: "img/13m.jpeg",
    tallas: ["1"]
  },
  {
    nombre: "Chichubelo - Animalitos",
    precio: 13.50,
    imagen: "img/14m.jpeg",
    tallas: ["1"]
  },
    {
    nombre: "DinoCamara",
    precio: 23,
    imagen: "img/15m.jpeg",
    tallas: ["1"]
  }
];

const catalogoAdultos = document.querySelector("#catalogo");
const catalogoInfantil = document.querySelector("#infantil");
const listaCarrito = document.getElementById("lista-carrito");
const contador = document.getElementById("contador");

let carrito = [];

function crearProductoCard(producto) {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `
    <img src="${producto.imagen}?auto=format&fit=crop&w=400&q=80" alt="${producto.nombre}">
    <div class="info">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toFixed(2)}</p>
      <select aria-label="Seleccionar talla">${producto.tallas.map(t => `<option value="${t}">${t}</option>`).join("")}</select>
      <button>Agregar al carrito</button>
    </div>
  `;

  const boton = div.querySelector("button");
  const selectTalla = div.querySelector("select");

  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.nombre, producto.precio, selectTalla.value);
  });

  return div;
}

function cargarCatalogo(catalogoElement, productos) {
  productos.forEach(producto => {
    const card = crearProductoCard(producto);
    catalogoElement.appendChild(card);
  });
}

function agregarAlCarrito(nombre, precio, talla) {
  carrito.push({ nombre, precio, talla });
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} (Talla: ${item.talla}) - $${item.precio.toFixed(2)}`;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "x";
    botonEliminar.style.marginLeft = "10px";
    botonEliminar.style.background = "#e63946";
    botonEliminar.style.color = "#fff";
    botonEliminar.style.border = "none";
    botonEliminar.style.borderRadius = "3px";
    botonEliminar.style.cursor = "pointer";
    botonEliminar.style.fontWeight = "bold";
    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    });

    li.appendChild(botonEliminar);
    listaCarrito.appendChild(li);
  });
  contador.textContent = carrito.length;
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  // Mostrar modal en lugar de alert
  abrirModal();
}

function abrirModal() {
  const modal = document.getElementById("modal-compra");
  modal.style.display = "block";
}

function cerrarModal() {
  const modal = document.getElementById("modal-compra");
  modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById("modal-compra");
  if (event.target === modal) {
    cerrarModal();
  }
}

function vaciarCarrito() {
  if(carrito.length === 0){
    alert("El carrito ya está vacío.");
    return;
  }
  if(confirm("¿Seguro que quieres vaciar el carrito?")){
    carrito = [];
    actualizarCarrito();
  }
}

// Carga inicial de los catálogos
cargarCatalogo(catalogoAdultos, productosAdultos);
cargarCatalogo(catalogoInfantil, productosInfantil);
