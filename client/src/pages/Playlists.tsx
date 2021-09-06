import { useEffect, useState } from "react";
import { PlaylistsGrid, SectionWrapper } from "../components";
import { getCurrentUserPlaylists } from "../spotify";
import { handleError } from "../utils";

const Playlists = () => {
  const [playlists, setPlaylists] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await handleError(getCurrentUserPlaylists());

      setPlaylists(data);
      return data;
    };

    fetchData();
  }, []);

  return (
    <SectionWrapper title="Playlists" breadcrumb>
      <PlaylistsGrid playlists={playlists.items} />
    </SectionWrapper>
  );
};

export default Playlists;
