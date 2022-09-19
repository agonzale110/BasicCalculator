$(document).ready(function()    {
    $('#miCalculadora').modal('show');
    $('#miCalculadora').on('hide.bs.modal', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    const calculatorApp = {
        firstNumber: 0,
        secondNumber: 0,
        operation: undefined,

        getActualNumber: function() {
            if (this.operation) return this.secondNumber;
            return this.firstNumber;
        },
        setActualNumber: function(newNumber) {
            if (this.operation)
                this.secondNumber = newNumber;
            else
                this.firstNumber = newNumber;
        },
        addToActualNumber: function(numberToAdd) {
            const actualNumber = this.getActualNumber();
            this.setActualNumber(actualNumber == '0' ? numberToAdd : actualNumber + (+numberToAdd));
        },
        setOperation: function(newOp) {
            this.operation = newOp;
        },
        changeSign: function() {
            const actualNumber = this.getActualNumber();
            if (actualNumber == '0') return;
            
            this.setActualNumber(actualNumber.includes('-') ? actualNumber.replace('-', '') : '-'+actualNumber);
        },
        addComma: function() {
            const actualNumber = this.getActualNumber();
            if (actualNumber.includes(',')) return;

            this.setActualNumber(actualNumber += ',');
        },
        resetCalc: function() {
            this.firstNumber = '0';
            this.secondNumber = '0';
            this.operation = undefined;
        },
        operations: {
            '+': function (x, y) { return (+x.replace(',', '.')) + (+y.replace(',', '.')) },
            '-': function (x, y) { return (+x.replace(',', '.')) - (+y.replace(',', '.')) },
            'x': function (x, y) { return (+x.replace(',', '.')) * (+y.replace(',', '.')) },
            '÷': function (x, y) { return (+x.replace(',', '.')) / (+y.replace(',', '.')) },
        },
        doOperation: function() {
            this.firstNumber = (this.operation ? String(this.operations[this.operation](this.firstNumber, this.secondNumber)).replace('.', ',') : this.firstNumber);
            this.secondNumber = '0';
            this.operation = undefined;
        }
    };

    const updateResultado = (valor) => {
        $('#resultado').attr("title",valor);
        $('#resultado').html(valor);
    }

    $( "button" ).click(function(e) {
        switch (e.target.innerText) {
            case ',':
                calculator.addComma();
                break;
            case '+/-':
                calculator.changeSign();
                break;
            case 'C':
                calculator.setActualNumber('0');
                break;
            case 'AC':
                calculator.resetCalc();
                break;
            case '=':
                calculator.doOperation();
                break;
            default:
                if (isNaN(e.target.innerText)) {
                    calculator.setOperation(e.target.innerText);
                    return;
                }
                calculator.addToActualNumber(e.target.innerText);
                break;
        }
        updateResultado(calculator.getActualNumber());
    });
});
