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

    const artistResponse = await axios.get(track.artists[0].href, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const artistData = artistResponse.data;
    const artistGenres = artistData.genres;
    const artistImage = artistData.images[0]?.url;

    return {
      artist: track.artists[0].name,
      genres: artistGenres,
      image: artistImage,
    };
  };

  return useQuery(["spotifySearch", query], searchTracks, {
    enabled: !!query && !!accessToken,
  });
};

export default useSearchSpotify;
