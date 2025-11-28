'use client';

import { useWizard } from './WizardProvider';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { DescriptionStep } from './steps/DescriptionStep';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder steps
const RewardsStep = () => <div>Rewards Step (Coming Soon)</div>;
const ReviewStep = () => <div>Review Step (Coming Soon)</div>;

export function CreateBountyForm() {
  const { step, nextStep, prevStep, isFirstStep, isLastStep } = useWizard();

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
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <Button onClick={nextStep}>
            {isLastStep ? 'Submit Bounty' : 'Next Step'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
