import { useQuery } from "@tanstack/react-query";
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
