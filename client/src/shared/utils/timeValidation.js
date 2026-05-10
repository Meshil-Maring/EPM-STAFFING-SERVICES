/**
 * Validate date format (YYYY-MM-DD)
 */
export const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const d = new Date(date);
  return !isNaN(d.getTime());
};

/**
 * Convert AM/PM time to 24-hour format
 */
export const convertTo24Hour = (time) => {
  if (!time) return null;

  // Already 24-hour format
  if (/^\d{2}:\d{2}(:\d{2})?$/.test(time)) {
    return time.length === 5 ? `${time}:00` : time;
  }

  // AM/PM format
  const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!match) return null;

  let [_, hours, minutes, modifier] = match;
  hours = parseInt(hours);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}:00`;
};

/**
 * Validate time format (HH:MM:SS)
 */
export const isValidTime = (time) => {
  return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(time);
};

/**
 * Clean empty string to null
 */
export const cleanValue = (val) => (val === '' ? null : val);

/**
 * Convert date string to Supabase timestamp format
 */
export const toSupabaseTimestamp = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date)) return null;
  return date.toISOString();
};
