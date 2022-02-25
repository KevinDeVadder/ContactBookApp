const request = require('supertest')
const app = require('./index')
const UserModel = require('./models/User')

//Set cookie and contactId for persisted testing
let cookie
let contactId

describe('Users API', () => {
    it('Create User in the Database --> 200', async () => {
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
    it('Login User --> 200', () => {
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
    it('Login User --> 200', () => {
        //Try to login
        return request(app).post('/api/v1/authenticate').send({
            email: 'test@test.com',
            password: 'as12345678'
        }).expect(200).then((response) => {
            //Set cookie for future requests
            const cookies = response.headers['set-cookie'][0].split(';')[0]
            cookie = cookies.split('=')[1]

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
    it('Add one contact of user --> 200', () => {
        //Try to POST a contact with cookie gotten from Login
        return request(app).post('/api/v1/contacts').send({
            name: 'Kevin',
            email: 'test@test.tt',
            phoneNumber: '+40722222222',
            profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
        }).set('Cookie', [`token=${cookie}`]).expect(200).then((response) => {
            //Test if response contains Contact
            expect(response.body).toMatchObject({
                _id: expect.any(String),
                name: 'Kevin',
                email: 'test@test.tt',
                phoneNumber: '+40722222222',
                profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
            })
        })        
    })
    it('Add one contact of user but with missing profile picture --> 200', () => {
        //Try to POST a contact with no profile picture (since it's optional) with cookie gotten from Login
        return request(app).post('/api/v1/contacts').send({
            name: 'Kevin',
            email: 'test@test.ttt',
            phoneNumber: '+40744444444',
        }).set('Cookie', [`token=${cookie}`]).expect(200).then((response) => {
            //Test if response contains Contact
            expect(response.body).toMatchObject({
                _id: expect.any(String),
                name: 'Kevin',
                email: 'test@test.ttt',
                phoneNumber: '+40744444444'
            })
        }) 
    })
    it('List all Contacts of user --> 200', () => {
        //Try to GET a contact with cookie gotten from Login
        return request(app).get('/api/v1/contacts').set('Cookie', [`token=${cookie}`]).expect(200).then((response) => {
            //Set contactID
            contactId = response.body[0]._id
            
            //Test if response contains array of Contacts
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        name: expect.any(String),
                        email: expect.any(String),
                        phoneNumber: expect.any(String),
                        profilePicture: expect.any(String)
                    })
                ])
            )
        })     
    })
    it('See one contact of user --> 200', () => {
        //Try to GET a contact with cookie gotten from Login
        return request(app).get(`/api/v1/contact/${contactId}`).set('Cookie', [`token=${cookie}`]).expect(200).then((response) => {
            //Test if response contains contact
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    phoneNumber: expect.any(String),
                    profilePicture: expect.any(String)
                })
            )
        })
    })
    it('See one contact of user that does not exist --> 404', () => {
        //Try to GET a non-existant contact with cookie gotten from Login and expect 404
        return request(app).get(`/api/v1/contact/111111111111111111111111`).set('Cookie', [`token=${cookie}`]).expect(404)
    })
    it('Add one contact of user that already exists --> 400', () => {
        //Try to POST a contact that already exists with cookie gotten from Login and expect 400
        return request(app).post('/api/v1/contacts').send({
            name: 'Kevin',
            email: 'test@test.tt',
            phoneNumber: '+40722222222',
            profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
        }).set('Cookie', [`token=${cookie}`]).expect(400) 
    })
    it('Add one contact of user but with missing data -> 400', () => {
        //Try to POST a contact with missing data with cookie gotten from Login and expect 400
        return request(app).post('/api/v1/contacts').send({
            email: 'test@test.tt',
            phoneNumber: '+40711111111',
            profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
        }).set('Cookie', [`token=${cookie}`]).expect(400) 
    })
    it('Add one contact of user but with wrong email --> 400', () => {
        //Try to POST a contact with wrong email with cookie gotten from Login and expect 400
        return request(app).post('/api/v1/contacts').send({
            name: 'Kevin',
            email: 'test',
            phoneNumber: '+40722222222',
            profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
        }).set('Cookie', [`token=${cookie}`]).expect(400) 
    })
    it('Add one contact of user but with wrong phoneNumber --> 400', () => {
        //Try to POST a contact with wrong email with cookie gotten from Login and expect 400
        return request(app).post('/api/v1/contacts').send({
            name: 'Kevin',
            email: 'test@test.tt',
            phoneNumber: '40722222222',
            profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
        }).set('Cookie', [`token=${cookie}`]).expect(400) 
    })
    it('Edit contact', () => {
        //Try to PUT a contact with cookie gotten from Login
        return request(app).put(`/api/v1/contact/${contactId}`).send({
            name: 'KevinNew'
        }).set('Cookie', [`token=${cookie}`]).expect(200).then((response) => {
            //Test if response contains modified Contact
            expect(response.body).toEqual(
                expect.objectContaining({
                    _id: expect.any(String),
                    name: 'KevinNew',
                    email: 'test@test.tt',
                    phoneNumber: '+40722222222',
                    profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
                })
            )
        })    
    })
    it('Edit contact with bad email', () => {
        //Try to PUT a contact with bad email with cookie gotten from Login
        return request(app).put(`/api/v1/contact/${contactId}`).send({
            email: 'test'
        }).set('Cookie', [`token=${cookie}`]).expect(400)
    })
    it('Edit contact with bad phoneNumber', () => {
        //Try to PUT a contact with bad phoneNumber with cookie gotten from Login
        return request(app).put(`/api/v1/contact/${contactId}`).send({
            phoneNumber: '40722222222'
        }).set('Cookie', [`token=${cookie}`]).expect(400)
    })
    it('Delete contact', () => {
        //Try to DELETE a contact with cookie gotten from Login
        return request(app).delete(`/api/v1/contact/${contactId}`).set('Cookie', [`token=${cookie}`]).expect(200).then((response) => {
            //Test if response contains deleted Contact
            expect(response.body).toMatchObject({
                _id: expect.any(String),
                name: 'KevinNew',
                email: 'test@test.tt',
                phoneNumber: '+40722222222',
                profilePicture: 'https://images.unsplash.com/photo-1615789591457-74a63395c990'
            })
        })    
    })
    it('Delete contact that does not exist --> 404', () => {
        //Try to DELETE a non-existant contact with cookie gotten from Login
        return request(app).delete(`/api/v1/contact/111111111111111111111111`).set('Cookie', [`token=${cookie}`]).expect(404)
    })
})