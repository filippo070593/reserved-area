<script setup lang="ts">
import { useRouter } from "vue-router";
import LoginForm from "~/components/Form/LoginForm/LoginForm.vue";

const router = useRouter();

function goToRegister() {
  router.push("/register");
}
</script>

<template>
  <v-container class="d-flex align-center justify-center h-100">
    <v-row class="ma-0" align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h5">Accedi al tuo account</v-card-title>
          <v-card-subtitle>Inserisci le tue credenziali</v-card-subtitle>
          <LoginForm />
          <v-row class="mt-2" align="center">
            <v-col class="text-center" cols="12">
              <v-btn @click="goToRegister" width="100%">Registrati</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.v-btn {
  font-weight: bold;
}

.v-form {
  margin-top: 20px;
}
</style>
