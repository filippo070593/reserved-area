<script setup lang="ts">
import { useForm } from "~/composables/useForm";

type CustomFormProps = {
  initialValues: Record<string, any>;
  handleSubmit: (formValues: Record<string, any>) => void;
  validationRules: Record<
    string,
    readonly ((value: any) => string | boolean)[]
  >;
};

const { initialValues, handleSubmit, validationRules } =
  defineProps<CustomFormProps>();

const { formValues, isValid, formRef } = useForm(initialValues);
</script>

<template>
  <v-form v-model="formRef" @submit.prevent="handleSubmit(formValues)">
    <slot
      :formValues="formValues"
      :isValid="isValid"
      :validationRules="validationRules"
    />
  </v-form>
</template>
