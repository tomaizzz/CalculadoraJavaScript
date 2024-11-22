document.addEventListener("DOMContentLoaded", () => {
    const visor = document.querySelector("#visor");
    let valorAtual = "";
    let valorAnterior = "";
    let operador = "";

    const atualizarVisor = (valor) => {
        visor.textContent = valor || "0";
    };

    const limpar = () => {
        valorAtual = "";
        valorAnterior = "";
        operador = "";
        atualizarVisor(valorAtual);
    };

    const calcular = () => {
        const numAnterior = parseFloat(valorAnterior);
        const numAtual = parseFloat(valorAtual);

        if (isNaN(numAnterior) || isNaN(numAtual)) return;

        let resultado = 0;
        switch (operador) {
            case "somar":
                resultado = numAnterior + numAtual;
                break;
            case "subtrair":
                resultado = numAnterior - numAtual;
                break;
            case "multiplicar":
                resultado = numAnterior * numAtual;
                break;
            case "dividir":
                resultado = numAnterior / numAtual;
                break;
            default:
                return;
        }

        valorAtual = resultado.toString();
        operador = "";
        valorAnterior = "";
        atualizarVisor(valorAtual);
    };

    document.querySelector(".calculadora").addEventListener("click", (evento) => {
        const botao = evento.target;
        const acao = botao.dataset.acao;
        const valor = botao.textContent;

        if (!botao.classList.contains("btn")) return;

        if (botao.classList.contains("numero")) {
            valorAtual = valorAtual === "0" ? valor : valorAtual + valor;
            atualizarVisor(valorAtual);
        }

        if (acao === "limpar") {
            limpar();
        }

        if (botao.classList.contains("operador")) {
            if (valorAtual && valorAnterior) {
                calcular();
            }
            operador = acao;
            valorAnterior = valorAtual;
            valorAtual = "";
        }

        if (acao === "igual") {
            calcular();
        }
    });
});
