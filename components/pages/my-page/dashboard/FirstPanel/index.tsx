import dayjs from 'dayjs';
import UserAvatar from 'components/pages/my-page/dashboard/FirstPanel/UserAvatar';
import Stats from 'components/pages/my-page/dashboard/FirstPanel/Stats';

const FirstPanel = () => (
  <div className="bg-white p-6 shadow-lg border">
    <div className="flex flex-row">
      <div className="hidden lg:block lg:mr-6">
        <UserAvatar />
      </div>
      <div className="flex flex-col flex-1">
        <h4 className="mb-4">{dayjs().format('MMM. YYYY')} Breakdown</h4>
        <Stats />
      </div>
    </div>
  </div>
);

export default FirstPanel;
