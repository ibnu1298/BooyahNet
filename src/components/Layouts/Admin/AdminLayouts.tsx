"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { use } from "react";
import UserLayout from "./UserLayout";
import PaymentLayout from "./PaymentLayout";

const AdminLayouts = ({ users, payments }: { users: any; payments: any }) => {
  console.log(users);

  let tabs = [
    {
      id: "payment",
      label: "Payment",
      content: (
        <>
          <PaymentLayout payments={payments} />
        </>
      ),
    },
    {
      id: "user",
      label: "User",
      content: (
        <>
          <UserLayout users={users} />
        </>
      ),
    },
  ];

  return (
    <div className="flex w-full md:w-1/2 flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        classNames={{
          tabList: "w-full relative p-1 bg-gray-700/50  rounded-lg mx-1",
          cursor: "w-full bg-teal-700",
          tab: "px-0 h-8",
          tabContent:
            "rounded-full px-4 text-white data-focus-visible:border-red-500",
        }}
        items={tabs}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default AdminLayouts;
