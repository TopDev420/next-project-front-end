import DescriptionEditor from 'components/pages/my-page/property/Description/Editor';

const Space = () => (
  <div className="bg-white p-4 shadow-lg my-4">
    <h3 className="mb-4">The Space</h3>
    <DescriptionEditor name="guestAccess" label="Lodging Description" />
    <DescriptionEditor name="guestInteraction" label="Guest Interaction" />
    <DescriptionEditor name="houseRules" label="House Rules" />
    <DescriptionEditor name="notes" label="Other things to Note" />
  </div>
);

export default Space;
