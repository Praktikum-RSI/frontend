"use client";

import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return <></>;
};

export default DashboardPage;
