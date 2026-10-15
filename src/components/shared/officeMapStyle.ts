import type { StyleSpecification } from "maplibre-gl";

/* Brand palette mapped onto OpenMapTiles layers (served free by OpenFreeMap). */
const color = {
  land: "#ede3cf",
  urban: "#e6dbc4",
  park: "#d5d6b9",
  water: "#b7c6b6",
  building: "#dfd2b8",
  buildingLine: "#d2c3a6",
  road: "#f8f2e6",
  roadCasing: "#d6c8ad",
  major: "#fffaf1",
  motorway: "#e5cda4",
  motorwayCasing: "#c9ab7c",
  rail: "#cbbd9f",
  label: "#143e31",
  labelMuted: "#5d6a60",
  halo: "#efe6d4",
};

const name = ["coalesce", ["get", "name:ar"], ["get", "name"]];
const font = (bold = false) => [bold ? "Noto Sans Bold" : "Noto Sans Regular"];
const width = (stops: [number, number][]) => [
  "interpolate",
  ["exponential", 1.4],
  ["zoom"],
  ...stops.flat(),
];
const classIn = (...classes: string[]) => [
  "match",
  ["get", "class"],
  classes,
  true,
  false,
];

export const officeMapStyle = {
  version: 8,
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  sources: {
    omt: { type: "vector", url: "https://tiles.openfreemap.org/planet" },
  },
  layers: [
    {
      id: "land",
      type: "background",
      paint: { "background-color": color.land },
    },
    {
      id: "landuse",
      type: "fill",
      source: "omt",
      "source-layer": "landuse",
      filter: classIn("residential", "commercial", "retail", "industrial"),
      paint: { "fill-color": color.urban },
    },
    {
      id: "park",
      type: "fill",
      source: "omt",
      "source-layer": "park",
      paint: { "fill-color": color.park },
    },
    {
      id: "landcover",
      type: "fill",
      source: "omt",
      "source-layer": "landcover",
      filter: classIn("grass", "wood", "farmland"),
      paint: { "fill-color": color.park, "fill-opacity": 0.7 },
    },
    {
      id: "water",
      type: "fill",
      source: "omt",
      "source-layer": "water",
      paint: { "fill-color": color.water },
    },
    {
      id: "building",
      type: "fill",
      source: "omt",
      "source-layer": "building",
      minzoom: 14,
      paint: {
        "fill-color": color.building,
        "fill-outline-color": color.buildingLine,
      },
    },
    {
      id: "road-casing",
      type: "line",
      source: "omt",
      "source-layer": "transportation",
      filter: classIn("primary", "secondary", "tertiary", "trunk"),
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": color.roadCasing,
        "line-width": width([
          [10, 1.5],
          [18, 30],
        ]),
      },
    },
    {
      id: "road-minor",
      type: "line",
      source: "omt",
      "source-layer": "transportation",
      filter: classIn("minor", "service", "track"),
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": color.road,
        "line-width": width([
          [13, 0.8],
          [18, 14],
        ]),
      },
    },
    {
      id: "road-major",
      type: "line",
      source: "omt",
      "source-layer": "transportation",
      filter: classIn("primary", "secondary", "tertiary", "trunk"),
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": color.major,
        "line-width": width([
          [10, 0.8],
          [18, 26],
        ]),
      },
    },
    {
      id: "motorway-casing",
      type: "line",
      source: "omt",
      "source-layer": "transportation",
      filter: classIn("motorway"),
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": color.motorwayCasing,
        "line-width": width([
          [8, 1.5],
          [18, 34],
        ]),
      },
    },
    {
      id: "motorway",
      type: "line",
      source: "omt",
      "source-layer": "transportation",
      filter: classIn("motorway"),
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": color.motorway,
        "line-width": width([
          [8, 1],
          [18, 30],
        ]),
      },
    },
    {
      id: "rail",
      type: "line",
      source: "omt",
      "source-layer": "transportation",
      filter: classIn("rail", "transit"),
      paint: { "line-color": color.rail, "line-dasharray": [3, 3] },
    },
    {
      id: "water-name",
      type: "symbol",
      source: "omt",
      "source-layer": "water_name",
      layout: {
        "text-field": name,
        "text-font": font(),
        "text-size": 13,
      },
      paint: {
        "text-color": "#4f6b5c",
        "text-halo-color": color.water,
        "text-halo-width": 1,
      },
    },
    {
      id: "road-name",
      type: "symbol",
      source: "omt",
      "source-layer": "transportation_name",
      minzoom: 13,
      filter: classIn("motorway", "trunk", "primary", "secondary", "tertiary"),
      layout: {
        "symbol-placement": "line",
        "text-field": name,
        "text-font": font(),
        "text-size": ["interpolate", ["linear"], ["zoom"], 13, 11, 17, 14],
        "text-max-angle": 30,
      },
      paint: {
        "text-color": color.labelMuted,
        "text-halo-color": color.halo,
        "text-halo-width": 1.6,
      },
    },
    {
      id: "place",
      type: "symbol",
      source: "omt",
      "source-layer": "place",
      filter: classIn("suburb", "quarter", "neighbourhood", "city", "town"),
      layout: {
        "text-field": name,
        "text-font": font(true),
        "text-size": ["match", ["get", "class"], ["city", "town"], 16, 13],
        "text-max-width": 8,
      },
      paint: {
        "text-color": color.label,
        "text-opacity": 0.75,
        "text-halo-color": color.halo,
        "text-halo-width": 1.8,
      },
    },
  ],
} as StyleSpecification;
