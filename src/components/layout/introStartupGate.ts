declare global {
  interface Window {
    shehriIntroBootTimer?: number;
  }
}

export const homeIntroReplayEvent = "shehri-home-intro-replay";

export function releaseIntroStartupCover() {
  clearTimeout(window.shehriIntroBootTimer);
  document.documentElement.classList.remove(
    "intro-booting",
    "intro-load-failed",
  );
}

export function installIntroStartupGate() {
  const show = () => {
    clearTimeout(window.shehriIntroBootTimer);
    document.documentElement.classList.remove("intro-load-failed");
    document.documentElement.classList.add("intro-booting");
    window.shehriIntroBootTimer = window.setTimeout(() => {
      if (!document.documentElement.classList.contains("intro-booting")) return;
      document.documentElement.classList.remove("intro-booting");
      document.documentElement.classList.add("intro-load-failed");
    }, 10000);
  };
  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element ? event.target.closest("a") : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self") ||
        link.getAttribute("href")?.startsWith("#")
      )
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin === location.origin &&
        /^\/(?:en\/?)?$/.test(url.pathname)
      ) {
        show();
        // A same-page link may keep the current route mounted.
        if (/^\/(?:en\/?)?$/.test(location.pathname)) {
          window.dispatchEvent(new Event(homeIntroReplayEvent));
        }
      }
    },
    { capture: true },
  );
  window.addEventListener("popstate", () => {
    if (/^\/(?:en\/?)?$/.test(location.pathname)) show();
    else releaseIntroStartupCover();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && /^\/(?:en\/?)?$/.test(location.pathname)) show();
  });
}
