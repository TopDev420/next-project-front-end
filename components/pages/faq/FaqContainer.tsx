/* eslint-disable react/no-danger */
import { useContext, useMemo } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { FaqContext } from './FaqContext';

const FaqContainer = () => {
  const { faqs, currentCategory, isQueried, queriedFaqs } =
    useContext(FaqContext);
  const selectedFaqs = useMemo(() => {
    if (isQueried) return queriedFaqs;
    if (!faqs) return [];
    const res = faqs.filter(({ categoryId }) => categoryId === currentCategory);
    return res;
  }, [currentCategory, faqs, isQueried, queriedFaqs]);
  return (
    <>
      {selectedFaqs.length > 0 && (
        <Accordion allowZeroExpanded allowMultipleExpanded>
          {selectedFaqs.map((faq) => (
            <AccordionItem
              className={`faq border-b ${
                isQueried || currentCategory === faq.categoryId
                  ? 'block'
                  : 'hidden'
              }`}
              key={faq.id}
              activeClassName="active"
            >
              <AccordionItemHeading>
                <AccordionItemButton>{faq.title}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div
                  className="faq__content"
                  dangerouslySetInnerHTML={{ __html: faq.description }}
                />
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      {!selectedFaqs.length && <div className="p-5">No Questions</div>}
    </>
  );
};
export default FaqContainer;
