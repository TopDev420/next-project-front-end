import ChargesForm from 'components/pages/my-page/property/Fees/Charges/Charges';
import GuestCharge from 'components/pages/my-page/property/Fees/Charges/GuestCharge';

const Charges = () => (
  <div className="bg-white p-6 shadow-lg my-4">
    <ChargesForm />
    <GuestCharge />
  </div>
);

export default Charges;
