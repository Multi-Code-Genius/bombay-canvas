import { useState } from "react";

export const useUploadMovie = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadMovie = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("releaseDate", data.releaseDate);
      formData.append("duration", data.duration.toString());
      formData.append("uploaderId", data.uploaderId);
      formData.append("type", data.type);
      formData.append("genres", JSON.stringify(data.genres));

      // attach static files
      formData.append("posterImage", data.posterImage);
      formData.append("trailerVideo", data.trailerVideo);
      formData.append("movieVideo", data.movieVideo);

      // attach episodes if provided
      if (data.episodes && data.episodes.length > 0) {
        formData.append(
          "episodes",
          JSON.stringify(
            data.episodes.map((ep, idx) => ({
              title: ep.title,
              season: ep.season,
              episodeNo: ep.episodeNo,
              duration: ep.duration,
              index: idx,
            }))
          )
        );

        data.episodes.forEach((ep, idx) => {
          console.log("ep", ep);
          formData.append(`episodeVideo_${idx}`, ep?.episodeVideo);
        });
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/movies`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      return await res.json();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadMovie, loading, error };
};
