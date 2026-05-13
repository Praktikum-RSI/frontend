"use client";

import { SWRConfig, SWRConfiguration } from "swr";
import { Toaster } from "./ui/sonner";
import { ToasterProps } from "sonner";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export const RootConfig = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) => {
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
    <SessionProvider session={session}>
      <SWRConfig value={swrConfig}>
        {children}
        <Toaster {...toasterConfig} />
      </SWRConfig>
    </SessionProvider>
  );
};
