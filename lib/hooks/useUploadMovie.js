import { useState } from "react";

export async function uploadFile(file) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/sign-url`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, contentType: file.type }),
    }
  );

  const { uploadUrl, filePath } = await res.json();

  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  return filePath;
}

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

      const { filePath: posterImageUrl } = uploadFile(data.posterImage);
      const { filePath: trailerPath } = uploadFile(data.trailerVideo);

      formData.append("posterImage", posterImageUrl);
      formData.append("trailerVideo", trailerPath);

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
          const { filePath } = uploadFile(ep?.episodeVideo);
          formData.append(`episodeVideo_${idx}`, filePath);
        });
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/upload-movie`,
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
