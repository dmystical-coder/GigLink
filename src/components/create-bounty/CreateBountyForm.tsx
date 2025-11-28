'use client';

import { useWizard } from './WizardProvider';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { DescriptionStep } from './steps/DescriptionStep';
import { RewardsStep } from './steps/RewardsStep';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { BountyCardPreview } from './BountyCardPreview';
import { usePublishBounty } from '@/hooks/usePublishBounty';
import { DeployButton } from './DeployButton';
import { CreateBountyFormValues } from '@/lib/schemas/bounty';

const ReviewStep = () => {
  const { formData } = useWizard();
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">Ready to publish?</p>
        <p>Review your bounty details below. Once published, it will be visible to all workers.</p>
      </div>
      <BountyCardPreview data={formData} />
    </div>
  );
};

export function CreateBountyForm() {
  const { step, nextStep, prevStep, isFirstStep, isLastStep, formData } = useWizard();
  const { publishBounty, isLoading, isSuccess } = usePublishBounty();

  const handleSubmit = async () => {
    // Transform formData to match CreateBountyFormValues if necessary
    // For now, we assume the hook handles the types or we cast it
    // In a real app, we would validate with Zod here before submitting
    await publishBounty(formData as unknown as CreateBountyFormValues);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep />;
      case 2:
        return <DescriptionStep />;
      case 3:
        return <RewardsStep />;
      case 4:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Basic Information';
      case 2:
        return 'Detailed Description';
      case 3:
        return 'Rewards & Settings';
      case 4:
        return 'Review & Submit';
      default:
        return '';
    }
  };

  if (isSuccess) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Bounty Published!</h2>
          <p className="text-muted-foreground mb-6">
            Your bounty is now live on the blockchain.
          </p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex items-center ${
              s < 4 ? 'w-full' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                s <= step
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-muted text-muted-foreground'
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  s < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getStepTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep || isLoading}
          >
            Back
          </Button>
          
          {isLastStep ? (
            <div className="w-full max-w-[200px]">
              <DeployButton 
                isLoading={isLoading} 
                onClick={handleSubmit} 
              />
            </div>
          ) : (
            <Button onClick={nextStep}>
              Next Step
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
