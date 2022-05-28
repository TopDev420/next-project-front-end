import React, { useContext, useState, useCallback, useMemo } from 'react';
import PlusIcon from 'assets/images/icons/plus.svg';
import MinusIcon from 'assets/images/icons/minus.svg';
import ShiftDoubleIcon from 'assets/images/icons/shift-double.svg';
import ShiftIcon from 'assets/images/icons/shift.svg';
import { FaqCategory } from 'types/models/Faq';
import { FaqContext } from './FaqContext';

const FaqCategoryContainer = ({
  setCategory,
}: {
  setCategory: (id: number | null) => void;
}) => {
  const { categories } = useContext(FaqContext);
  const [currentParent, setCurrentParent] = useState<number | null>(
    categories && categories.length > 0 ? categories[0].id : null,
  );
  const [currentSubcategory, setCurrentSubcategory] = useState<number | null>(
    currentParent ? categories.find(({ id }) => id === currentParent).id : null,
  );

  const handleSubcategoryClick = useCallback(
    (id) => {
      setCurrentSubcategory(id);
      setTimeout(() => setCategory(id), 400);
    },
    [setCategory],
  );

  const subcategories = useMemo((): FaqCategory[] => {
    if (!categories) return [];
    const category = categories.find(
      ({ id: itemId }) => itemId === currentParent,
    );
    if (!category) return [];
    if (category.children.length) {
      handleSubcategoryClick(category.children[0].id);
    }
    return category.children;
  }, [categories, currentParent, handleSubcategoryClick]);

  const handleCategoryClick = useCallback(
    (id) => {
      if (!categories) return;
      const category = categories.find(({ id: itemId }) => itemId === id);
      if (!category) return;
      setCurrentParent(category.id);
    },
    [categories],
  );

  return (
    <>
      <div className="faq-category-parent mb-8">
        <h2 className="faq-category-parent__header border-b-2 pb-2 mb-4">
          Categories
        </h2>
        {categories && (
          <div className="faq-category-parent__content">
            <ul>
              {categories.map((category) => (
                <li
                  className={`transition-all duration-300 ease-in-out pr-2 hover:pl-2 hover:bg-gray-100 py-2 flex justify-between
                                            ${
                                              category.id === currentParent
                                                ? 'pl-2 bg-gray-200'
                                                : ''
                                            }`}
                  key={category.id}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    type="button"
                    className="flex-grow text-left"
                  >
                    {category.name}
                  </button>
                  {category.id === currentParent && (
                    <PlusIcon className="w-3" />
                  )}
                  {category.id !== currentParent && (
                    <MinusIcon className="w-3" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="faq-subcategory">
        <h2 className="faq-subcategory__header border-b-2 pb-2 mb-4">
          SubCategories
        </h2>
        <div className="faq-subcategory__content">
          <ul>
            {subcategories.map((item) => (
              <li
                className={`transition-all duration-300 ease-in-out pr-2 hover:pl-2 hover:bg-gray-100 py-2 flex
                            ${
                              item.id === currentSubcategory
                                ? 'pl-2 bg-gray-200'
                                : ''
                            }`}
                key={item.id}
              >
                {item.id === currentSubcategory && (
                  <ShiftDoubleIcon className="w-2" />
                )}
                {item.id !== currentSubcategory && (
                  <ShiftIcon className="w-2" />
                )}

                <button
                  type="button"
                  onClick={() => handleSubcategoryClick(item.id)}
                  className="ml-2 flex-grow text-left"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default FaqCategoryContainer;
