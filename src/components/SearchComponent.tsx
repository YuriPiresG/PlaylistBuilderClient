import React, { useState } from "react";
import useSpotifySearch from "../hooks/useSearchSpotify";
import useAccessToken from "../hooks/useAccessToken";
import { Button, Input } from "@mantine/core";
import "./styles.css";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const accessToken = useAccessToken();

  const { data, isLoading, isError, error } = useSpotifySearch(
    searchQuery,
    accessToken
  );
  const artistImg = data?.image[0].url;
  console.log(artistImg);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
            <li>{data.genres.join(", ")}</li>
            <img src={data.image} alt="artist" id="artistImg" />
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
