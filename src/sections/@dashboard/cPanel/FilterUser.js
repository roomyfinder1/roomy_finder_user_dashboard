export function filterUser({ inputData, comparator, filterName, filterStatus, filterRole }) {
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
        user?.firstName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        user?.standardCode?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        parseInt(user?.standardCode?.split('#')[1].substring(2), 10)
          .toString()
          .toLowerCase()
          .indexOf(filterName.toLowerCase()) !== -1 ||
        user?.lastName?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1 ||
        user?.email?.toLowerCase().indexOf(filterName?.toLowerCase()) !== -1
    );
  }

  if (filterStatus && filterStatus !== 'all') {
    inputData = inputData.filter((user) => user?.status === filterStatus);
  }

  if (filterRole && filterRole !== 'all') {
    inputData = inputData.filter((user) => user?.role === filterRole);
  }

  return inputData;
}
