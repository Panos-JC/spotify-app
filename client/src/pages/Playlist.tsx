import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionWrapper, TrackList } from "../components";
import { getPlaylistById } from "../spotify";
import { StyledHeader } from "../styles";
import {
  ItemsObject,
  PlaylistObject,
  TracksObject,
} from "../types/PlaylistObject";
import { handleError } from "../utils";

const Playlist = () => {
  const { id } = useParams<{ id: string }>();

  const [playlist, setPlaylist] = useState<PlaylistObject | null>();
  const [tracksData, setTracksData] = useState<TracksObject>();
  const [tracks, setTracks] = useState<ItemsObject[]>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await handleError(getPlaylistById(id));
      setPlaylist(data);
      setTracksData(data?.tracks);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!tracksData) {
      return;
    }

    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };

    setTracks(tracks =>
      tracks ? [...tracks, ...tracksData.items] : [...tracksData.items]
    );

    fetchMoreData();
  }, [tracksData]);

  return (
    <>
      <StyledHeader>
        <div className="header__inner">
          {playlist?.images?.length && playlist.images[0].url && (
            <img
              className="header__img"
              src={playlist.images[0].url}
              alt={"Playlist Artwork"}
            />
          )}
          <div>
            <div className="header__overline">Playlist</div>
            <h1 className="header__name">{playlist?.name}</h1>
            <p className="header__meta">
              {playlist?.followers?.total ? (
                <span>
                  {playlist.followers?.total}{" "}
                  {`follower${playlist.followers?.total !== 1 ? "s" : ""}`}
                </span>
              ) : null}
              <span>
                {playlist?.tracks?.total}{" "}
                {`song${playlist?.tracks?.total !== 1 ? "s" : ""}`}
              </span>
            </p>
          </div>
        </div>
      </StyledHeader>

      <main>
        <SectionWrapper title="Playlists">
          {tracks && <TrackList tracks={tracks.map(track => track.track)} />}
        </SectionWrapper>
      </main>
    </>
  );
};

export default Playlist;
