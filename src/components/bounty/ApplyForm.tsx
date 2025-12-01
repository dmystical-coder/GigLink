'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  repoUrl: z.string().url('Please enter a valid URL').min(1, 'Repository URL is required'),
  notes: z.string().min(10, 'Please provide at least 10 characters of approach/notes'),
});

export type ApplyFormValues = z.infer<typeof formSchema>;

interface ApplyFormProps {
  onSubmit: (values: ApplyFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function ApplyForm({ onSubmit, isSubmitting = false }: ApplyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = async (data: ApplyFormValues) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="repoUrl">GitHub Repository URL</Label>
        <Input
          id="repoUrl"
          placeholder="https://github.com/username/repo"
          {...register('repoUrl')}
          className={errors.repoUrl ? 'border-red-500' : ''}
          data-testid="repo-url-input"
        />
        {errors.repoUrl && (
          <p className="text-sm text-red-500">{errors.repoUrl.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Approach & Notes</Label>
        <Textarea
          id="notes"
          placeholder="Briefly explain your implementation approach..."
          {...register('notes')}
          className={errors.notes ? 'border-red-500 min-h-[120px]' : 'min-h-[120px]'}
          data-testid="notes-input"
        />
        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="submit-application-button">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
