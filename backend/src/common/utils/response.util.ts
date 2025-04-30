export const sendSuccess = (
  data: object | Array<object> | null = null,
  message: string = 'Data fetched successfully',
) => {
  return {
    status: 'success',
    data,
    message,
  };
};
