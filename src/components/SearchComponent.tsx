import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Input,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import React, { useState } from "react";
import { BsSpotify } from "react-icons/bs";
import useAccessToken from "../hooks/useAccessToken";
import useGetTracks from "../hooks/useGetTracks";
import useSpotifySearch from "../hooks/useSearchSpotify";
import "./styles.css";
import logo from "/src/assets/logo.png";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");

  const accessToken = useAccessToken();

  const { data, isLoading } = useSpotifySearch(searchQuery, accessToken);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const { data: recommendationData } = useGetTracks(
    data?.id || [],
    accessToken
  );

  return (
    <div id="test">
      <div id="search">
        <form onSubmit={handleSearch}>
          <Input
            style={{
              position: "absolute",
              left: "50%",
              top: "10%",
              transform: "translate(-50%, -50%)",
            }}
            type="text"
            placeholder="Search for a track song."
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          <Image
            src={logo}
            width={300}
            style={{
              position: "absolute",
              left: "93%",
              top: "15%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <Button
            style={{
              position: "absolute",
              left: "57.5%",
              top: "10%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => setSearchQuery(searchBar)}
            disabled={searchBar === ""}
          >
            Search
          </Button>
        </form>
      </div>

      <Group position="apart" spacing="md">
        <Card
          key={data?.artist}
          shadow="xs"
          padding="md"
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Image
              src={data?.image}
              alt={data?.artist}
              className="image"
              width={80}
              height={80}
              style={{ borderRadius: "8px" }}
            />
            <div style={{ marginLeft: "12px" }}>
              <Text size="lg" weight={700}>
                {data?.artist}
              </Text>
              {data && (
                <Button
                  color="green"
                  style={{ width: "13rem" }}
                  onClick={() =>
                    window.open(
                      `https://open.spotify.com/track/${data?.id}`,
                      "_blank"
                    )
                  }
                >
                  <BsSpotify />
                </Button>
              )}
            </div>
          </div>
          <Text>{data?.name}</Text>
          <audio src={data?.previewUrl} controls />
        </Card>
      </Group>
      {recommendationData && (
        <div>
          <LoadingOverlay
            visible={isLoading}
            overlayBlur={2}
            transitionDuration={500}
          />
          <Text fz="xl" color="white" weight={700}>
            Recommendations
          </Text>
          <Group position="apart" spacing="md">
            {recommendationData.map((recommendation: any) => (
              <Card
                key={recommendation.name}
                shadow="xs"
                padding="md"
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: "8px",
                  marginTop: "5%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Image
                    src={recommendation.image}
                    alt={recommendation.artist}
                    width={80}
                    height={80}
                    style={{ borderRadius: "8px" }}
                  />

                  <div style={{ marginLeft: "12px" }}>
                    <Text size="lg" weight={700}>
                      Artist: {recommendation.artist}
                    </Text>
                    <Button
                      color="green"
                      style={{ width: "13rem" }}
                      onClick={() =>
                        window.open(
                          `https://open.spotify.com/track/${recommendation.id}`,
                          "_blank"
                        )
                      }
                    >
                      <BsSpotify />
                    </Button>
                    <Badge color="teal">{recommendation.genres}</Badge>
                  </div>
                </div>
                <Text>song: {recommendation.name}</Text>

                <audio src={recommendation.previewUrl} controls />
              </Card>
            ))}
          </Group>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
