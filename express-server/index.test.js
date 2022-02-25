const request = require('supertest')
const app = require('./index')
const UserModel = require('./models/User')

describe('Users API', () => {
    it('Create User in the Database', async () => {
        //Delete all previous users
        await UserModel.deleteMany()
        
        //Try to create user
        return request(app).post('/api/v1/register').send({
            name: 'John Doe',
            email: 'test@test.com',
            password: 'as12345678'
        }).expect(200).then((response) => {
            //Test if response contains name and email
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: 'John Doe',
                    email: 'test@test.com'
                })
            )
        })
    })
    it('Login User', () => {
        //Try to login
        return request(app).post('/api/v1/authenticate').send({
            email: 'test@test.com',
            password: 'as12345678'
        }).expect(200).then((response) => {
            //Test if response contains name and email
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: 'John Doe',
                    email: 'test@test.com'
                })
            )
            //Test if response contains JTW cookie
            expect( response.get('Set-Cookie') ).toBeDefined()
        })
    })
    it('Login User with wrong email -> 404', () => {
        //Try to login and expect 404
        return request(app).post('/api/v1/authenticate').send({
            email: 'test12@test.com',
            password: 'as12345678'
        }).expect(404)
    })
    it('Login User with wrong password -> 403', () => {
        //Try to login and expect 404
        return request(app).post('/api/v1/authenticate').send({
            email: 'test@test.com',
            password: '12345678'
        }).expect(403)
    })
})