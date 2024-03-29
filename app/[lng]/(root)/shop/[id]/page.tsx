import ItemWindow from "@/components/shop/ItemWindow";
import { getServerSession } from "next-auth";
import React from "react";

const ItemPage = async ({
  params,
}: {
  params: { id: string; lng: string };
}) => {
  const session = await getServerSession();

  return (
    <div className="padding-container flex-col">
      <ItemWindow params={params} session={session} />
    </div>
  );
};

export default ItemPage;
