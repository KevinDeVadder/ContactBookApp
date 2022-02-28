<template>
    <form-layout>
        <!-- Form Title -->
        <template v-slot:title>
            <!-- Title -->
            Log in into ContactMe
        </template>

        <!-- Form Fields -->
        <template v-slot:fields>
            <v-form ref="form">
                <!-- Email Field -->
                <v-text-field
                    v-model="email"
                    :rules="emailValidatorRules"
                    label="Email"
                    placeholder="basicemail@gmail.com"
                    required
                    color="purple"
                ></v-text-field>
                <!-- Password Field -->
                <v-text-field
                    v-model="password"
                    :type="'password'"
                    :rules="passwordValidatorRules"
                    label="Password"
                    placeholder="Password"
                    required
                    color="purple"
                ></v-text-field>
            </v-form>
        </template>
        
        <!-- Form Buttons -->
        <template v-slot:actions>
            <!-- Submit Button -->
            <v-btn dark raised color="purple darken-2" @click="login">Login</v-btn>
        </template>
    </form-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import formLayout from '@/components/forms/FormLayout'
export default {
    components: {
        formLayout
    },
    data(){
        return{
            email: '',
            password: '',
            emailValidatorRules: [
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
                () => !!this.email || 'This field is required'
            ],
            passwordValidatorRules: [
                () => !!this.password || 'This field is required'
            ],
        }
    },
    methods: {
        async login(){
            if(this.$refs.form.validate()){
                try{
                    await AuthenticationService.login({email: this.email, password: this.password})
                    this.$store.commit('switchUserState')
                    this.$router.push({name:'Dashboard'})
                }
                catch(err){
                    console.log(err)
                }
            }
        }
    }
}
</script>