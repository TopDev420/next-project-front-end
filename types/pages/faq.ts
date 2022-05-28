import { Faq, FaqCategory } from 'types/models/Faq';

export type FaqPageProps = {
  categories: FaqCategory[];
  faqs: Faq[];
};

export type FaqSearchType = {
  query: string;
};
