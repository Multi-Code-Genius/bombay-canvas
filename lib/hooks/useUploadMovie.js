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

  return { filePath };
}

export const useUploadMovie = (token, refetch) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadMovie = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const { filePath: posterFilePath } = await uploadFile(data?.posterImage);
      const { filePath: trailerFilePath } = await uploadFile(
        data?.trailerVideo
      );

      let episodes = [];
      if (data.episodes && data.episodes.length > 0) {
        episodes = await Promise.all(
          data.episodes.map(async (ep, idx) => {
            const { filePath } = await uploadFile(ep.episodeVideo);
            return {
              title: ep.title,
              season: ep.season,
              episodeNo: ep.episodeNo,
              duration: ep.duration,
              filePath,
            };
          })
        );
      }

      let res;

      if (posterFilePath && trailerFilePath && episodes[0]?.filePath) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/upload-movie`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: data.title,
              description: data.description,
              releaseDate: data.releaseDate,
              duration: data.duration,
              uploaderId: data.uploaderId,
              type: data.type,
              genres: data.genres,
              posterFilePath,
              trailerFilePath,
              episodes,
            }),
          }
        );
      }

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      return await res.json();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
      throw err;
    } finally {
      refetch();
      setLoading(false);
    }
  };

  return { uploadMovie, loading, error };
};
