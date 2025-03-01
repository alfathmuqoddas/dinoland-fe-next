"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useActionState } from "react";
import { editBuildAction } from "@/actions/admin/myBuildAction";
import { Button } from "../ui/button";

export function EditMyBuild({
  initialData,
}: {
  initialData: { name: string; description: string; id: string | number };
}) {
  const [state, editBuild, isPending] = useActionState(editBuildAction, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} variant={"blue"}>
          Edit Build
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Build</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={editBuild} className="flex flex-col gap-4">
          <div>
            <label htmlFor="buildName" className="text-right">
              Build Name
            </label>
            <input
              id="buildName"
              name="buildName"
              placeholder="Enter Build Name"
              className="brutalist-input"
              defaultValue={initialData.name}
              required
            />
          </div>
          <div className="">
            <label htmlFor="buildDescription" className="text-right">
              Build Description
            </label>
            <input
              id="buildDescription"
              name="buildDescription"
              defaultValue={initialData.description}
              placeholder="Enter Build Description"
              className="brutalist-input"
            />
            <input type="hidden" name="buildId" value={initialData.id} />
          </div>
          {state && <div>{state.message}</div>}
          <DialogFooter>
            <Button type="submit" variant={"warning"} disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
