"use client"

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
 } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1,{
        message:"Title is required"
    }),
});

const TitleForm = ({initialData,courseId}: TitleFormProps) => {
    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const [isEditing,setEditing] = useState(false);

    const toggleEdit = () => setEditing(current => !current);

    const {isSubmitting, isValid} = form.formState;

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Title updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }

  return (
    <div className='mt-6 border border-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Couse Title
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing && (<>Cancel</>)}
                {!isEditing && (
                    <>
                    <Pencil className='h-4 w-4 mr-2'/>
                    Edit Title
                    </>
                )}
            </Button>
        </div>
        {!isEditing && (
            <p className='text-sm mr-2 text-black'>
                {initialData.title}
            </p>
            )}
        {isEditing && (
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-4'
                >
                    <FormField 
                    control={form.control}
                    name='title'
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                disabled={isSubmitting}
                                placeholder='e.g. Introduction to Programming'
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className='flex items-center gap-x-2'>
                        <Button 
                        disabled={!isValid || isSubmitting}
                        type='submit'
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        )}
    </div>
  )
}

export default TitleForm