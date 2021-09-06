/**
 * Wraps a promise in a try/catch block
 *
 * @param {Promise} promise A promise
 * @returns The resolved promise or null if there is an error
 */
// export const handleError = async (promise: Promise<any>) => {
//   try {
//     const response = await promise;
//     return response;
//   } catch (err) {
//     console.error(err);
//     return { data: null };
//   }
// };

export const handleError = async <T>(promise: Promise<T>) => {
  try {
    const response = await promise;
    return response;
  } catch (err) {
    console.error(err);
    return { data: null };
  }
};

/**
 * Format milliseconds to time
 *
 * @param {number} ms Number in milliseconds
 * @returns {string} Formated duration (e.g. 2:35)
 */
export const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
};
