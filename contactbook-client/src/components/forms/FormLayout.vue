<template>
    <!-- Layout for the Login and Register Forms -->
    <v-container fill-height>
        <!-- Grid for the Login and Register Forms  -->
        <v-row align="center" justify="center">
            <!-- Form -->
            <v-card :width="width" :height="height" class="pa-5">
                <!-- Card title -->
                <v-card-title class="purple--text">
                    <slot name="title"></slot>
                </v-card-title>
                <!-- Form fields -->
                <v-card-text>
                    <slot name="fields"></slot>
                </v-card-text>
                <!-- Form actions -->
                <v-card-actions>
                    <slot name="actions"></slot>
                </v-card-actions>
            </v-card>
        </v-row>
  </v-container>
</template>

<script>
export default {
    computed: {
        //Code source: https://vuetifyjs.com/en/features/breakpoints/#breakpoint-service
        height () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 500
                case 'sm': return 500
                case 'md': return 500
                case 'lg': return '40%'
                case 'xl': return '40%'
            }
            return 0
        },
        width () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '80%'
                case 'sm': return '80%'
                case 'md': return '80%'
                case 'lg': return '50%'
                case 'xl': return '50%'
            }
            return 0
        }
    },
}
</script>