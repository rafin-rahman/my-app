import { columns } from "./columns";
import { DataTable } from "./data-table";
import { prisma } from "../../../../../lib/prisma";

async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

function addRowNumberToUserModel(users) {
  users.map((item, index) => {
    item.rowNumber = index + 1;
  });
  return users;
}

export default async function ManageUsers() {
  let users = await getAllUsers();

  if (!users) {
    return <div className={"text-5xl"}>Ops! No user found &#128542;</div>;
  }

  users = addRowNumberToUserModel(users);

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
}
