<template>
    <div>
        <!-- System Bar -->
        <v-system-bar color="purple darken-1"></v-system-bar>

        <!-- Actual header -->
        <v-app-bar
        absolute
        color="purple darken-2"
        dark
        dense
        >
            <!-- Header -->
            <v-toolbar-title>ContactMe</v-toolbar-title>
            
            <!-- Spacer -->
            <v-spacer/>

            <!-- Log Out Button -->
            <v-btn color="purple lighten-2 dark" v-if="isUserLoggedIn">Log out</v-btn>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isUserLoggedIn: false
        }
    }
}
</script>