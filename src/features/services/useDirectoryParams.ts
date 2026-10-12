import { useClientReady } from "@/lib/useClientReady";
import { useSearchParams } from "react-router-dom";

export function useDirectoryParams() {
  const [params, setParams] = useSearchParams();
  const hydrated = useClientReady();
  const initialParams = hydrated ? params : new URLSearchParams();
  return { params, initialParams, setParams };
}
