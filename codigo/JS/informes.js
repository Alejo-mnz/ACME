


var app;

try {
    app = angular.module("inventarioApp");
} catch (e) {
    app = angular.module("inventarioApp", []);
}

app.controller("reportesCtrl", function ($scope) {

    $scope.reportes = JSON.parse(localStorage.getItem("reportes")) || [];

    var hoy = new Date();
    hoy.setHours(0,0,0,0);


    /* GENERAR REPORTE */

    $scope.generarReporte = function () {

        if (!$scope.tipo || !$scope.fechaInicio || !$scope.fechaFin) {
            alert("Seleccione tipo de reporte y rango de fechas");
            return;
        }

        var nuevo = {

            tipo: $scope.tipo,
            fechaInicio: $scope.fechaInicio,
            fechaFin: $scope.fechaFin,
            fechaGenerado: new Date().toLocaleDateString()

        };

        $scope.reportes.push(nuevo);

        localStorage.setItem("reportes", JSON.stringify($scope.reportes));

        alert("Reporte generado correctamente");

        $scope.tipo = "";
        $scope.fechaInicio = "";
        $scope.fechaFin = "";
    };


    /* FILTRAR REPORTES ACTIVOS */

    $scope.reportesActivos = function () {

        return $scope.reportes.filter(function (r) {

            var fechaFin = new Date(r.fechaFin);
            fechaFin.setHours(0,0,0,0);

            return fechaFin >= hoy;

        });

    };


    /* FILTRAR HISTORICOS */

    $scope.reportesHistoricos = function () {

        return $scope.reportes.filter(function (r) {

            var fechaFin = new Date(r.fechaFin);
            fechaFin.setHours(0,0,0,0);

            return fechaFin < hoy;
        });

    };


    /* EXPORTAR PDF */

    $scope.exportarPDF = function () {

        alert("El reporte ha sido exportado a PDF");

    };


    /* DESCARGAR */

    $scope.descargar = function () {

        alert("El reporte se descargó correctamente");

    };


    /* MINI REPORTES */

    $scope.generarMiniReporte = function (nombre) {

        alert("Reporte '" + nombre + "' generado");

    };

});
