var app = angular.module("inventarioApp", []);

app.controller("clientesCtrl", function ($scope) {

    /* ================================
    CLIENTES INICIALES
    ================================ */

    var clientesIniciales = [

        {
            nombre: "Construcciones XYZ Ltda",
            documento: "900123456-7",
            email: "compras@xyz.com",
            telefono: "3101234567",
            direccion: "Calle 45 #23-12",
            ciudad: "Bogotá"
        },

        {
            nombre: "María González",
            documento: "52345678",
            email: "maria.gonzalez@email.com",
            telefono: "3209876543",
            direccion: "Cra 20 #15-10",
            ciudad: "Medellín"
        }

    ];


    /* ================================
    CARGAR LOCALSTORAGE
    ================================ */

    if (localStorage.getItem("clientes")) {

        $scope.clientes = JSON.parse(localStorage.getItem("clientes"));

    } else {

        $scope.clientes = clientesIniciales;

        localStorage.setItem("clientes", JSON.stringify($scope.clientes));

    }


    /* ================================
    NUEVO CLIENTE
    ================================ */

    $scope.nuevoCliente = {};


    /* ================================
    AGREGAR CLIENTE
    ================================ */

    $scope.agregarCliente = function () {

        var c = $scope.nuevoCliente;


        /* VALIDACIONES */

        if (!c.nombre ||
            !c.documento ||
            !c.email ||
            !c.telefono ||
            !c.direccion ||
            !c.ciudad) {

            alert("Todos los campos son obligatorios");

            return;

        }


        /* VALIDAR DOCUMENTO UNICO */

        var existe = $scope.clientes.find(function (cli) {

            return cli.documento === c.documento;

        });

        if (existe) {

            alert("Ya existe un cliente con ese documento");

            return;

        }


        /* AGREGAR CLIENTE */

        $scope.clientes.push({

            nombre: c.nombre,
            documento: c.documento,
            email: c.email,
            telefono: c.telefono,
            direccion: c.direccion,
            ciudad: c.ciudad

        });


        /* GUARDAR */

        localStorage.setItem("clientes", JSON.stringify($scope.clientes));

        alert("Cliente agregado correctamente");


        /* LIMPIAR FORM */

        $scope.nuevoCliente = {};


        /* CERRAR MODAL */

        window.location.hash = "";

    };



    /* ================================
    VER / EDITAR CLIENTE
    ================================ */

    $scope.editarCliente = function (c) {

        $scope.clienteEdit = angular.copy(c);

        window.location.hash = "editarCliente1";

    };



    /* ================================
    GUARDAR EDICION
    ================================ */

    $scope.guardarEdicionCliente = function () {

        var c = $scope.clienteEdit;


        /* VALIDACIONES */

        if (!c.nombre ||
            !c.documento ||
            !c.email ||
            !c.telefono ||
            !c.direccion ||
            !c.ciudad) {

            alert("Todos los campos son obligatorios");

            return;

        }


        /* ACTUALIZAR CLIENTE */

        for (var i = 0; i < $scope.clientes.length; i++) {

            if ($scope.clientes[i].documento === c.documento) {

                $scope.clientes[i] = angular.copy(c);

                break;

            }

        }


        /* GUARDAR */

        localStorage.setItem("clientes", JSON.stringify($scope.clientes));

        alert("Cliente actualizado correctamente");

        window.location.hash = "";

    };



    /* ================================
    ELIMINAR CLIENTE
    ================================ */

    $scope.clienteEliminar = null;

    $scope.confirmarEliminar = function (c) {

        $scope.clienteEliminar = c;

        window.location.hash = "eliminarCliente1";

    };


    $scope.eliminarCliente = function () {

        $scope.clientes = $scope.clientes.filter(function (c) {

            return c.documento !== $scope.clienteEliminar.documento;

        });

        localStorage.setItem("clientes", JSON.stringify($scope.clientes));

        alert("Cliente eliminado");

        window.location.hash = "";

    };



    /* ================================
    BUSQUEDA
    ================================ */

    $scope.searchCliente = "";

});
