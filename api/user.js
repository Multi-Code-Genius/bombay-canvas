import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "lib/api";

export const fetchUserData = async () => {
  try {
    const response = await api("/api/user/userInfo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("user Error", error.message);
    } else {
      console.log("user Error", error);
    }
  }
};

export const useUserData = (token) => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: !!token,
  });
};

export const fetchAllUserData = async () => {
  try {
    const response = await api("/api/user/all-usera", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("user Error", error.message);
    } else {
      console.log("user Error", error);
    }
  }
};

export const useAllUserData = () => {
  return useQuery({
    queryKey: ["allUserData"],
    queryFn: fetchAllUserData,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const updateRole = async (data) => {
  try {
    const response = await api("/api/user/updaterole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: data.role,
        userId: data.userId,
      }),
    });

    const resp = await response;
    return resp;
  } catch (error) {
    if (error instanceof Error) {
      console.log("update role Error", error.message);
    } else {
      console.log("update Error", error);
    }
  }
};

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await updateRole(data);
      return response;
    },
    onSuccess: async () => {
      QueryClient.invalidateQueries({ queryKey: ["allUserData"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("update role Failed", error.message);
    },
  });
};
