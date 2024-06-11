"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Toaster, toast } from 'sonner'

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
import { createCategory } from "@/app/action"

const formSchema = z.object({
  category: z.string()
  .min(2, {
    message: "category must be at least 2 characters.",
  })
  .max(15, {
    message: "category cannot be longer than 15 characters."
  })
})

export function CategoryForm({type, gender, getCategoryData}:{type:string, gender:string, getCategoryData: () => void }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await createCategory({type: type.toUpperCase(), gender: gender.toUpperCase(), ...values})
      if (data.status == 'ok') {
        getCategoryData()
        toast.success(data.message)
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Create {gender}&apos;s {type} category</FormLabel>
              <div className="flex pt-3">
                <FormControl>
                  <Input placeholder="shadcn" {...field} className="rounded-r-none focus-visible:ring-transparent  text-sm h-8"/>
                </FormControl>
                <Button type="submit" className="rounded-l-none h-8">create</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
