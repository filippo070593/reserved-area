<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useAlert } from "~/composables/useAlert";
import CustomForm from "~/components/CustomForm/CustomForm.vue";
import { authService } from "~/service/authService";

const { login } = useAuth();
const { showAlert } = useAlert();
const initialValue = reactive({
  username: "",
  password: "",
});
const isLoading = ref(false);

const usernameRules = computed(() => [
  (v: string) => v?.length >= 6 || "Username troppo corto",
]);
const passwordRules = computed(() => [
  (v: string) => v?.length >= 6 || "La password deve avere almeno 6 caratteri",
]);
const handleSubmit = async (formValues: Record<string, any>) => {
  try {
    isLoading.value = true;
    const body = JSON.stringify({
      ...formValues,
    });
    const res = await authService.login({ body });

    if (res.accessToken) {
      login(res.accessToken);
      showAlert({ message: "Login effettuato con successo" });
    } else {
      showAlert({
        message: "Username o Password errata",
        color: "error",
        icon: "mdi-close-circle",
      });
    }
  } catch (error) {
    console.error("Errore nel login:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <CustomForm
    :initial-values="{ ...initialValue }"
    :handle-submit="handleSubmit"
    :validation-rules="{ usernameRules, passwordRules }"
  >
    <template #default="{ formValues, isValid, validationRules }">
      <v-text-field
        v-model="formValues.username"
        label="Username"
        :rules="validationRules.usernameRules"
        autocomplete="username"
        outlined
        required
        prepend-icon="mdi-account"
      />
      <v-text-field
        v-model="formValues.password"
        label="Password"
        :rules="validationRules.passwordRules"
        autocomplete="current-password"
        outlined
        required
        type="password"
        prepend-icon="mdi-lock"
      />
      <v-btn
        :disabled="!isValid"
        color="primary"
        class="mt-4"
        type="submit"
        :loading="isLoading"
        block
      >
        Accedi
      </v-btn>
    </template>
  </CustomForm>
</template>

<style scoped></style>
