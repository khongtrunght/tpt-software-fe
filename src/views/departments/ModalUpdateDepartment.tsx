import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IDepartment } from "@/interfaces/department.interface";
import { memo, useCallback, useEffect, useState } from "react";

export const ModalUpdateDepartment = memo(function ModalUpdateDepartment({
  open,
  setVisible,
  selectedDepartment,
}: {
  open: boolean;
  setVisible: (visible: boolean) => void;
  selectedDepartment: IDepartment | null;
}) {
  const [data, setData] = useState<IDepartment>({
    id: "",
    name: "",
    description: "",
    created_at: "",
    created_by: "",
  });
  const onValueChange = useCallback((key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      setData(selectedDepartment);
    }
  }, [selectedDepartment]);
  return (
    <Dialog open={open} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit department</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => onValueChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => onValueChange("description", e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
