import Api from '@/services/Api'

export default {
    //Login Route
    login(credentials){
        return Api().post('authenticate', credentials, {'timeout': 1000})
    },

    //Register Route
    register(credentials){
        return Api().post('register', credentials, {'timeout': 1000})
    }
}