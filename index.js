$(document).ready(function()    {
    $('#miCalculadora').modal('show');
    $('#miCalculadora').on('hide.bs.modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    let primerNumero = '0', segundoNumero = '0';
    let opSeleccionado;

    const hacerOperacion = {
        '+': function (x, y) { return (+x.replace(',', '.')) + (+y.replace(',', '.')) },
        '-': function (x, y) { return (+x.replace(',', '.')) - (+y.replace(',', '.')) },
        'x': function (x, y) { return (+x.replace(',', '.')) * (+y.replace(',', '.')) },
        '÷': function (x, y) { return (+x.replace(',', '.')) / (+y.replace(',', '.')) },
    };
    
    const cambiarSigno = (numero) => {
        if (numero.includes('-')) {
            return numero.replace('-', '');
        } else {
            return '-'+numero;
        }
    }

    const updateResultado = (valor) => {
        $('#resultado').attr("title",valor);
        $('#resultado').html(valor);
    }

    $( "button" ).click(function(e) {
        if (e.target.innerText == ',') {
            if (!opSeleccionado) {
                primerNumero = primerNumero+',';
                updateResultado(primerNumero);
            } else {
                segundoNumero = segundoNumero+',';
                updateResultado(segundoNumero);
            }
        } else if (e.target.innerText == '+/-') {
            if (!opSeleccionado) {
                if (primerNumero == '0')
                    return

                primerNumero = cambiarSigno(primerNumero);
                updateResultado(primerNumero);
            } else {
                if (segundoNumero == '0')
                    return

                segundoNumero = cambiarSigno(segundoNumero);
                updateResultado(segundoNumero);
            }
        } else if (e.target.innerText == 'C') {
            if (!opSeleccionado) {
                primerNumero = '0';
                updateResultado(primerNumero);
            } else {
                segundoNumero = '0';
                updateResultado(segundoNumero);
            }
        } else if (e.target.innerText == 'AC') {
            primerNumero = '0';
            segundoNumero = '0';
            opSeleccionado = undefined;
            updateResultado(primerNumero);
        } else if (e.target.innerText == '=') {
            primerNumero = (opSeleccionado ? String(hacerOperacion[opSeleccionado](primerNumero, segundoNumero)).replace('.', ',') : primerNumero);
            segundoNumero = '0';
            opSeleccionado = undefined;
            updateResultado(primerNumero);
        } else if (isNaN(e.target.innerText)) {
            opSeleccionado = e.target.innerText;
            updateResultado(segundoNumero);
        } else {
            if (opSeleccionado == undefined) {
                primerNumero = (primerNumero = '0' ? e.target.innerText : primerNumero + (+e.target.innerText));
                updateResultado(primerNumero);
            } else {
                segundoNumero = (segundoNumero == '0' ? e.target.innerText : segundoNumero + (+e.target.innerText));
                updateResultado(segundoNumero);
            }
        }
    });
});
