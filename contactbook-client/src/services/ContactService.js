import Api from '@/services/Api'

export default {
    //POST Contact
    create(payload){
        return Api().post('contacts', payload, {'timeout': 1000})
    },
    //GET all Contacts
    getAll(){
        return Api().get('contacts')
    },
    //GET one Contact
    getOne(id){
        return Api().get(`contact/${id}`)
    },
    //DELETE one Contact
    deleteOne(id){
        return Api().delete(`contact/${id}`)
    },
    //PUT one Contact
    updateOne(id, payload){
        return Api().put(`contact/${id}`, payload)
    }
}