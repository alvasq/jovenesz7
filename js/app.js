$("#liveToastBtn").hide();
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
    })
}
function ordenar() {
    var puntos1 = this.productos.sort(((a, b) => b.puntos - a.puntos));
    return puntos1
}
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope) {
    $scope.password = localStorage.getItem("pass");
    $scope.edit=false;
    $scope.Admin = false;
    $scope.insert = false;
    $scope.punteos = false;
    $scope.Nombres = [];

   
    $scope.data = [
        {
            "nombre": "caba\u00f1a1",
            "puntos": 0,
            "Id": 1,
            "code":"w12023"
        },
        {
            "nombre": "caba\u00f1a2",
            "puntos": 0,
            "Id": 2,
            "code":"w22023"
        },
        {
            "nombre": "caba\u00f1a3",
            "puntos": 0,
            "Id": 3,
            "code":"w32023"
        },
        {
            "nombre": "caba\u00f1a4",
            "puntos": 0,
            "Id": 4,
            "code":"m12023"
        },
        {
            "nombre": "caba\u00f1a5",
            "puntos": 0,
            "Id": 5,
            "code":"m22023"
        },
        {
            "nombre": "caba\u00f1a6",
            "puntos": 0,
            "Id": 6,
            "code":"m32023"
        }
    ]

    $scope.$watch("password", function () {
        localStorage.setItem("pass", $scope.password);
        if ($scope.password == "chechal" || $scope.password == "alanv") {
            $scope.edit=true;
            $scope.Admin = false;
            $scope.insert = true;
        }
    });
    $scope.leer = function () {
        fetch('datos.json')
            .then(response => response.json())
            .then(data => {
                $scope.data=data;
                console.log($scope.data)
            });
    }
    $scope.leer();
    $scope.resetear = function () {

        swal({
            buttons: {
                cancel: {
                    text: "Cancelar",
                    value: false,
                    visible: true,
                    className: "",
                    closeModal: true,
                },
                confirm: {
                    text: "Confirmar",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            },
            title: "Resetearas todos los punteos",
            text: "seguro que deseas resetear?",
            icon: "warning",
            dangerMode: true,
        },)

            .then((crear) => {
                if (crear) {


                    if ($scope.password == "chechal" || $scope.password == "alanv") {
                    $scope.data.forEach(element => {
                            element.puntos=0;
                        });
                        $scope.Guardar($scope.data, "delete")
                    }

                }
            });
    }

    $scope.Guardar = function (a, b) {
        var x = 2
        $
        fetch('guardar.php', {
            method: 'POST',
            body: JSON.stringify(a)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success)// muestra la respuesta del servidor en la consola
                {
                    if (b == "delete") {
                        localStorage.setItem("pass", "");
                        window.location.reload();
                    } else if (b = "punteo") {
                        $("#liveToastBtn").click();
                        $("#code").focus();
                    }
                }
            });
        return x
    }
    $scope.validar = function (type) {
        $scope.Admin = true;
        $scope.punteos = false;
        if ($scope.password == "chechal" || $scope.password == "alanv") {
            $scope.Admin = false;
            $scope.insert = true;
        }
    }
    $scope.insertar = function (e) {
        if (e.charCode == 13) {
            var indice =$scope.data.findIndex((element) => element.code == $scope.codigo);
            console.log(indice)
            $scope.data[indice].puntos+=10;
            $scope.Guardar($scope.data, "punteo");
            $scope.codigo = "";

        }


    }

    $scope.generarpunteos = function () {
        $scope.leer();
        $scope.punteos = true;
        productos = $scope.data;
        $scope.punteos2 = ordenar();
        console.log($scope.punteos)

    }




});

