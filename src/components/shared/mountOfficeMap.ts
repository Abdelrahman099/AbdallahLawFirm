import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { officeMapStyle } from "./officeMapStyle";

const rtlPlugin = "/vendor/mapbox-gl-rtl-text-0.3.0.js";

function ensureRtlText() {
  if (maplibregl.getRTLTextPluginStatus() === "unavailable")
    maplibregl.setRTLTextPlugin(rtlPlugin, true).catch(() => {
      /* Arabic labels fall back to unshaped text. */
    });
}

function officeMarker(name: string, href: string) {
  const el = document.createElement("a");
  el.className = "office-map-marker";
  el.href = href;
  el.target = "_blank";
  el.rel = "noreferrer";
  el.setAttribute("role", "link");
  el.setAttribute("aria-label", `افتح عنوان ${name} في خرائط Google`);
  el.innerHTML = `
    <span class="office-map-pulse" aria-hidden="true"></span>
    <span class="office-map-pin">
      <img src="/brand/v4/mark-beige.svg" alt="" width="40" height="34" />
    </span>
    <span class="office-map-label"></span>`;
  el.querySelector(".office-map-label")!.textContent = name;
  return el;
}

export function mountOfficeMap(
  container: HTMLElement,
  options: {
    lng: number;
    lat: number;
    name: string;
    href: string;
    insetRight?: number;
    onReady: () => void;
    onUnavailable: () => void;
  },
) {
  ensureRtlText();
  const center: [number, number] = [options.lng, options.lat];
  const map = new maplibregl.Map({
    container,
    style: officeMapStyle,
    center,
    zoom: 15.4,
    minZoom: 11,
    maxZoom: 18,
    attributionControl: false,
    cooperativeGestures: true,
    dragRotate: false,
    pitchWithRotate: false,
    locale: {
      "CooperativeGesturesHandler.WindowsHelpText":
        "استخدم Ctrl مع التمرير لتكبير الخريطة",
      "CooperativeGesturesHandler.MacHelpText":
        "استخدم ⌘ مع التمرير لتكبير الخريطة",
      "CooperativeGesturesHandler.MobileHelpText":
        "استخدم إصبعين لتحريك الخريطة",
      "NavigationControl.ZoomIn": "تكبير",
      "NavigationControl.ZoomOut": "تصغير",
    },
  });
  let loaded = false;
  map.on("error", (event) => {
    if (!loaded && "sourceId" in event && event.sourceId === "omt")
      options.onUnavailable();
  });
  map.touchZoomRotate.disableRotation();
  // Keep the pin clear of the address card that overlays the map.
  if (options.insetRight)
    map.jumpTo({ center, padding: { right: options.insetRight } });
  map.addControl(
    new maplibregl.NavigationControl({ showCompass: false }),
    "top-left",
  );
  map.addControl(
    new maplibregl.AttributionControl({ compact: true }),
    "bottom-left",
  );
  // Credits stay one tap away instead of covering the map on load.
  map.once("load", () => {
    loaded = true;
    container
      .querySelector(".maplibregl-compact-show")
      ?.classList.remove("maplibregl-compact-show");
    options.onReady();
  });
  new maplibregl.Marker({
    element: officeMarker(options.name, options.href),
    anchor: "bottom",
  })
    .setLngLat(center)
    .addTo(map);
  return () => map.remove();
}
