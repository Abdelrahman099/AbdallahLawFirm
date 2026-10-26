import { useTranslate } from "@/i18n/useTranslate";
import { useState } from "react";
import { services } from "@/data/site";
import type { Service } from "@/data/services";
import { serviceGroups } from "@/data/serviceGroups";
import { matchesQuery } from "../serviceSearch";
import { useDirectoryParams } from "../useDirectoryParams";

export type FilterKey = "group" | "audience" | "q";
type FilterValues = Record<FilterKey, string>;
type FilterSource = {
  values: FilterValues;
  set: (key: FilterKey, value: string) => void;
  reset: () => void;
};

export const audiences = [
  { id: "all", title: "الجميع" },
  { id: "business", title: "الشركات والمستثمرون" },
  { id: "individual", title: "الأفراد" },
];

const empty: FilterValues = { group: "", audience: "", q: "" };

/** Filters stored in the page URL, so results can be linked and shared. */
export function useUrlFilters(): FilterSource {
  const { params, initialParams, setParams } = useDirectoryParams();
  return {
    values: {
      group: initialParams.get("group") || "",
      audience: initialParams.get("audience") || "",
      q: initialParams.get("q") || "",
    },
    set: (key, value) => {
      const next = new URLSearchParams(params);
      if (value && value !== "all") next.set(key, value);
      else next.delete(key);
      setParams(next, { replace: true });
    },
    reset: () => setParams({}, { replace: true }),
  };
}

/** Filters kept in component state, for previews that must not touch the URL. */
export function useLocalFilters(): FilterSource {
  const [values, setValues] = useState(empty);
  return {
    values,
    set: (key, value) =>
      setValues((current) => ({
        ...current,
        [key]: value === "all" ? "" : value,
      })),
    reset: () => setValues(empty),
  };
}

const forAudience = (service: Service, audience: string) =>
  audience === "all" ||
  service.audience === audience ||
  service.audience === "both";

export function useServiceDirectory(source: FilterSource) {
  const { t } = useTranslate();
  const { values } = source;
  const audience = ["business", "individual"].includes(values.audience)
    ? values.audience
    : "all";
  const group = serviceGroups.find((item) => item.id === values.group);
  const orderedServices = group
    ? group.slugs.flatMap((slug) => {
        const service = services.find((item) => item.slug === slug);
        return service ? [service] : [];
      })
    : services;
  const query = values.q;
  const inGroup = (service: Service, id = group?.id) =>
    !id || serviceGroups.find((g) => g.id === id)!.slugs.includes(service.slug);
  const count = (groupId: string | undefined, audienceId: string) =>
    services.filter(
      (s) =>
        forAudience(s, audienceId) &&
        inGroup(s, groupId) &&
        matchesQuery(s, query, t),
    ).length;
  return {
    ...source,
    audience,
    group,
    query,
    total: services.length,
    items: orderedServices.filter(
      (s) =>
        forAudience(s, audience) && inGroup(s) && matchesQuery(s, query, t),
    ),
    groupCount: (id: string) => count(id === "all" ? undefined : id, audience),
    audienceCount: (id: string) => count(group?.id, id),
    filtered: Boolean(group || audience !== "all" || query),
  };
}

export type ServiceDirectoryState = ReturnType<typeof useServiceDirectory>;
