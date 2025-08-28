'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import withAuth from '@/app/auth/with-auth';
import { generateId } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/app/auth/context/auth-context';

const pollOptionSchema = z.object({
  text: z.string().min(1, { message: 'Option text is required' }),
});

const createPollSchema = z.object({
  question: z.string().min(5, { message: 'Question must be at least 5 characters' }),
  options: z.array(pollOptionSchema).min(2, { message: 'At least 2 options are required' }),
});

type CreatePollFormValues = z.infer<typeof createPollSchema>;

function CreatePollPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatePollFormValues>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: '',
      options: [
        { text: '' },
        { text: '' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  async function onSubmit(data: CreatePollFormValues) {
    if (!user) {
      form.setError('root', { message: 'You must be logged in to create a poll.' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('polls')
        .insert({
          question: data.question,
          options: data.options, // Supabase can handle JSON objects
          creator_id: user.id,
        });

      if (error) throw error;

      // Redirect to the dashboard on success
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error creating poll:', error);
      form.setError('root', {
        message: error.message || 'Failed to create poll. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const addOption = () => {
    append({ text: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What would you like to ask?" 
                        className="min-h-24"
                        disabled={isSubmitting}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-base">Options</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    disabled={isSubmitting || fields.length >= 10}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
                
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`options.${index}.text`}
                    render={({ field: optionField }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input 
                              placeholder={`Option ${index + 1}`} 
                              disabled={isSubmitting}
                              {...optionField} 
                            />
                            {fields.length > 2 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                disabled={isSubmitting}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(CreatePollPage);