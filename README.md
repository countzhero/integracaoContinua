# Teste correto
function sum(a, b) {
    return a + b;
}

module.exports = { sum };

# Gerar teste de falha

function sum(a, b) {
    return a - b;
}