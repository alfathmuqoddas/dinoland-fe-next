"use client";

import { useTransition } from "react";
import { deleteMyBuildItemAction } from "@/features/profile/actions";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function RemoveMyBuildItemButton({
  buildId,
  productId,
}: {
  buildId: any;
  productId: any;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleRemoveMyBuildItem() {
    if (!confirm("Are you sure you want to delete this build item?")) return;
    startTransition(async () => {
      await deleteMyBuildItemAction(buildId, productId);
    });
  }

  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      disabled={isPending}
      onClick={handleRemoveMyBuildItem}
    >
      <Trash size={8} />
    </Button>
  );
}
