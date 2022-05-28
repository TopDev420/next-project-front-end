import React from 'react';
import _ from 'lodash';
import { StepType } from 'types/ui/Stepper';

type IncompleteStepsProps = {
  steps: StepType[];
  onClickStep: (step: StepType) => void;
};

const IncompleteSteps: React.FC<IncompleteStepsProps> = ({
  steps,
  onClickStep,
}) => (
  <div className="bg-white p-6 shadow-lg">
    {steps.length > 0 && (
      <>
        <p>
          There are some steps need to be completed before you can publish the
          property:
        </p>
        <ul className="list-disc list-inside mt-4">
          {steps.map((step) => (
            <li key={step}>
              <button
                className="text-blue-700 hover:underline"
                type="button"
                onClick={() => onClickStep(step)}
              >
                {_.capitalize(step)}
              </button>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
);

export default IncompleteSteps;
