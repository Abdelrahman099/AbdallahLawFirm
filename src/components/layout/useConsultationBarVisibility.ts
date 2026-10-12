import { useEffect, useState } from "react";

export function useConsultationBarVisibility(pathname: string) {
  const [visible, setVisible] = useState(pathname !== "/");
  useEffect(() => {
    if (pathname !== "/") {
      setVisible(true);
      return;
    }
    setVisible(false);
    const main = document.querySelector("main");
    if (!main) return;
    let observer: IntersectionObserver | undefined;
    const attach = () => {
      const hero = main.querySelector("section");
      if (!hero) return;
      observer = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(hero);
      pending.disconnect();
    };
    const pending = new MutationObserver(attach);
    pending.observe(main, { childList: true, subtree: true });
    attach();
    return () => {
      pending.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);
  return visible;
}
