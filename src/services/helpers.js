/**
 * Format date object into HH:MM string
 * @param {Date} dateObj 
 * @returns 
 */
export const formatTime = (dateObj) => {
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  // Pad leading zero for single-digit minutes
  const formattedMinutes = minutes < 30 ? '00' : '30';
  // Return time in HH:MM format
  return `${hours}:${formattedMinutes}`;
}

/**
 * Generate a time array for mapping availability input components
 * @param {*} startTime 
 * @param {*} endTime 
 * @returns 
 */
export const timeRange = (startTime, endTime) => {
  const startHour = startTime.split(':')[0];
  const endHour = endTime.includes(3) 
                  ? Number(endTime.split(':')[0]) + 1 
                  : endTime.split(':')[0];
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    hours.push(`${i}:00`);
  }
  return hours;
}
