import { useSelector } from 'react-redux';
import Image from 'next/image';
import { currentUserSelector } from 'lib/store/selectors/user';
import UserIcon from 'assets/images/icons/person.svg';
import theme from 'constants/theme';
import { getFullName } from 'lib/transformers/name';

const UserAvatar = () => {
  const user = useSelector(currentUserSelector);

  return (
    <div className="flex flex-col items-center">
      {!!user?.imageUrl ? (
        <Image
          width={96}
          height={96}
          objectFit="cover"
          layout="fixed"
          src={user.imageUrl}
        />
      ) : (
        <UserIcon width={96} height={96} fill={theme?.colors?.gray?.[600]} />
      )}

      <span className="mt-4 text-center">{getFullName(user)}</span>
    </div>
  );
};

export default UserAvatar;
