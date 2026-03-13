var app = angular.module("inventarioApp", []);

app.controller("categoriasCtrl", function ($scope) {


    /* ================================
    CATEGORÍAS INICIALES
    ================================ */

    var categoriasIniciales = [

        {
            nombre: "Electrónica",
            descripcion: "Productos electrónicos"
        },

        {
            nombre: "Ferretería",
            descripcion: "Herramientas y materiales"
        },

        {
            nombre: "Oficina",
            descripcion: "Suministros de oficina"
        },

        {
            nombre: "Hogar",
            descripcion: "Artículos para el hogar"
        }

    ];


    /* ================================
    CARGAR LOCALSTORAGE
    ================================ */

    if (localStorage.getItem("categorias")) {

        $scope.categorias = JSON.parse(localStorage.getItem("categorias"));

    } else {

        $scope.categorias = categoriasIniciales;

        localStorage.setItem("categorias", JSON.stringify($scope.categorias));

    }




    /* ================================
    NUEVA CATEGORIA
    ================================ */

    $scope.nuevoCategoria = {};

    /* ================================
    AGREGAR CATEGORIA
    ================================ */

    $scope.agregarCategoria = function () {

        var c = $scope.nuevoCategoria;


        /* VALIDACIONES */

        if (!c.nombre ||
            !c.descripcion) {

            alert("Todos los campos son obligatorios");

            return;

        }

        /* VALIDAR NOMBRE UNICO */

        var existe = $scope.categorias.find(function (cli) {

            return cli.nombre === c.nombre;

        });

        if (existe) {

            alert("Ya existe una Categoría con ese nombre");

            return;

        }


        /* AGREGAR CATEGORÍA */

        $scope.categorias.push({

            nombre: c.nombre,
            descripcion: c.descripcion

        });


        /* GUARDAR */

        localStorage.setItem("categorias", JSON.stringify($scope.categorias));

        alert("Categoría agregada correctamente");


        /* LIMPIAR FORM */

        $scope.nuevoCategoria = {};


        /* CERRAR MODAL */

        window.location.hash = "";

    };




    /* ================================
    VER / EDITAR CATEGORIA
    ================================ */

    $scope.editarCategoria = function (c) {

        $scope.categoriaEdit = angular.copy(c);

        window.location.hash = "editarCategoria1";

    };


    /* ================================
    GUARDAR EDICION
    ================================ */

    $scope.guardarEdicionCategoria = function () {

        var c = $scope.categoriaEdit;


        /* VALIDACIONES */

        if (!c.nombre ||
            !c.descripcion) {

            alert("Todos los campos son obligatorios");

            return;

        }


        /* ACTUALIZAR CATEGORIA */

        for (var i = 0; i < $scope.categorias.length; i++) {

            if ($scope.categorias[i].nombre === c.nombre) {

                $scope.categorias[i] = angular.copy(c);

                break;

            }

        }


        /* GUARDAR */

        localStorage.setItem("categorias", JSON.stringify($scope.categorias));

        alert("Categoría actualizada correctamente");

        window.location.hash = "";

    };




    /* ================================
    ELIMINAR CATEGORÍA
    ================================ */

    $scope.categoriaEliminar = null;

    $scope.confirmarEliminar = function (c) {

        $scope.categoriaEliminar = c;

        window.location.hash = "eliminarCategoria1";

    };

    $scope.eliminarCategoria = function () {

        $scope.categorias = $scope.categorias.filter(function (c) {

            return c.nombre !== $scope.categoriaEliminar.nombre;

        });

        localStorage.setItem("categorias", JSON.stringify($scope.categorias));

        alert("Categoría eliminada");

        window.location.hash = "";

    };

});



