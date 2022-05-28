import DashboardLayout from 'components/Layouts/DashboardLayout';
import UpdateCalendar from 'components/pages/my-page/property/ReservationKey/UpdateCalendar';
import { NextPage } from 'next';

const UpdateProperty: NextPage = () => (
  <DashboardLayout>
    <div className="flex flex-col max-w-screen-lg mx-auto p-4 md:p-0">
      <div className="p-4 overflow-x-auto">
        <UpdateCalendar />
      </div>
    </div>
  </DashboardLayout>
);
export default UpdateProperty;
