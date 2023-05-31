import React, { useState } from "react";
import useSpotifySearch from "../hooks/useSearchSpotify";
import useAccessToken from "../hooks/useAccessToken";
import { Button, Input } from "@mantine/core";
import useGetTracks from "../hooks/useGetTracks";
import "./styles.css";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");

  const accessToken = useAccessToken();

  const { data, isLoading, isError, error } = useSpotifySearch(
    searchQuery,
    accessToken
  );
  console.log(data);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const [tracks, setTracks] = useState([]);
  const {
    data: recommendationData,
    isLoading: isRecommendationLoading,
    isError: isRecommendationError,
  } = useGetTracks(data?.id || [], accessToken);
  console.log(recommendationData);

  return (
    <div id="test">
      <div id="search">
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Search for an artist"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          <Button onClick={() => setSearchQuery(searchBar)}>Search</Button>
        </form>
      </div>
      <div id="result">
        {data && (
          <ul>
            <li>{data.artist}</li>
            <li>{}</li>
            <img src={data.image} alt="artist" id="artistImg" />
          </ul>
        )}
      </div>
      {recommendationData && (
        <div>
          <h3>Recommendations</h3>
          <ul>
            {recommendationData.map((recommendation: any) => (
              <li key={recommendation.name}>
                <p>Artist: {recommendation.artist}</p>
                <p>Song: {recommendation.name}</p>
                <audio src={recommendation.previewUrl} controls />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
