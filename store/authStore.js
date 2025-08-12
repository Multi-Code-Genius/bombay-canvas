import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  token: Cookies.get("accessToken") || null,

  saveToken: async (token) => {
    Cookies.set("accessToken", token, { expires: 7 });
    set({ token });
  },

  logout: async () => {
    Cookies.remove("accessToken");
    set({ token: null });
  },
}));
