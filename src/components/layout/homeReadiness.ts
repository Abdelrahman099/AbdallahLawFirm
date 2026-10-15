export function waitForHomeReady(signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    let decoding = false;
    let settled = false;
    const observer = new MutationObserver(check);
    const timeout = setTimeout(finish, 8000);
    function finish() {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearTimeout(timeout);
      signal.removeEventListener("abort", finish);
      resolve();
    }
    function check() {
      if (decoding || settled) return;
      const home = document.querySelector("main .home-page");
      if (!home) return;
      decoding = true;
      const image = home.querySelector("img");
      const images = [
        ...document.querySelectorAll<HTMLImageElement>(".site-header img"),
        ...(image ? [image] : []),
      ];
      const visuals = images.map((asset) =>
        asset.decode().catch(() => undefined),
      );
      void Promise.all([document.fonts.ready, ...visuals]).then(finish);
    }
    signal.addEventListener("abort", finish, { once: true });
    if (signal.aborted) {
      finish();
      return;
    }
    observer.observe(document.getElementById("main-content") || document.body, {
      childList: true,
      subtree: true,
    });
    check();
  });
}
