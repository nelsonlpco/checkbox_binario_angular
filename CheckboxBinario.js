/*
 CheckboxBinario v1
 (c) 2016-2016 Nelson Luiz Prado Canabarro de Oliveira
 License: MIT
*/
(function() {

    var link = function(scope, element, attrs) {
        var binario = scope.modelo.toString(2).split('').reverse();
        var opcoes = scope.opcoes.split(';');
        var opcoesLength = opcoes.length;
        var i = 0;
        var valor = 1;
        var binarioLength = binario.length;
        var checked = false;
        var self = scope;
        for (; i < opcoesLength; i++) {
            if (i < binarioLength) {
                if (binario[i] === "1") {
                    checked = true;
                }
            }
            var ckb = document.createElement('input');
            ckb.setAttribute('type', 'checkbox');
            ckb.setAttribute('name', 'tipo');
            ckb.setAttribute('value', valor);
            ckb.setAttribute('id', scope.identificador + valor);
            if (checked) {
                ckb.setAttribute('checked', 'checked');
            }
            ckb.addEventListener('click', function(e) {
                if (e.target.checked)
                    scope.modelo += parseInt(e.target.value);
                else
                    scope.modelo -= parseInt(e.target.value);
                scope.$apply();
            });
            element.append(ckb);
            element.append('<label for="' + scope.identificador + valor + '">' + opcoes[i] + '</label>');
            checked = false;
            valor *= 2;
        }
    };

    var diretiva = function() {
        return {
            restrict: 'E',
            link: link,
            template: '<div class="row"></div>',
            scope: {
                opcoes: '@',
                modelo: '=',
                identificador: '@'
            }
        };
    };

    angular.module("checkboxBinario", [])
        .directive("checkboxBinario", diretiva);
}());
