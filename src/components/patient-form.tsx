"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react"
import { User } from "@/types/user"

const formSchema = z.object({
  name: z.string().min(1),
  age: z.string().min(1),
  sex: z.enum(["L", "P"])
})

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setUser: Dispatch<SetStateAction<User | null>>
}

export function PatientForm({setIsOpen, setUser}: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "Test",
        age: "20",
        sex: "L",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      setIsOpen(true)
      setUser({
        name: values.name,
        age: Number(values.age),
        sex: values.sex
      })
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Name</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-main rounded-lg" required placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Umur</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-main rounded-lg" required type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Jenis Kelamin</FormLabel>
              <FormControl>
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full focus-visible:ring-main rounded-lg">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P">Perempuan</SelectItem>
                      <SelectItem value="L">Laki - Laki</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-wrap justify-center">
          <Button className="rounded-lg bg-main hover:hover:bg-teal-400 font-semibold" type="submit">Konsultasi Kecerdasan Buatan</Button>
        </div>
      </form>
    </Form>
  )
}
