<template>
  <v-footer color="primary accent-4" dark>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" md="4" class="text-center">
          <v-icon large>mdi-facebook</v-icon>
          <v-icon large>mdi-twitter</v-icon>
          <v-icon large>mdi-linkedin</v-icon>
          <v-icon large>mdi-instagram</v-icon>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <p>&copy; 2024 La mia App</p>
          <p>Privacy | Termini di Servizio</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.v-footer {
  max-height: 150px;
}
</style>
