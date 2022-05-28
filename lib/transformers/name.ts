export const getFullName = (
  person?: {
    firstName?: string | null;
    lastName?: string | null;
  } | null,
) => {
  if (!person) {
    return '';
  }

  const { firstName, lastName } = person;

  return [firstName, lastName].filter((item) => !!item).join(' ');
};
