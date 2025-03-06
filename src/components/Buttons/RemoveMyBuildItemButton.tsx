"use client";

import { useTransition } from "react";
import { deleteMyBuildItemAction } from "@/actions/admin/myBuildAction";
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
    // Prompt the user to confirm the deletion
    if (!confirm("Are you sure you want to delete this build item?")) return;
    startTransition(async () => {
      const result = await deleteMyBuildItemAction(buildId, productId);

      if (result.success === false) {
        alert(result.message || "Something went wrong");
      } else {
        alert("Build item removed successfully");
      }
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
