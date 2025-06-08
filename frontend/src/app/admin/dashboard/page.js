"use client";
import React from "react";
import AdminList from "@/components/AdminList";
import ContactTable from "@/components/ContactTable";
import PageContentEditor from "@/components/PageContentEditor";

const Page = () => {
  return (
    <div className={"grid grid-cols-1 gap-4 xl:container xl:mx-auto"}>
      <PageContentEditor/>
      <AdminList />
      <ContactTable />
    </div>
  );
};

export default Page;
