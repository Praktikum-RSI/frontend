"use client";

import { SWRConfig, SWRConfiguration } from "swr";
import { Toaster } from "./ui/sonner";
import { ToasterProps } from "sonner";

export const RootConfig = ({ children }: { children: React.ReactNode }) => {
  const swrConfig: SWRConfiguration = {
    fetcher: (resource, init) =>
      fetch(resource, init).then((res) => res.json()),
    suspense: true,
  };

  const toasterConfig: ToasterProps = {
    position: "top-right",
    duration: 4000,
    richColors: true,
    theme: "light",
  };

  return (
    <SWRConfig value={swrConfig}>
      {children}
      <Toaster {...toasterConfig} />
    </SWRConfig>
  );
};
