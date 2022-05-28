import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { ComponentProps } from 'react';
import EditorSkeleton from 'components/Editor/Skeleton';

export type EditorProps = Omit<ComponentProps<typeof CKEditor>, 'editor'>;

const Editor = (props: EditorProps) => (
  <CKEditor editor={ClassicEditor} {...props} />
);

Editor.Skeleton = EditorSkeleton;

export default Editor;
