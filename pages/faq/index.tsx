import { useState, useCallback } from 'react';
import SearchIcon from 'assets/images/icons/search.svg';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { FaqPageProps } from 'types/pages/faq';
import { faqSearch, getFaqPageProps } from 'lib/apis/faq';
import {
  FaqContext,
  FaqPageContextType,
} from 'components/pages/faq/FaqContext';
import FaqCategoryContainer from 'components/pages/faq/FaqCategoryContainer';
import FaqContainer from 'components/pages/faq/FaqContainer';
import { Faq } from 'types/models/Faq';

const FaqPage: NextPage<FaqPageProps> = (props: FaqPageProps) => {
  const [query, setQuery] = useState<string>('');
  const [faqContext, setFaqContext] = useState<FaqPageContextType>({
    ...props,
    currentCategory: null,
    queriedFaqs: [],
    isQueried: false,
  });

  const setCategory = useCallback((id: number | null) => {
    setFaqContext((old) => ({ ...old, currentCategory: id, isQueried: false }));
  }, []);

  const onSearch = useCallback(() => {
    if (!query) return;
    faqSearch({ query }).then((response: Faq[]) => {
      setFaqContext((old) => ({
        ...old,
        isQueried: true,
        queriedFaqs: response,
      }));
    });
  }, [query]);

  return (
    <div className="faq-page">
      <div className="faq-banner">
        <Image
          src="https://res.cloudinary.com/vacation-rentals/image/upload/v1583534073/images/rooms/11753/1583534072_1520.jpg"
          layout="fill"
          objectFit="cover"
          alt="Vacation.Rentals"
          className="max-h-80"
        />
        <div className="faq-banner__inner absolute w-full h-full flex justify-center items-end">
          <div className="pt-20 pb-20 flex faq-banner__search-box w-4/5 sm:w-96">
            <input
              className="pl-10 pr-5 py-3 rounded-l-full w-full"
              placeholder="Please Input Keyword"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex p-3 pr-5 bg-white rounded-r-full cursor-pointer">
              <button type="button" onClick={onSearch}>
                {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search"
                                    className="svg-inline--fa fa-search fa-w-16 fa-lg w-4"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                                </svg> */}
                <SearchIcon className="w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <FaqContext.Provider value={faqContext}>
        <div className="flex justify-center py-10 bg-gray-100">
          <div className="w-full max-w-screen-xl flex gap-x-8 flex-col sm:flex-row">
            <div className="w-full sm:max-w-sm px-5 py-10 shadow-xl bg-white mb-5">
              <FaqCategoryContainer setCategory={setCategory} />
            </div>
            <div className="flex-grow px-10 py-10 shadow-xl bg-white">
              <FaqContainer />
            </div>
          </div>
        </div>
      </FaqContext.Provider>
    </div>
  );
};

export default FaqPage;

export const getServerSideProps: GetServerSideProps<FaqPageProps> = async ({
  req,
}) => {
  const props = await getFaqPageProps(req);

  return { props };
};
