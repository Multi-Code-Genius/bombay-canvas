import { useMutation } from "@tanstack/react-query";
import { api } from "lib/api";
import { useAuthStore } from "store/authStore";
import { useRouter } from "next/navigation";

export const requestOtp = async (data) => {
  try {
    const response = await api("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        password: data.password,
      }),
    });

    const resp = await response;
    return resp;
  } catch (error) {
    if (error instanceof Error) {
      console.log("login Error", error.message);
    } else {
      console.log("login Error", error);
    }
  }
};

export const useRequestOtp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await requestOtp(data);
      return response;
    },
    onSuccess: async (data) => {
      if (data.token) {
        await useAuthStore
          .getState()
          .saveToken(data.token)
          .then(() => {
            router.push("/");
          });
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("Signup Failed", error.message);
    },
  });
};

export const login = async (data) => {
  try {
    const response = await api("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const resp = await response;
    return resp;
  } catch (error) {
    if (error instanceof Error) {
      console.log("login Error", error.message);
    } else {
      console.log("login Error", error);
    }
  }
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await login(data);
      return response;
    },
    onSuccess: async (data) => {
      if (data.token) {
        await useAuthStore
          .getState()
          .saveToken(data.token)
          .then(() => {
            router.push("/");
          });
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("Login Failed", error.message);
    },
  });
};

export const googleLogin = async (idToken) => {
  try {
    const response = await api("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: idToken,
      }),
    });

    const resp = await response;
    return resp;
  } catch (error) {
    if (error instanceof Error) {
      console.log("login Error", error.message);
    } else {
      console.log("login Error", error);
    }
  }
};

export const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data) => {
      const response = await googleLogin(data);
      return response;
    },
    onSuccess: async (data) => {
      if (data.token) {
        await useAuthStore
          .getState()
          .saveToken(data.token)
          .then(() => {
            router.push("/");
          });
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("Login Failed", error.message);
    },
  });
};
