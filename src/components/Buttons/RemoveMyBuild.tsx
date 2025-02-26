"use client";
import { Trash } from "lucide-react";
import { deleteBuildAction } from "@/actions/admin/myBuildAction";
import { useTransition } from "react";
import { Button } from "../ui/button";

export default function RemoveMyBuild({ buildId }: { buildId: any }) {
  const [isPending, startTransition] = useTransition();

  async function handleRemoveMyBuild() {
    if (confirm("Are you sure you want to delete this build?")) {
      startTransition(async () => {
        const result = await deleteBuildAction(buildId);

        if (result?.success === false) {
          alert(result?.message || "Something went wrong");
        }
      });
    } else {
      return;
    }
  }

  return (
    <Button
      variant={"destructive"}
      size={"lg"}
      onClick={handleRemoveMyBuild}
      disabled={isPending}
    >
      Delete <Trash className="h-4 w-4" />
    </Button>
  );
}
