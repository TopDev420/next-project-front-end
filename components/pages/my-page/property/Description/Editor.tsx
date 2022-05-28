import EditorSkeleton from 'components/Editor/Skeleton';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import FormContext from 'components/pages/my-page/property/Description/FormContext';
import { UpdatePropertyDescriptionInput } from 'lib/forms/property';
import InvalidFeedback from 'components/Error/InvalidFeedback';
import editorConfig from 'constants/editorConfig';

const Editor = dynamic(() => import('components/Editor'), {
  ssr: false,
  loading: EditorSkeleton,
});

type DescriptionEditorProps = Omit<
  React.ComponentProps<typeof Editor>,
  'config'
> & {
  label: string;
  name: keyof Omit<UpdatePropertyDescriptionInput, 'propertyId'>;
};

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  label,
  name,
  children,
  ...props
}) => {
  const id = `input${_.startCase(_.camelCase(name))}`;
  const { control } = useContext(FormContext);
  return (
    <div className="flex flex-col">
      <label className="font-bold mb-4 mt-2" htmlFor={id}>
        {label}
      </label>
      {children}
      <InvalidFeedback name={name} />
      <div className="mb-4">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Editor
              id={id}
              data={value}
              onChange={(_event, editor) => onChange(editor.getData())}
              config={editorConfig}
              {...props}
            />
          )}
        />
      </div>
    </div>
  );
};
export default DescriptionEditor;
