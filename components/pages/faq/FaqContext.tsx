import { createContext } from 'react';
import { Faq } from 'types/models/Faq';
import { FaqPageProps } from 'types/pages/faq';

export type FaqPageContextType = FaqPageProps & {
  currentCategory: number | null;
  queriedFaqs: Faq[];
  isQueried: boolean;
};
export const FaqContext = createContext<FaqPageContextType>(undefined);
