import { useEffect, useState } from "react";
import { RangeButtons, SectionWrapper, TrackList } from "../components";
import { getTopTracks } from "../spotify";
import { handleError } from "../utils";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<any>({});
  const [range, setRange] = useState<"short" | "medium" | "long">("short");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await handleError(getTopTracks(`${range}_term`));

      setTopTracks(data);
      return data;
    };

    fetchData();
  }, [range]);

  return (
    <main>
      {topTracks && (
        <SectionWrapper title="Top Tracks" breadcrumb>
          <RangeButtons range={range} setRange={setRange} />

          <TrackList tracks={topTracks.items} />
        </SectionWrapper>
      )}
    </main>
  );
};

export default TopTracks;
