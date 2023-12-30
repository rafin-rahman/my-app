import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { prisma } from "../../../../../lib/prisma";

async function getData() {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
export default async function ManageUsers() {
  const data = await getData();
  // add row number to data, data does not contain row number field
  data.map((item, index) => {
    item.rowNumber = index + 1;
  });

  if (!data) {
    return <div className={"text-5xl"}>Ops! No user found &#128542;</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
