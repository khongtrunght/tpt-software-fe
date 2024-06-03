import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IPosition } from "@/interfaces/positions.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  note: z.string(),
  created_at: z.string(),
  created_by: z.string(),
});
export const ModalUpdatePosition = memo(function ModalUpdatePosition({
  open,
  setVisible,
  selectedPosition,
}: {
  open: boolean;
  setVisible: (visible: boolean) => void;
  selectedPosition: IPosition | null;
}) {
  const form = useForm<IPosition>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      code: "",
      note: "",
      created_at: "",
      created_by: "",
    },
  });

  const onSubmit = useCallback((values: IPosition) => {
    console.log(values);
  }, []);

  useEffect(() => {
    if (selectedPosition) {
      form.reset(selectedPosition);
    } else form.reset();
  }, [form, selectedPosition]);
  return (
    <Dialog open={open} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {selectedPosition ? "Cập nhật chức vụ" : "Tạo mới chức vụ"}
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
                  <FormLabel>Tên chức vụ</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên chức vụ" {...field} />
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
                  <FormLabel>Mã chức vụ</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã chức vụ..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Mô tả về chức vụ</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
