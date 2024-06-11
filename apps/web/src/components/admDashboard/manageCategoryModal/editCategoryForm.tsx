"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {  toast } from 'sonner'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editCategory } from "@/app/action"

const formSchema = z.object({
  newCategory: z.string()
  .min(2, {
    message: "category must be at least 2 characters.",
  })
  .max(15, {
    message: "category cannot be longer than 15 characters."
  })
})

export function EditCategoryForm({type, gender, category, setOpen, getCategoryData}:{type:string, gender:string, setOpen:React.Dispatch<React.SetStateAction<boolean>>, category:string, getCategoryData: () => void }) {
  
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newCategory: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>, e:any) {
    try {
      const data = await editCategory({type: type.toUpperCase(), gender: gender.toUpperCase(), category, ...values})
      if (data.status == 'ok') {
        getCategoryData()
        toast.success(data.message)
        setOpen(false);
        form.reset()
      } else if (data.message == 'category already exists') {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="newCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-lg">Edit category name</FormLabel>
              <div className="flex pt-3">
                <FormControl>
                  <Input placeholder={category} {...field} className="rounded-r-none focus-visible:ring-transparent"/>
                </FormControl>
                <Button type="submit" className="rounded-l-none">save</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
