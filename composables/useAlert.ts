import { reactive } from "vue";

type AlertState = {
  visible: boolean;
  message: string;
  color: string;
  icon: string;
};

type ShowAlertOptions = {
  message: string;
  color?: string;
  icon?: string;
  timeout?: number;
};

const alertState: AlertState = reactive({
  visible: false,
  message: "",
  color: "success",
  icon: "mdi-check-circle",
});

const showAlert = ({
  message,
  color = "success",
  icon = "mdi-check-circle",
  timeout = 3000,
}: ShowAlertOptions): void => {
  alertState.visible = true;
  alertState.message = message;
  alertState.color = color;
  alertState.icon = icon;

  // Nasconde l'alert dopo il timeout
  setTimeout(() => {
    alertState.visible = false;
  }, timeout);
};

export const useAlert = () => {
  return {
    alertState,
    showAlert,
  };
};
