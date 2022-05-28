import React from 'react';
import Layout from 'components/pages/my-page/property/Layout';
import Bedrooms from 'components/pages/my-page/property/Basics/Bedrooms';
import Actions from 'components/pages/my-page/property/Actions';
import useStep from 'components/pages/my-page/property/Actions/useStep';
import Bathrooms from 'components/pages/my-page/property/Basics/Bathrooms';

const Basics: typeof Layout = ({
  title = 'Help Travelers Find the Right Fit',
  description = 'People searching on Vacation.Rentals can filter by listing basics to find a space that matches their needs.',
  sideTitle = 'Bedroom/Bathroom',
  sideDescription = "Tell your guests how many bedrooms and bathrooms your property has. If you have multiple beds in the same bedroom, you can state that as well. For sleeper sofas in the living room, simply name the bedroom 'Living Room' and select the number of sleeper sofas you have.",
}) => {
  const actionProps = useStep();

  const renderActions = () => (
    <Actions showSaveButtons={false} {...actionProps} />
  );
  return (
    <Layout
      title={title}
      description={description}
      sideTitle={sideTitle}
      sideDescription={sideDescription}
      step="basics"
    >
      {renderActions()}
      <Bedrooms />
      <Bathrooms />
      {renderActions()}
    </Layout>
  );
};

export default Basics;
