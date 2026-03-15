
var app;

try {
    app = angular.module("inventarioApp");
} catch (e) {
    app = angular.module("inventarioApp", []);
}

app.controller("cotizacionesCtrl", function ($scope) {

    $scope.productos = JSON.parse(localStorage.getItem("productos")) || [];

    $scope.clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    $scope.cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];

    $scope.cotizacion  = { items: [] };

    $scope.item = {};

    $scope.subtotal = 0;
    $scope.iva = 0;
    $scope.total = 0;


    /* CONTAR ITEMS REALES */

    $scope.totalItems = function (items) {

        let total = 0;

        items.forEach(function (i) {

            total += parseInt(i.cantidad);

        });

        return total;

    };



    $scope.agregarItem = function () {

        if (!$scope.item.producto || !$scope.item.cantidad) {

            alert("Seleccione producto y cantidad");
            return;

        }

        var prod = $scope.item.producto;

        var precio = prod.precioEntrada || prod.precioSalida || 0;

        var descuento = $scope.item.descuento || 0;

        var subtotalItem = precio * $scope.item.cantidad;

        var valorDescuento = subtotalItem * (descuento / 100);

        var totalItem = subtotalItem - valorDescuento;

        $scope.cotizacion.items.push({

            producto: prod.nombre,
            cantidad: $scope.item.cantidad,
            precio: precio, 
            descuento: descuento,
            total: totalItem

        });

        $scope.item = {};

        calcular();

    };



    function calcular() {

        $scope.subtotal = 0;

        $scope.cotizacion.items.forEach(function (i) {
            $scope.subtotal += i.total;
        });

        $scope.iva = $scope.subtotal * 0.19; /* añadir d.to */

        $scope.total = $scope.subtotal + $scope.iva; /* añadir d.to */

    }



    $scope.guardarCotizacion = function () {

        if (!$scope.cotizacion.cliente) {

            alert("Seleccione cliente");
            return;

        }

        if ($scope.cotizacion.items.length === 0) {

            alert("Agregue productos");
            return;

        }

        var nueva = {

            codigo: "COT-" + Date.now(),

            fecha: new Date().toLocaleDateString(),

            cliente: $scope.cotizacion.cliente,

            items: $scope.cotizacion.items,

            subtotal: $scope.subtotal,

            iva: $scope.iva,

            total: $scope.total,

            observaciones: $scope.cotizacion.observaciones

        };

        $scope.cotizaciones.push(nueva);

        localStorage.setItem("cotizaciones", JSON.stringify($scope.cotizaciones));

        alert("Cotización registrada");

        $scope.cotizacion = { items: [] };

        $scope.subtotal = 0;
        $scope.iva = 0;
        $scope.total = 0;

    };



    $scope.verCotizacion = function (c) {

        $scope.cotizacionver = angular.copy(c);

    };



    $scope.eliminarCotizacion = function (index) {

        if (confirm("¿Eliminar cotización?")) {

            $scope.cotizaciones.splice(index, 1);

            localStorage.setItem("cotizaciones", JSON.stringify($scope.cotizaciones));

        }

    };



    $scope.editarCotizacion = function (c) {

        $scope.cotizacion = angular.copy(c);
        $scope.cotizacion.codigo = c.codigo;
        
        $scope.subtotal = c.subtotal;
        $scope.iva = c.iva;
        $scope.total = c.total;

        window.location.hash = "editarCotizacion1";

    };


    $scope.eliminarItem = function (index) {

    $scope.cotizacion.items.splice(index, 1);

    calcular();

    };

    $scope.imprimirCotizacion = function () {

    window.print();

    };





    $scope.recalcularEdicion = function () {

    $scope.cotizacion.items.forEach(function(i){

        var subtotalItem = i.precio * i.cantidad;

        var desc = subtotalItem * (i.descuento / 100);

        i.total = subtotalItem - desc;

    });

    calcular();

    };




    $scope.guardarEdicion = function () {

    for (var i = 0; i < $scope.cotizaciones.length; i++) {

    if ($scope.cotizaciones[i].codigo === $scope.cotizacion.codigo) {

        $scope.cotizaciones[i] = angular.copy($scope.cotizacion);

        break;

    }

    }

    localStorage.setItem("cotizaciones", JSON.stringify($scope.cotizaciones));

    alert("Cotización actualizada");

    window.location.hash = "";

    };




});
