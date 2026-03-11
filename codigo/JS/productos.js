var app = angular.module("inventarioApp", []);

app.controller("productosCtrl", function($scope){

/* ================================
PRODUCTOS INICIALES
================================ */

var productosIniciales = [

{
codigo:"PROD-001",
nombre:"Taladro Eléctrico",
categoria:"Ferretería",
ubicacion:"Bodega",
unidad:"Unidad",
presentacion:"Caja",
precioEntrada:180000,
precioSalida:280000,
cantidadInicial:20,
cantidadActual:5,
cantidadMinima:10,
descripcion:"Taladro percutor 1/2 850W"
},

{
codigo:"PROD-002",
nombre:"Laptop HP Pavilion",
categoria:"Electrónica",
ubicacion:"Vitrina",
unidad:"Unidad",
presentacion:"Caja",
precioEntrada:2500000,
precioSalida:3200000,
cantidadInicial:15,
cantidadActual:12,
cantidadMinima:5,
descripcion:"Laptop HP Pavilion 15 pulgadas"
},

{
codigo:"PROD-003",
nombre:"Resma Papel Carta",
categoria:"Oficina",
ubicacion:"Bodega",
unidad:"Resma",
presentacion:"Paquete",
precioEntrada:12000,
precioSalida:18000,
cantidadInicial:50,
cantidadActual:8,
cantidadMinima:20,
descripcion:"Resma de papel tamaño carta"
},

{
codigo:"PROD-004",
nombre:"Mouse Inalámbrico",
categoria:"Electrónica",
ubicacion:"Vitrina",
unidad:"Unidad",
presentacion:"Caja",
precioEntrada:25000,
precioSalida:40000,
cantidadInicial:60,
cantidadActual:35,
cantidadMinima:15,
descripcion:"Mouse inalámbrico USB"
},

{
codigo:"PROD-005",
nombre:"Lámpara LED",
categoria:"Hogar",
ubicacion:"Vitrina",
unidad:"Unidad",
presentacion:"Caja",
precioEntrada:8000,
precioSalida:15000,
cantidadInicial:100,
cantidadActual:18,
cantidadMinima:50,
descripcion:"Lámpara LED blanca"
}

];

/* ================================
LISTAS DE OPCIONES
================================ */

$scope.categorias = [
"Electrónica",
"Ferretería",
"Oficina",
"Hogar"
];

$scope.ubicaciones = [
"Bodega",
"Vitrina"
];


/* ================================
CARGAR LOCALSTORAGE
================================ */

if(localStorage.getItem("productos")){

$scope.productos = JSON.parse(localStorage.getItem("productos"));

}else{

$scope.productos = productosIniciales;

localStorage.setItem("productos",JSON.stringify($scope.productos));

}


/* ================================
NUEVO PRODUCTO
================================ */

$scope.nuevo = {};


/* ================================
AGREGAR PRODUCTO
================================ */

$scope.agregarProducto = function(){

var p = $scope.nuevo;

/* VALIDACIONES */

if(!p.codigo || !p.nombre || !p.categoria ||
!p.ubicacion || !p.unidad || !p.presentacion ||
!p.precioEntrada || !p.precioSalida ||
!p.cantidadInicial || !p.cantidadActual ||
!p.cantidadMinima){

alert("Todos los campos obligatorios deben completarse");

return;

}


/* VALIDAR CODIGO UNICO */

var existe = $scope.productos.find(function(prod){

return prod.codigo === p.codigo;

});

if(existe){

alert("El código del producto ya existe");

return;

}


/* AGREGAR */

$scope.productos.push({

codigo:p.codigo,
nombre:p.nombre,
categoria:p.categoria,
ubicacion:p.ubicacion,
unidad:p.unidad,
presentacion:p.presentacion,
precioEntrada:p.precioEntrada,
precioSalida:p.precioSalida,
cantidadInicial:p.cantidadInicial,
cantidadActual:p.cantidadActual,
cantidadMinima:p.cantidadMinima,
descripcion:p.descripcion

});


/* GUARDAR */

localStorage.setItem("productos",JSON.stringify($scope.productos));

alert("Producto agregado correctamente");

/* LIMPIAR */

$scope.nuevo = {};

/* CERRAR MODAL */

window.location.hash = "";

};


/* ================================
ELIMINAR PRODUCTO
================================ */

$scope.eliminarProducto = function(codigo){

if(confirm("¿Eliminar producto?")){

$scope.productos = $scope.productos.filter(function(p){

return p.codigo !== codigo;

});

localStorage.setItem("productos",JSON.stringify($scope.productos));

}

};


/* ================================
VER PRODUCTO
================================ */

$scope.verProducto = function(p){

$scope.productoSeleccionado = angular.copy(p);

window.location.hash = "verProd1";

};


/* ================================
EDITAR PRODUCTO
================================ */

$scope.editarProducto = function(p){

$scope.productoEdit = angular.copy(p);

window.location.hash = "editarProd1";

};


/* ================================
GUARDAR EDICION
================================ */

$scope.guardarEdicion = function(){

var p = $scope.productoEdit;

/* VALIDACIONES */

if(!p.nombre ||
!p.categoria ||
!p.ubicacion ||
!p.unidad ||
!p.precioSalida ||
!p.cantidadActual ||
!p.cantidadMinima){

alert("Todos los campos son obligatorios");

return;

}

/* ACTUALIZAR */

for(var i=0;i<$scope.productos.length;i++){

if($scope.productos[i].codigo === p.codigo){

$scope.productos[i] = angular.copy(p);
break;

}

}

/* GUARDAR */

localStorage.setItem("productos",JSON.stringify($scope.productos));

alert("Producto actualizado correctamente");

window.location.hash = "";

};

/* ================================
BUSQUEDA
================================ */

$scope.searchText = "";

});
