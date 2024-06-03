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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  created_by: z.string(),
});

export const ModalUpdateDepartment = memo(function ModalUpdateDepartment({
  open,
  setVisible,
  selectedDepartment,
}: {
  open: boolean;
  setVisible: (visible: boolean) => void;
  selectedDepartment: IDepartment | null;
}) {
  const form = useForm<IDepartment>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      code: "",
      description: "",
      created_at: "",
      created_by: "",
    },
  });

  const onSubmit = useCallback((values: IDepartment) => {
    console.log(values);
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      form.reset(selectedDepartment);
    } else form.reset();
  }, [form, selectedDepartment]);
  return (
    <Dialog open={open} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {selectedDepartment ? "Cập nhật phòng ban" : "Tạo mới phòng ban"}
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên phòng ban</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên phòng ban" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã phòng ban</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã phòng ban..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Mô tả về phòng bàn</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
