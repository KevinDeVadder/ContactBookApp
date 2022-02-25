const request = require('supertest')
const app = require('./index')

describe('Users API', () => {
    it('Create User in the Database', () => {
        return request(app).post('/register').send({
            name: 'John Doe',
            email: 'test@test.com',
            password: '12345678'
        })
    })
    it('Login User', () => {})
    it('Login User with wrong password -> 404', () => {})
})