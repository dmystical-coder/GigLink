'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWizard } from '../WizardProvider';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export function DescriptionStep() {
  const { formData, updateFormData } = useWizard();
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [formData.description]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ description: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="description">Detailed Description</Label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant={!isPreview ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setIsPreview(false)}
          >
            Write
          </Button>
          <Button
            type="button"
            variant={isPreview ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setIsPreview(true)}
          >
            Preview
          </Button>
        </div>
      </div>

      {isPreview ? (
        <div className="min-h-[300px] rounded-md border p-4 prose prose-sm max-w-none dark:prose-invert">
          {formData.description ? (
            <ReactMarkdown>{formData.description}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <div className="relative">
          <Textarea
            id="description"
            ref={textareaRef}
            placeholder="Describe the task in detail. You can use Markdown."
            className="min-h-[300px] resize-none font-mono"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            Markdown supported
          </div>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground">
        Provide as much detail as possible. Include requirements, acceptance criteria, and any resources needed.
      </p>
    </div>
  );
}
