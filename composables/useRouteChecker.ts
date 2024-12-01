import { useRoute, useRouter } from "vue-router";
import { useAlert } from "~/composables/useAlert";

export function useRouteChecker() {
  const route = useRoute();
  const router = useRouter();
  const { showAlert } = useAlert();

  const checkAndNavigate = (targetRouteName: string): void => {
    if (route.name === targetRouteName) {
      showAlert({
        message: "sei gia nella pagina giusta",
        color: "info",
        icon: "mdi-information-slab-circle-outline",
      });
      console.log(`Sei già sulla pagina ${targetRouteName}`);
    } else {
      router.push({ name: targetRouteName });
    }
  };

  return {
    checkAndNavigate,
  };
}
