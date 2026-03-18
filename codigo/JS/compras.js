
var app;

try {
    app = angular.module("inventarioApp");
} catch (e) {
    app = angular.module("inventarioApp", []);
}

app.controller("comprasCtrl", function ($scope) {

    $scope.productos = JSON.parse(localStorage.getItem("productos")) || [];

    $scope.proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];

    $scope.compras = JSON.parse(localStorage.getItem("compras")) || [];

    $scope.compra = { items: [] };

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

        var totalItem = precio * $scope.item.cantidad;

        $scope.compra.items.push({

            producto: prod.nombre,
            cantidad: $scope.item.cantidad,
            precio: precio,
            total: totalItem

        });

        $scope.item = {};

        calcular();

    };



    function calcular() {

        $scope.subtotal = 0;

        $scope.compra.items.forEach(function (i) {
            $scope.subtotal += i.total;
        });

        $scope.iva = $scope.subtotal * 0.19;

        $scope.total = $scope.subtotal + $scope.iva;

    }



    $scope.guardarCompra = function () {

        if (!$scope.compra.proveedor) {

            alert("Seleccione proveedor");
            return;

        }

        if ($scope.compra.items.length === 0) {

            alert("Agregue productos");
            return;

        }

        var nueva = {

            codigo: "COMP-" + Date.now(),

            fecha: new Date().toLocaleDateString(),

            proveedor: $scope.compra.proveedor,

            items: $scope.compra.items,

            subtotal: $scope.subtotal,

            iva: $scope.iva,

            total: $scope.total,

            observaciones: $scope.compra.observaciones

        };

        $scope.compras.push(nueva);

        localStorage.setItem("compras", JSON.stringify($scope.compras));

        alert("Compra registrada");

        $scope.compra = { items: [] };

        $scope.subtotal = 0;
        $scope.iva = 0;
        $scope.total = 0;

    };



    $scope.verDetalle = function (c) {

        $scope.compraDetalle = angular.copy(c);

    };



    $scope.eliminarCompra = function (index) {

        if (confirm("¿Eliminar compra?")) {

            $scope.compras.splice(index, 1);

            localStorage.setItem("compras", JSON.stringify($scope.compras));

        }

    };



    $scope.editarCompra = function (c) {

        $scope.compra = angular.copy(c);

        $scope.subtotal = c.subtotal;
        $scope.iva = c.iva;
        $scope.total = c.total;

        window.location.hash = "modalNuevaCompra";

    };



    $scope.eliminarItem = function (index) {

    $scope.compra.items.splice(index, 1);

    calcular();

    };

});
