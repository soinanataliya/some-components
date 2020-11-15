export const getWindowSizeType = (
  width: number,
  mobile: number,
  tablet: number,
) => {
  if (width < mobile) {
    return 'mobile';
  }
  if (width > tablet) {
    return 'desktop';
  }
  return 'tablet';
};

