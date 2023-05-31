import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetTracks = (genres: string[], accessToken: string) => {
  const searchRecommendations = async () => {
    const genreQuery = genres.join(",");
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_genres=${genreQuery}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const tracks = response.data.tracks;

    return tracks.map((track: any) => ({
      artist: track.artists[0].name,
      name: track.name,
      previewUrl: track.preview_url,
    }));
  };

  return useQuery(["spotifyRecommendations", genres], searchRecommendations, {
    enabled: !!genres.length && !!accessToken,
  });
};
export default useGetTracks;
