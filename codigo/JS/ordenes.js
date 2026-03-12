var app = angular.module("inventarioApp", []);

app.controller("ordenesCtrl", function ($scope) {

    /* ================================
    ORDENES INICIALES
    ================================ */

    var ordenesIniciales = [

        {
            codigo: "OT-2026-001",
            fecha: "04/02/2026",
            cliente: "María González",
            estado: "En Proceso",
            descripcion: "Instalación de equipo de cómputo",
            observaciones: "Coordinar fecha de instalación"
        }

    ];


    /* ================================
    CARGAR CLIENTES
    ================================ */

    if (localStorage.getItem("clientes")) {
        $scope.clientes = JSON.parse(localStorage.getItem("clientes"));
    } else {
        $scope.clientes = [];
    }


    /* ================================
    ESTADOS DISPONIBLES
    ================================ */

    $scope.estados = [
        "Pendiente",
        "En Proceso",
        "Finalizada"
    ];


    /* ================================
    CARGAR ORDENES
    ================================ */

    if (localStorage.getItem("ordenes")) {

        $scope.ordenes = JSON.parse(localStorage.getItem("ordenes"));

    } else {

        $scope.ordenes = ordenesIniciales;

        localStorage.setItem("ordenes", JSON.stringify($scope.ordenes));

    }


    /* ================================
    NUEVA ORDEN
    ================================ */

    $scope.nuevaOrden = {};


    /* ================================
    GENERAR CODIGO
    ================================ */

    function generarCodigo() {

        var numero = $scope.ordenes.length + 1;

        return "OT-2026-" + ("000" + numero).slice(-3);

    }


    /* ================================
    CREAR ORDEN
    ================================ */

    $scope.crearOrden = function () {

        var o = $scope.nuevaOrden;


        /* VALIDACIONES */

        if (!o.cliente ||
            !o.descripcion) {

            alert("Los campos obligatorios deben completarse");

            return;

        }


        /* CREAR ORDEN */

        $scope.ordenes.push({

            codigo: generarCodigo(),
            fecha: new Date().toLocaleDateString(),
            cliente: o.cliente,
            estado: o.estado || "Pendiente",
            descripcion: o.descripcion,
            observaciones: o.observaciones || ""

        });


        /* GUARDAR */

        localStorage.setItem("ordenes", JSON.stringify($scope.ordenes));

        alert("Orden creada correctamente");


        /* LIMPIAR FORM */

        $scope.nuevaOrden = {};


        /* CERRAR MODAL */

        window.location.hash = "";

    };



    /* ================================
    VER ORDEN
    ================================ */

    $scope.verOrden = function (o) {

        $scope.ordenSeleccionada = angular.copy(o);

        window.location.hash = "modalVerOrden";

    };



    /* ================================
    EDITAR ORDEN
    ================================ */

    $scope.editarOrden = function (o) {

        $scope.ordenEdit = angular.copy(o);

        window.location.hash = "modalEditarOrden";

    };



    /* ================================
    GUARDAR EDICION
    ================================ */

    $scope.guardarOrden = function () {

        var o = $scope.ordenEdit;


        /* VALIDACION */

        if (!o.cliente ||
            !o.descripcion) {

            alert("Los campos obligatorios deben completarse");

            return;

        }


        /* ACTUALIZAR */

        for (var i = 0; i < $scope.ordenes.length; i++) {

            if ($scope.ordenes[i].codigo === o.codigo) {

                $scope.ordenes[i] = angular.copy(o);

                break;

            }

        }


        /* GUARDAR */

        localStorage.setItem("ordenes", JSON.stringify($scope.ordenes));

        alert("Orden actualizada");

        window.location.hash = "";

    };



    /* ================================
    ELIMINAR ORDEN
    ================================ */

    $scope.eliminarOrden = function (codigo) {

        if (confirm("¿Eliminar esta orden?")) {

            $scope.ordenes = $scope.ordenes.filter(function (o) {

                return o.codigo !== codigo;

            });

            localStorage.setItem("ordenes", JSON.stringify($scope.ordenes));

        }

    };


});
