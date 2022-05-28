import theme from 'constants/theme';
import { classNames } from 'lib/helpers/ui';

const LabelWithIcon = ({
  Icon,
  title,
  className,
}: {
  Icon: any;
  title: any;
  className?: string;
}) => (
  <p className={classNames('flex flex-row items-center', className)}>
    <Icon
      width={14}
      height={14}
      fill={theme?.colors?.gray?.[500]}
      className="mr-1"
    />
    {title}
  </p>
);

export default LabelWithIcon;
