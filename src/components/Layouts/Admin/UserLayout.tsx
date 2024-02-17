import TableUser from "@/components/Fragments/Table/TableUser";
import React from "react";

const UserLayout = ({ users }: { users: any }) => {
  const response = users;

  return (
    <div className="m-4">
      <TableUser users={response.users} />
    </div>
  );
};

export default UserLayout;
