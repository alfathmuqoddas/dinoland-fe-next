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
import { Plus } from "lucide-react";
import { useActionState } from "react";
import { addNewBuildAction } from "@/actions/admin/myBuildAction";
import { Button } from "../ui/button";

export function AddNewBuild() {
  const [state, addNewBuild, isPending] = useActionState(
    addNewBuildAction,
    null
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} variant={"warning"}>
          New Build
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Build</DialogTitle>
          <DialogDescription>
            {/* Add New Build. Click save when you're done. */}
          </DialogDescription>
        </DialogHeader>
        <form action={addNewBuild} className="flex flex-col gap-4">
          <div>
            <label htmlFor="buildName" className="text-right">
              Build Name
            </label>
            <input
              id="buildName"
              name="buildName"
              placeholder="Enter Build Name"
              className="brutalist-input"
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
              placeholder="Enter Build Description"
              className="brutalist-input"
            />
          </div>
          {state ? <div>{state.message}</div> : <></>}
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
