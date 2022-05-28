import React, { useState, useEffect } from 'react';
import Icon from 'components/Pagination/icons';

type PaginationProps = {
  page?: number;
  onChange: (page: number) => void;
  totalPage?: number;
};

const BUTTON_SIZE = 16;

const Pagination: React.FC<PaginationProps> = ({
  page = 1,
  totalPage = 1,
  onChange = () => {},
}) => {
  const [inputPage, setInputPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const hasNext = page < totalPage;
  const hasPrev = page > 1;
  const handleClickNext = () => {
    onChange(page + 1);
  };
  const handleClickPrev = () => onChange(page - 1);
  const handleClickFirst = () => onChange(1);
  const handleClickLast = () => onChange(totalPage);

  const handleBlur = (e: any) => {
    const newPage = parseInt(e.target.value, 10);
    if (newPage >= 1 && newPage <= totalPage) {
      onChange(newPage);
    } else {
      onChange(1);
    }
    setInputPage(false);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <ul className="pagination">
      <li className="pagination--navItem pagination--navItem__first">
        <button type="button" onClick={handleClickFirst}>
          <Icon.FirstPage width={BUTTON_SIZE} height={BUTTON_SIZE} />
        </button>
      </li>
      <li
        className={`pagination--navItem pagination--navItem__prev ${
          hasPrev ? '' : 'pagination--navItem--disabled'
        }`}
      >
        <button type="button" disabled={!hasPrev} onClick={handleClickPrev}>
          <Icon.PrevPage width={BUTTON_SIZE} height={BUTTON_SIZE} />
        </button>
      </li>
      <li className="pagination--navItem">
        {inputPage ? (
          <input
            type="number"
            min="1"
            max={totalPage}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
            onBlur={handleBlur}
          />
        ) : (
          <button type="button" onClick={() => setInputPage(true)}>
            {currentPage}
          </button>
        )}
      </li>
      <li
        className={`pagination--navItem pagination--navItem__next ${
          hasNext ? '' : 'pagination--navItem--disabled'
        }`}
      >
        <button type="button" disabled={!hasNext} onClick={handleClickNext}>
          <Icon.NextPage width={BUTTON_SIZE} height={BUTTON_SIZE} />
        </button>
      </li>
      <li className="pagination--navItem pagination--navItem__last">
        <button type="button" onClick={handleClickLast}>
          <Icon.LastPage width={BUTTON_SIZE} height={BUTTON_SIZE} />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
