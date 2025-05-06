export const sendSuccess = (
  data: any = null,
  message: string = 'Data fetched successfully',
) => {
  return {
    status: 'success',
    data,
    message,
  };
};
