import dayjs from 'dayjs';

export function filterUser({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
  startDate,
  endDate,
}) {
  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) =>
        user?.firstName?.toLowerCase().includes(filterName?.toLowerCase()) ||
        `${user?.firstName?.toLowerCase()} ${user?.lastName?.toLowerCase()}`.includes(
          filterName?.toLowerCase()
        ) ||
        user?.phone?.includes(filterName?.toLowerCase()) ||
        user?.standardCode?.toLowerCase().includes(filterName?.toLowerCase()) ||
        parseInt(user?.standardCode?.split('#')[1]?.substring(2), 10)
          .toString()
          .toLowerCase()
          .includes(filterName.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(filterName?.toLowerCase()) ||
        user?.email?.toLowerCase().includes(filterName?.toLowerCase())
    );
  }

  if (filterStatus && filterStatus !== 'all') {
    inputData = inputData.filter((user) => user?.status === filterStatus);
  }

  if (filterRole && filterRole !== 'all') {
    inputData = inputData.filter((user) => user?.role === filterRole);
  }

  if (startDate) {
    inputData = inputData.filter((user) => dayjs(user?.createdAt).isAfter(dayjs(startDate)));
  }

  if (endDate) {
    inputData = inputData.filter((user) => dayjs(user?.createdAt).isBefore(dayjs(endDate)));
  }

  return inputData;
}
