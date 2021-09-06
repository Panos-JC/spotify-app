import { ExternalUrlObject } from "./ExternalUrlObject";
import { ImageObject } from "./ImageObject";

export type SimplifiedAlbumObject = {
  album_type: string;
  artists: [];
  available_markets: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};
