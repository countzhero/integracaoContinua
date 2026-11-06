const { sum } = require('../src/calculator');

test('Deve somar números corretamente', () => {
    expect(sum(2, 3)).toBe(5);
});