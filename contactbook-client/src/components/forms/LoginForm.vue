<template>
    <form-layout>
        <!-- Form Title -->
        <template v-slot:title>
            <!-- Title -->
            Log in into ContactMe
        </template>

        <!-- Form Fields -->
        <template v-slot:fields>
            <!-- Email Field -->
            <v-text-field
                ref="email"
                v-model="email"
                :rules="emailValidatorRules"
                label="Email"
                placeholder="basicemail@gmail.com"
                required
                color="purple"
            ></v-text-field>
            <!-- Password Field -->
            <v-text-field
                ref="password"
                v-model="password"
                :type="'password'"
                :rules="passwordValidatorRules"
                label="Password"
                placeholder="Password"
                required
                color="purple"
            ></v-text-field>
        </template>
        
        <!-- Form Buttons -->
        <template v-slot:actions>
            <!-- Submit Button -->
            <v-btn dark raised color="purple darken-2" @click="login">Login</v-btn>
        </template>
    </form-layout>
</template>

<script>
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

        }
    }
}
</script>