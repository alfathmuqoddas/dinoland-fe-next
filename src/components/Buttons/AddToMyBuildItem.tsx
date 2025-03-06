"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { addBuildItemAction } from "@/actions/admin/myBuildAction";

export default function AddToMyBuildItem({
  buildId,
  productId,
}: {
  buildId: string | string[] | undefined;
  productId: number;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleAddToMyBuildItem() {
    startTransition(async () => {
      const result = await addBuildItemAction(buildId, productId);

      if (result.success === false) {
        alert(result.message || "Something went wrong");
      } else {
        alert("Build item added successfully");
      }
    });
  }

  return (
    <Button
      variant={"blue"}
      size={"sm"}
      onClick={handleAddToMyBuildItem}
      disabled={isPending}
    >
      Add <Plus size={8} />
    </Button>
  );
}
