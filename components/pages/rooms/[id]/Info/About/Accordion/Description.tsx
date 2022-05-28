/* eslint-disable react/no-danger */

const Description = ({ html }: { html: string }) => (
  <div className="p-6 flex flex-col">
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
);

export default Description;
