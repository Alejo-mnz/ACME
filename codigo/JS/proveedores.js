var app = angular.module("acmeApp", []);

app.controller("proveedoresController", function ($scope) {

    /* PROVEEDORES INICIALES */

    if (!localStorage.getItem("proveedores")) {

        localStorage.setItem("proveedores", JSON.stringify([

            {
                nombre: "Distribuidora Nacional",
                documento: "900111222-3",
                email: "ventas@distrinacional.com",
                telefono: "3001112233",
                direccion: "Zona Industrial Calle 13",
                ciudad: "Bogotá"
            },

            {
                nombre: "Importadora Tech",
                documento: "900333444-5",
                email: "importaciones@techimport.com",
                telefono: "3112223344",
                direccion: "Zona Industrial",
                ciudad: "Cali"
            }

        ]))

    }

    $scope.proveedores = JSON.parse(localStorage.getItem("proveedores"));

    /* GUARDAR */

    function guardar() {

        localStorage.setItem(
            "proveedores",
            JSON.stringify($scope.proveedores)
        )

    }

    /* AGREGAR */

    $scope.agregarProveedor = function () {

        if (!$scope.nuevo ||
            !$scope.nuevo.nombre ||
            !$scope.nuevo.documento ||
            !$scope.nuevo.email ||
            !$scope.nuevo.telefono ||
            !$scope.nuevo.direccion ||
            !$scope.nuevo.ciudad) {

            alert("Todos los campos son obligatorios");
            return;

        }

        /* VALIDAR NIT */

        let existe = $scope.proveedores.find(p => p.documento == $scope.nuevo.documento)

        if (existe) {

            alert("Ya existe un proveedor con ese NIT");
            return;

        }

        $scope.proveedores.push(angular.copy($scope.nuevo));

        guardar();

        $scope.nuevo = {};

        location.href = "#";

    }

    /* SELECCIONAR */

    $scope.seleccionarProveedor = function (p) {

        $scope.proveedorEditar = p;

    }

    /* EDITAR */

    $scope.editarProveedor = function () {

        if (!$scope.proveedorEditar.nombre ||
            !$scope.proveedorEditar.documento ||
            !$scope.proveedorEditar.email ||
            !$scope.proveedorEditar.telefono ||
            !$scope.proveedorEditar.direccion ||
            !$scope.proveedorEditar.ciudad) {

            alert("Todos los campos son obligatorios");
            return;

        }

        guardar();

        location.href = "#";

    }

    /* ELIMINAR */

    $scope.eliminarProveedor = function () {

        let index = $scope.proveedores.indexOf($scope.proveedorEditar);

        $scope.proveedores.splice(index, 1);

        guardar();

        location.href = "#";

    }

});
