<template>
    <!-- Layout for the Login and Register Forms -->
    <v-layout justify-center>
        <!-- Grid for the Login and Register Forms  -->
        <v-flex xs12 sm10 md8 lg6>
            <!-- Form -->
            <v-card ref="form">
                <!-- Form fields -->
                <v-card-text>
                    <slot name="fields"></slot>
                </v-card-text>
                <!-- Form actions -->
                <v-card-actions>
                    <slot name="actions"></slot>
                </v-card-actions>
            </v-card>
        </v-flex>
  </v-layout>
</template>