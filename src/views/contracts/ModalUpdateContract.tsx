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
import { IContractType } from "@/interfaces/contract.interface";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string(),
  number_of_months: z.number().min(1),
  created_at: z.string(),
  note: z.string(),
  created_by: z.string(),
  is_probation: z.boolean(),
  tax_policy: z.string(),
  insurance_policy: z.string(),
  template: z.string(),
});

export const ModalUpdateContract = memo(function ModalUpdateContract({
  open,
  setVisible,
  selected,
}: {
  open: boolean;
  setVisible: (visible: boolean) => void;
  selected: IContractType | null;
}) {
  const form = useForm<IContractType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      code: "",
      description: "",
      number_of_months: 0,
      created_at: "",
      note: "",
      created_by: "",
      is_probation: false,
      tax_policy: "",
      insurance_policy: "",
      template: "",
    },
  });

  const onSubmit = useCallback((values: IDepartment) => {
    console.log(values);
  }, []);

  useEffect(() => {
    if (selected) {
      form.reset(selected);
    } else form.reset();
  }, [form, selected]);
  return (
    <Dialog open={open} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {selected ? "Cập nhật loại hợp đồng" : "Tạo mới loại hợp đồng"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên hợp đồng</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên hợp đồng" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã hợp đồng</FormLabel>
                  <FormControl>
                    <Input placeholder="Mã hợp đồng..." {...field} />
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
                    <Input placeholder="Mô tả" {...field} />
                  </FormControl>
                  <FormDescription>Mô tả về hợp đồng</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number_of_months"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tháng</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Số tháng" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Input placeholder="Ghi chú" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="created_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Người tạo</FormLabel>
                  <FormControl>
                    <Input placeholder="Người tạo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_probation"
              render={({ field }) => (
                <FormItem className="flex items-center gap-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Thử việc</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tax_policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chính sách thuế</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chính sách thuế" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        Chính sách 1
                      </SelectItem>
                      <SelectItem value="m@google.com">
                        {" "}
                        Chính sách 2
                      </SelectItem>
                      <SelectItem value="m@support.com">
                        Chính sách 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurance_policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chính sách bảo hiểm</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chính sách bảo hiểm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        Chính sách 1
                      </SelectItem>
                      <SelectItem value="m@google.com">
                        {" "}
                        Chính sách 2
                      </SelectItem>
                      <SelectItem value="m@support.com">
                        Chính sách 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mẫu</FormLabel>
                  <FormControl>
                    <Input placeholder="Mẫu" {...field} />
                  </FormControl>
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
