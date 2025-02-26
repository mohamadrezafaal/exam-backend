export enum GeometryTypes {
  Point = 'Point',
  Linestring = 'LineString',
}

export interface GeoPoint {
  type: GeometryTypes.Point;
  coordinates: [number, number];
}

export interface GeoLineString {
  type: GeometryTypes.Linestring;
  coordinates: [number, number][];
}
