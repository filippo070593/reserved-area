import { ref, reactive } from "vue";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const formValues = reactive(initialValues);
  const isValid = ref(false);
  const formRef = ref(false);

  watchEffect(() => {
    isValid.value =
      formRef.value && Object.values(formValues).every((val) => !!val);
  });

  return {
    formValues,
    formRef,
    isValid,
  };
}
