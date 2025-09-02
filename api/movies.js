import { api } from "lib/api";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const getMovies = async () => {
  try {
    const response = await api("/api/Movie/movies", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await response;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Movies Error", error.message);
    } else {
      console.log("Movies Error", error);
    }
  }
};

export const useMoviesData = () => {
  return useQuery({
    queryKey: ["moviesData"],
    queryFn: getMovies,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

const getMoviesByCreator = async (id) => {
  try {
    const response = await api(`/api/Movie/creator/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await response;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Movies Error", error.message);
    } else {
      console.log("Movies Error", error);
    }
  }
};

export const useMoviesDataByCreator = (id) => {
  return useQuery({
    queryKey: ["moviesDataByCreator", id],
    queryFn: () => getMoviesByCreator(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};

const getMoviesById = async (id) => {
  try {
    const response = await api(`/api/Movie/movie-id/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await response;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Movies Error", error.message);
    } else {
      console.log("Movies Error", error);
    }
  }
};

export const useMoviesDataById = (id) => {
  return useQuery({
    queryKey: ["moviesDataById", id],
    queryFn: () => getMoviesById(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};

export const deletMovie = async (id) => {
  try {
    const response = await api(`/api/movie/remove/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const resp = await response;
    return resp;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Delete Movie Error", error.message);
    } else {
      console.log("Delete Movie Error", error);
    }
  }
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moviesData"] });
    },
  });
};

// export const addMovies = async (data) => {
//   try {
//     const response = await api("/api/movie/movies", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...data,
//       }),
//     });

//     const resp = await response;
//     return resp;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("add Movies Error", error.message);
//     } else {
//       console.log("add Movies Error", error);
//     }
//   }
// };

// export const useAddMovies = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (data) => {
//       const response = await addMovies(data);
//       return response;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["moviesData"] });
//     },
//     onError: (error) => {
//       toast.error(error.message);
//       console.log(" add movies Failed", error.message);
//     },
//   });
// };

export const editMovies = async (data) => {
  try {
    const response = await api("/api/movie/update-movie", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
      }),
    });

    const resp = await response;
    return resp;
  } catch (error) {
    if (error instanceof Error) {
      console.log("edit Movies Error", error.message);
    } else {
      console.log("edit Movies Error", error);
    }
  }
};

export const useEditMovies = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await editMovies(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moviesData"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(" movies Edit Failed", error.message);
    },
  });
};
