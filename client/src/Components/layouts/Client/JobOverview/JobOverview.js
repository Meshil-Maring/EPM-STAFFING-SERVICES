import { insertDataService } from "../../../../services/dynamic.service";

// validate date (YYYY-MM-DD)
const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const d = new Date(date);
  return !isNaN(d.getTime());
};

// convert AM/PM → 24hr
const convertTo24Hour = (time) => {
  if (!time) return null;

  // already 24-hour format
  if (/^\d{2}:\d{2}(:\d{2})?$/.test(time)) {
    return time.length === 5 ? `${time}:00` : time;
  }

  // AM/PM format
  const match = time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (!match) return null;

  let [_, hours, minutes, modifier] = match;
  hours = parseInt(hours);

  if (modifier.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}:00`;
};

// validate time (HH:MM:SS)
const isValidTime = (time) => {
  return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(time);
};

// clean empty string → null
const clean = (val) => (val === "" ? null : val);

// 🎯 MAIN FUNCTION
export const scheduleInterview = async (application_id, data) => {
  try {
    // convert time first
    const formattedTime = convertTo24Hour(data?.time);

    // validations
    if (!isValidDate(data?.date)) {
      throw new Error("Invalid date format (use YYYY-MM-DD)");
    }

    if (!formattedTime || !isValidTime(formattedTime)) {
      throw new Error("Invalid time format");
    }

    // payload
    const payload = {
      application_id,

      type: data?.type?.toLowerCase(),

      interview_date: data?.date,
      interview_time: formattedTime,

      meeting_link: clean(data?.meetingLink),
      address: clean(data?.address),
      phone: clean(data?.phone),
      interviewer: clean(data?.interviewer),

      description: clean(data?.notes),

      stage: data?.stage ?? "round 1",
      status: data?.status ?? "scheduled",
    };

    const res = await insertDataService("api/dr/insert", "interviews", payload);

    if (!res.success)
      return { success: false, message: "Interview is already scheduled" };

    return { success: true, message: "Interview schedule successfully" };
  } catch (error) {
    console.error("Schedule Interview Error:", error.message);
    throw error;
  }
};
