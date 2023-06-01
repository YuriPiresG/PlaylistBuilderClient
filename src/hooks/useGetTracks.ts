import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetTracks = (id: string, accessToken: string, isWindowFocused: boolean) => {
  const useGetTracks = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=10`,
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
      image: track.album.images[0].url,
      previewUrl: track.preview_url,
      id: track.id,
    }));
  };

  const query = useQuery(["spotifyRecommendations", id], useGetTracks, {
    enabled: !!id && !!accessToken,
    refetchOnWindowFocus: false,
  });

  return query;
};

export default useGetTracks;
