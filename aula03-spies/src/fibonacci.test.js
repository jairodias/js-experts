const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert');

// Fibonacci: o próximo valor correspondente à soma dos dois valores anteriores
(async () => {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        // generators retornam iterators, (.next)
        // existem 3 formas de ler os dados
        // usando as funcoes .next, for await e rest/spread
        for await (const i of fibonacci.execute(3)) { }
        // nosso algoritmo vai sempre começar do zero
        const expectedCallCount = 4

        deepStrictEqual(spy.callCount, expectedCallCount)
    }

    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const [...results] = fibonacci.execute(5)

        const { args } = spy.getCall(2)
        const expectedResult = [0, 1, 1, 2, 3]
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        deepStrictEqual(args, expectedParams)
        deepStrictEqual(results, expectedResult)
    }
})()