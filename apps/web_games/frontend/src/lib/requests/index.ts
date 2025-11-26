export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status !== 200) {
    const serverResponse = await response.json();
    throw serverResponse;
  }

  return await response.json();
};
