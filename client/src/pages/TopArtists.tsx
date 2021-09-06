import { useState, useEffect } from "react";
import { ArtistsGrid, RangeButtons, SectionWrapper } from "../components";
import { getTopArtists } from "../spotify";
import { handleError } from "../utils";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState<any>({});
  const [range, setRange] = useState<"short" | "medium" | "long">("short");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await handleError(getTopArtists(`${range}_term`));

      setTopArtists(data);
      return data;
    };

    fetchData();
  }, [range]);

  return (
    <main>
      {topArtists && (
        <SectionWrapper title="Top artists" breadcrumb>
          <RangeButtons range={range} setRange={setRange} />

          <ArtistsGrid artists={topArtists.items?.slice(0, 10)} />
        </SectionWrapper>
      )}
    </main>
  );
};

export default TopArtists;
