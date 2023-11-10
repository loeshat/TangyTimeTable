/**
 * Format date object into HH:MM string
 * @param {Date} dateObj 
 * @returns 
 */
export const formatTime = (dateObj) => {
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  // Pad leading zero for single-digit minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // Return time in HH:MM format
  return `${hours}:${formattedMinutes}`;
}
