import Actions from 'components/pages/my-page/property/Actions';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Layout from 'components/pages/my-page/property/Layout';
import Prices from 'components/pages/my-page/property/Fees/Prices';
import Charges from 'components/pages/my-page/property/Fees/Charges';
import Bpg from 'components/pages/my-page/property/Fees/Bpg';
import Discounts from 'components/pages/my-page/property/Fees/Discounts';

const Fees: typeof Layout = ({
  title = 'Set a Nightly Price for Your Space',
  description = 'You can set a price to reflect the space, amenities, and hospitality you’ll be providing.',
  sideTitle = 'Charges per night',
  sideDescription = 'You may want attract your first few guests by offering a great deal. You can always increase your price after you’ve received some great reviews.',
}) => {
  const actionProps = useStep();

  const renderActions = () => (
    <Actions {...actionProps} showSaveButtons={false} />
  );

  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="fees"
    >
      {renderActions()}
      <Prices />
      {renderActions()}
      <Charges />
      {renderActions()}
      <Discounts />
      {renderActions()}
      <Bpg />
    </Layout>
  );
};

export default Fees;
