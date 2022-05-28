import InvalidFeedback from 'components/Error/InvalidFeedback';
import FormContext from 'components/pages/my-page/property/Description/FormContext';
import { useContext } from 'react';
import DescriptionEditor from 'components/pages/my-page/property/Description/Editor';

const Summary = () => {
  const { register } = useContext(FormContext);

  return (
    <div className="bg-white p-4 shadow-lg my-4">
      <div className="flex flex-col">
        <label className="font-bold mb-4" htmlFor="inputTitle">
          Title <span className="font-normal text-red-500">*</span>
        </label>
        <input
          id="inputTitle"
          className="border p-2 rounded mb-4"
          type="text"
          {...register('title')}
        />
      </div>
      <InvalidFeedback name="title" />
      <DescriptionEditor name="summary" label="Summary">
        <p className="text-sm mb-2">
          We recommend descriptions between 50 and 160 characters
        </p>
      </DescriptionEditor>
    </div>
  );
};

export default Summary;
