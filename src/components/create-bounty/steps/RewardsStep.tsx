'use client';

import { useWizard } from '../WizardProvider';
import { Label } from '@/components/ui/label';
import { TokenAmountInput } from '../TokenAmountInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { DatePicker } from '@/components/ui/date-picker';

export function RewardsStep() {
  const { formData, updateFormData } = useWizard();

  return (
    <div className="space-y-6">
      <TokenAmountInput
        amount={formData.rewardAmount}
        token={formData.rewardToken}
        onAmountChange={(val) => updateFormData({ rewardAmount: val })}
        onTokenChange={(val) => updateFormData({ rewardToken: val })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            date={formData.deadline}
            setDate={(date) => updateFormData({ deadline: date })}
            placeholder="Select deadline"
          />
          <p className="text-xs text-muted-foreground">
            When should this task be completed?
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(val: any) => updateFormData({ difficulty: val })}
          >
            <SelectTrigger id="difficulty" className="rounded-xl border-slate-200">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Estimated complexity of the task.
          </p>
        </div>
      </div>
    </div>
  );
}
