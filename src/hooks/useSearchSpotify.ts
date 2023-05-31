import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSearchSpotify = (query: string, accessToken: string) => {
  const searchTracks = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const items = response.data.tracks.items;

    const track = items[0];

    return {
      id: track.id,
      image: track.album.images[0].url,
      artist: track.artists[0].name,
      name: track.name,
      previewUrl: track.preview_url,
    };
  };

  return useQuery(["spotifySearch", query], searchTracks, {
    enabled: !!query && !!accessToken,
  });
};

export default useSearchSpotify;
