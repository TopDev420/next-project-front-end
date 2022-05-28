import DescriptionEditor from 'components/pages/my-page/property/Description/Editor';

const NeighborHood = () => (
  <div className="bg-white p-4 shadow-lg my-4">
    <h3 className="mb-4">The Neighborhood</h3>
    <DescriptionEditor name="neighborOverview" label="Overview" />
    <DescriptionEditor name="neighborGettingAround" label="Getting Around" />
  </div>
);

export default NeighborHood;
