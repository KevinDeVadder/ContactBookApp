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
            //Test if response contains JWT cookie
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

describe('Contacts API', () => {
    it('List all Contacts of user with no login --> 403', () => {
        //Try to request Contacts and expect 404
        return request(app).get('/api/v1/contacts').expect(403) 
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
            //Test if response contains JWT cookie
            expect( response.get('Set-Cookie') ).toBeDefined()
        })
    })
    it('Add one contact of user', () => {
        //Try to login
        return request(app).post('/api/v1/contacts').send({
            name: 'Kevin',
            email: 'test@test.tt',
            phoneNumber: '+40722222222',
            profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
        }).expect(200).then((response) => {
            //Test if response contains name and email
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: 'Kevin',
                        email: 'test@test.tt',
                        phoneNumber: '+40722222222',
                        profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
                    })
                ])
            )
        })        
    })
    it('List all Contacts of user', () => {})
    it('See one contact of user', () => {})
    it('See one contact of user that does not exist --> 404', () => {})
    it('Add one contact of user that already exists', () => {})
    it('Add one contact of user but with missing data', () => {})
    it('Add one contact of user but with wrong data', () => {})
    it('Edit contact', () => {})
    it('Edit contact with bad name', () => {})
    it('Edit contact with bad email', () => {})
    it('Edit contact with bad phoneNumber', () => {})
    it('Edit contact with bad profilePicture', () => {})
    it('Delete contact', () => {})
    it('Delete contact that does not exist --> 404', () => {})
})