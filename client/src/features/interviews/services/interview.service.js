import { insertDataService, updateByIdService, deleteService } from '../../../api/features/dynamic.service';

/**
 * Validate date format (YYYY-MM-DD)
 */
const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const d = new Date(date);
  return !isNaN(d.getTime());
};

/**
 * Convert AM/PM time to 24-hour format
 */
const convertTo24Hour = (time) => {
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
const isValidTime = (time) => {
  return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(time);
};

/**
 * Clean empty string to null
 */
const clean = (val) => (val === '' ? null : val);

/**
 * Schedule a new interview
 */
export const scheduleInterview = async (application_id, user_id, data) => {
  if (!user_id) return;

  try {
    const formattedTime = convertTo24Hour(data?.time);

    // Validations
    if (!isValidDate(data?.date)) {
      throw new Error('Invalid date format (use YYYY-MM-DD)');
    }

    if (!formattedTime || !isValidTime(formattedTime)) {
      throw new Error('Invalid time format');
    }

    // Payload
    const payload = {
      application_id,
      type: data?.type?.toLowerCase(),
      user_id: user_id,
      interview_date: data?.date,
      interview_time: formattedTime,
      meeting_link: clean(data?.meetingLink),
      address: clean(data?.address),
      phone: clean(data?.phone),
      interviewer: clean(data?.interviewer),
      description: clean(data?.notes),
      stage: data?.stage ?? 'round1',
      status: data?.status ?? 'scheduled',
    };

    const res = await insertDataService('api/dr/insert', 'interviews', payload);

    if (!res.success) return res;

    // Update candidate status
    await updateByIdService(
      'api/dr/update/id',
      { status: 'interview' },
      'applications',
      application_id
    );

    return {
      success: true,
      message: 'Interview schedule successfully',
      data: res.data,
    };
  } catch (error) {
    console.error('Schedule Interview Error:', error.message);
    throw error;
  }
};

/**
 * Reschedule an existing interview
 */
export const rescheduleInterview = async (id, user_id, application_id, data) => {
  try {
    const formattedTime = convertTo24Hour(data?.time);

    // Validations
    if (!isValidDate(data?.date)) {
      throw new Error('Invalid date format (use YYYY-MM-DD)');
    }

    if (!formattedTime || !isValidTime(formattedTime)) {
      throw new Error('Invalid time format');
    }

    const payload = {
      application_id,
      type: data?.type?.toLowerCase(),
      user_id: user_id,
      interview_date: data?.date,
      interview_time: formattedTime,
      stage: data?.round ?? 'round1',
      meeting_link: clean(data?.meetingLink),
      address: clean(data?.address),
      phone: clean(data?.phone),
      interviewer: clean(data?.interviewer),
      description: clean(data?.notes),
      status: data?.status ?? 'scheduled',
    };

    const res = await updateByIdService('api/dr/update/id', payload, 'interviews', id);

    if (!res.success) return res;

    return {
      success: true,
      message: 'Interview reschedule successfully',
      data: res.data,
    };
  } catch (error) {
    console.error('Schedule Interview Error:', error.message);
    throw error;
  }
};

/**
 * Cancel an interview
 */
export const cancelInterview = async (interviewId) => {
  if (!interviewId) return { success: false, message: 'Invalid inteview id' };

  try {
    const res = await updateByIdService(
      'api/dr/update/id',
      { status: 'cancelled' },
      'interviews',
      interviewId
    );

    return res;
  } catch (err) {
    return err;
  }
};

/**
 * Get interview pipeline data
 */
export const getInterviewCandidate = async (id, stage) => {
  const { getInterviewPipelineService } = await import('../../../api/features/interview.service');
  const res = await getInterviewPipelineService(id, stage);
  return res;
};
