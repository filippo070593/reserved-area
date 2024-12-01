<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAlert } from "~/composables/useAlert";
import { authService } from "~/service/authService";
const step = ref(1);

const gender = [
  { key: "male", value: "Maschile" },
  { key: "female", value: "Femminile" },
  { key: "other", value: "Altro" },
];

const initialValue = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDate: null,
  city: "",
  taxId: "",
  confirmPassword: "",
  genderSelected: null,
});

const router = useRouter();
const { showAlert } = useAlert();
const goToLogin = () => {
  router.push("/login");
};

const submitForm = async (formValues: Record<string, any>) => {
  const payload = Object.entries(formValues).reduce((acc, [key, value]) => {
    let normalizedValue = value;
    if (key === "gender") normalizedValue = value.key;
    else if (key === "city") {
      return {
        ...acc,
        address: {
          [key]: normalizedValue,
        },
      };
    }
    return {
      ...acc,
      [key]: normalizedValue,
    };
  }, {});
  try {
    await authService.registerUser({ body: JSON.stringify(payload) });
    goToLogin();
  } catch (e) {
    showAlert({
      message:
        "a causa di un errore non è stato possibile completare la registrazione",
      color: "error",
    });
  }
};

const rules = {
  nameLength: [
    (v: string) => {
      return v.length >= 3 || "Il nome deve contenere almeno 3 caratteri";
    },
  ],
  surnameRules: [
    (v: string) =>
      v.length >= 3 || "Il cognome deve contenere almeno 3 caratteri",
  ],
  emailRules: [(v: string) => /.+@.+\..+/.test(v) || "Email non valida"],
  passwordRules: [
    (v: string) => v.length >= 6 || "La password deve avere almeno 6 caratteri",
  ],
  confirmPasswordRules: [
    (v: string) =>
      v === initialValue.password || "Le password non corrispondono",
  ],
  dateBirthRules: [(v: string) => !!v || "La data di nascita è obbligatoria"],
  taxIdRules: [(v: string) => v.length === 16 || "Codice fiscale non valido"],
  cityRules: [
    (v: string) =>
      v.length >= 3 || "La città deve contenere almeno 3 caratteri",
  ],
};
</script>

<template>
  <CustomForm
    :initial-values="initialValue"
    :handle-submit="submitForm"
    :validation-rules="{ ...rules }"
  >
    <template #default="{ formValues, isValid, validationRules }">
      <v-stepper
        v-model="step"
        :items="['Step 1', 'Step 2', 'Step 3']"
        show-actions
        color="primary"
      >
        <template v-slot:item.1>
          <v-card elevation="0">
            <v-card-title class="text-h5">Crea il tuo account</v-card-title>
            <v-card-subtitle>Compila il modulo per registrarti</v-card-subtitle>
            <v-card flat elevation="0">
              <v-text-field
                v-model="formValues.firstName"
                label="Nome"
                :rules="validationRules.nameLength"
                outlined
                autocomplete="firstName"
                color="primary"
                required
                prepend-icon="mdi-account"
              />
              <v-text-field
                v-model="formValues.lastName"
                label="Cognome"
                :rules="validationRules.surnameRules"
                color="primary"
                outlined
                autocomplete="lastName"
                required
                prepend-icon="mdi-account"
              />
              <v-date-input
                v-model="formValues.birthDate"
                :rules="validationRules.dateBirthRules"
                outlined
                required
                color="primary"
                placeholder="dd/mm/yyyy"
                persistent-placeholder
                label="Data di nascita"
              ></v-date-input>
            </v-card>
          </v-card>
        </template>
        <template v-slot:item.2>
          <v-card flat elevation="0">
            <v-text-field
              v-model="formValues.taxId"
              color="primary"
              label="Codice Fiscale"
              :rules="validationRules.taxIdRules"
              autocomplete="tax-id"
              outlined
              required
              prepend-icon="mdi-account-card"
            />
            <v-text-field
              v-model="formValues.city"
              color="primary"
              label="Città nascita"
              :rules="validationRules.cityRules"
              autocomplete="city"
              outlined
              required
              prepend-icon="mdi-city"
            />
            <v-select
              v-model="formValues.genderSelected"
              :items="gender"
              item-title="value"
              item-value="key"
              label="Sesso"
              prepend-icon="mdi-gender-male-female"
              persistent-hint
              return-object
              single-line
            ></v-select>
          </v-card>
        </template>
        <template v-slot:item.3>
          <v-card flat elevation="0">
            <v-text-field
              v-model="formValues.email"
              color="primary"
              label="Email"
              :rules="validationRules.emailRules"
              autocomplete="username"
              outlined
              required
              prepend-icon="mdi-email"
            />
            <v-text-field
              v-model="formValues.password"
              label="Password"
              :rules="validationRules.passwordRules"
              outlined
              required
              color="primary"
              type="password"
              autocomplete="new-password"
              prepend-icon="mdi-lock"
            />
            <v-text-field
              v-model="formValues.confirmPassword"
              label="Conferma la Password"
              :rules="validationRules.confirmPasswordRules"
              outlined
              required
              color="primary"
              type="password"
              autocomplete="confirm-password"
              prepend-icon="mdi-lock"
            />
            <v-btn
              :disabled="!isValid"
              color="primary"
              class="mt-4"
              type="submit"
              block
            >
              Registrati
            </v-btn>
          </v-card>
        </template>
      </v-stepper>
      <v-row class="mt-2" align="center">
        <v-col class="text-center" cols="12">
          <v-btn @click="goToLogin" width="100%" color="primary">
            Hai già un account? Accedi
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </CustomForm>
</template>

<style scoped></style>
