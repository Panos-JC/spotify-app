import { useState, useEffect } from "react";
import {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import { handleError } from "../utils";
import { StyledHeader } from "../styles";
import {
  ArtistsGrid,
  PlaylistsGrid,
  SectionWrapper,
  TrackList,
} from "../components";

const Profile = () => {
  const [profile, setProfile] = useState<any>({});
  const [playlists, setPlaylists] = useState<any>({});
  const [topArtists, setTopArtists] = useState<any>({});
  const [topTracks, setTopTracks] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: profile } = await handleError(getCurrentUserProfile());
      const { data: playlists } = await handleError(getCurrentUserPlaylists());
      const { data: topArtists } = await handleError(getTopArtists());
      const { data: topTracks } = await handleError(getTopTracks());

      setProfile(profile);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
      return profile;
    };

    fetchData();
  }, []);

  return (
    <>
      {profile && (
        <StyledHeader isUser>
          <div className="header__inner">
            {profile.images?.length && profile.images[0].url && (
              <img
                className="header__img"
                src={profile.images[0].url}
                alt="User Avatar"
              />
            )}
            <div>
              <div className="header__overline">Profile</div>
              <h1 className="header__name">{profile.display_name}</h1>
              <p className="header__meta">
                <span>
                  {playlists.total} Playlist
                  {playlists.total !== 1 ? "s" : ""}
                </span>
                <span>
                  {profile.followers?.total} Follower
                  {profile.followers?.total !== 1 ? "s" : ""}
                </span>
              </p>
            </div>
          </div>
        </StyledHeader>
      )}

      {topArtists && topTracks && (
        <main>
          <SectionWrapper
            title="Top artists this month"
            seeAllLink="/top-artists"
          >
            <ArtistsGrid artists={topArtists.items?.slice(0, 10)} />
          </SectionWrapper>

          <SectionWrapper
            title="Top tracks this month"
            seeAllLink="/top-tracks"
          >
            <TrackList tracks={topTracks.items?.slice(0, 10)} />
          </SectionWrapper>

          <SectionWrapper title="Playlists" seeAllLink="/playlists">
            <PlaylistsGrid playlists={playlists.items?.slice(0, 10)} />
          </SectionWrapper>
        </main>
      )}
    </>
  );
};

export default Profile;
