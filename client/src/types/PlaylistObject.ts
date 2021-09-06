import { ArtistObject } from "./shared/ArtistObject";
import { ExternalIdObject } from "./shared/ExternalIdObject";
import { ExternalUrlObject } from "./shared/ExternalUrlObject";
import { FollowersObject } from "./shared/FollowersObject";
import { ImageObject } from "./shared/ImageObject";
import { PublicUserObject } from "./shared/PublicUserObject";
import { SimplifiedAlbumObject } from "./shared/SimplifiedAlbumObject";

export type PlaylistObject = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrlObject;
  followers: FollowersObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: PublicUserObject;
  public: boolean;
  snapshot_id: string;
  tracks: TracksObject;
  type: string;
  uri: string;
};

export type TracksObject = {
  href: string;
  items: ItemsObject[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type ItemsObject = {
  added_at: string;
  added_by: {
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: any;
  track: TrackObject;
  video_thumbnail: any;
};

type TrackObject = {
  album: SimplifiedAlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIdObject;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: string;
  type: string;
  uri: string;
};
