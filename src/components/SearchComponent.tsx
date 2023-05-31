import React, { useState } from "react";
import useSpotifySearch from "../hooks/useSearchSpotify";
import useAccessToken from "../hooks/useAccessToken";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const accessToken = useAccessToken();

  const { data, isLoading, isError, error } = useSpotifySearch(
    searchQuery,
    accessToken
  );
  console.log(data);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}

      {data && (
        <ul>
          <li>{data.genres.join(', ')}</li>
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
