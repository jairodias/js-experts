const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')

const BASE_URL_1 = 'https://swapi.dev/api/planets/2'

const mocks = {
    alderaan: require('./mocks/alderaan.json')
}
    ; (async () => {

        const service = new Service()
        const stub = sinon.stub(service, service.makeRequest.name)

        stub
            .withArgs(BASE_URL_1)
            .resolves(mocks.alderaan)

        {
            const expected = {
                "name": "Alderaan",
                "surfaceWater": "40",
                "appearedIn": 2
            }
            const response = service.getPlanets(BASE_URL_1)
            deepStrictEqual(response, expected)
        }
    })