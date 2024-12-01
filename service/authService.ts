import type { AuthResponse } from "~/models/Auth";
import { GetUrlAddUser, GetUrlLogin } from "~/service/baseUrl";

export const authService = {
  async login({ body }: { body: string }): Promise<AuthResponse> {
    const response = await fetch(GetUrlLogin(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return await response.json();
  },
  async registerUser({ body }: { body: string }) {
    const response = await fetch(GetUrlAddUser(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    return await response.json();
  },
};
