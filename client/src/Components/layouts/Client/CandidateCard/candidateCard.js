import { ExpandIcon } from "lucide-react";
import {
  deleteService,
  getByColumnName,
  getByIdService,
  insertDataService,
  putByIdService,
  updateByIdService,
} from "../../../../services/dynamic.service";
import { uploadPdfService } from "../../../../services/candidate.service";

// ==================================
//        Schedule Interview
// ==================================

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

// ==================================
//           INTERVIEW
// ==================================

//  MAIN FUNCTION
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

      stage: data?.stage ?? "round1",
      status: data?.status ?? "scheduled",
    };

    const res = await insertDataService("api/dr/insert", "interviews", payload);

    if (!res.success) return res;

    // update candidate status
    await updateByIdService(
      "api/dr/update/id",
      {
        status: "interview",
      },
      "applications",
      application_id,
    );

    return { success: true, message: "Interview schedule successfully" };
  } catch (error) {
    console.error("Schedule Interview Error:", error.message);
    throw error;
  }
};

export const rescheduleInterview = async (id, application_id, data) => {
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

    const payload = {
      application_id,

      type: data?.type?.toLowerCase(),

      interview_date: data?.date,
      interview_time: formattedTime,
      stage: data?.round ?? "round1",

      meeting_link: clean(data?.meetingLink),
      address: clean(data?.address),
      phone: clean(data?.phone),
      interviewer: clean(data?.interviewer),

      description: clean(data?.notes),
      status: data?.status ?? "scheduled",
    };

    const res = await updateByIdService(
      "api/dr/update/id",
      payload,
      "interviews",
      id,
    );

    if (!res.success) return res;

    return { success: true, message: "Interview reschedule successfully" };
  } catch (error) {
    console.error("Schedule Interview Error:", error.message);
    throw error;
  }
};

// ==================================
//           Comment
// ==================================

export const saveComment = async (
  application_id,
  sender_id,
  type,
  sender_type,
  message,
  from = null,
) => {
  console.log(application_id);

  const res = await insertDataService("api/dr/insert", "comments", {
    application_id,
    sender_id,
    type,
    sender_type,
    message,
  });

  console.log(res);

  if (type === "Rejection" && from == "rejected") {
    await updateByIdService(
      "api/dr/update/id",
      {
        status: "rejected",
      },
      "applications",
      application_id,
    );
  }

  return res;
};

export const deleteComment = async (id) => {
  const res = await deleteService("api/dr/delete/id", "comments", id);

  return res;
};

export const updateComment = async (id, text) => {
  const res = await updateByIdService(
    "api/dr/update/id",
    { message: text },
    "comments",
    id,
  );

  return res;
};

// ==================================
//          Offer Released
// ==================================
export const offerReleased = async (
  application_id,
  candidate_id,
  data,
  file,
) => {
  try {
    // 1. Run both checks in parallel
    const [existing, checkInterview] = await Promise.all([
      getByColumnName(
        "api/dr/get",
        "offers_released",
        "application_id",
        application_id,
      ),
      getByColumnName(
        "api/dr/get",
        "interviews",
        "application_id",
        application_id,
      ),
    ]);

    if (existing?.success && existing?.data.length > 0) {
      return {
        success: false,
        message: "An offer has already been released for this candidate.",
      };
    }

    // 2. Delete interview and upload file in parallel
    const [uploadRes] = await Promise.all([
      file
        ? uploadPdfService(
            "api/candidates/upload/pdf",
            file,
            candidate_id,
            application_id,
            "offer_letters",
          )
        : Promise.resolve(null),
      checkInterview?.data.length > 0
        ? deleteService(
            "api/dr/delete/id",
            "interviews",
            checkInterview.data[0].id,
          )
        : Promise.resolve(null),
    ]);

    if (file && !uploadRes?.success) {
      return { success: false, message: "Failed to upload offer letter." };
    }

    const fileUrl = uploadRes?.url ?? uploadRes?.data?.url ?? null;

    // 3. Prepare payload
    const payload = {
      job_role: data.jobRole,
      offered_ctc: `${data.offeredCTCMin} - ${data.offeredCTCMax}`,
      joining_date: data.joiningDate,
      offer_type: data.offerType?.toLowerCase(),
      report_by: data.reportBy,
      office_location: data.officeLocation,
      acceptance_deadline: data.acceptanceDeadline
        ?.split("/")
        .reverse()
        .join("/"),
      working_hours:
        data.workStart && data.workEnd
          ? `${data.workStart} - ${data.workEnd}`
          : null,
      letter_url: fileUrl,
      description: data.message || null,
      application_id,
      released_by: data.releasedBy,
    };

    // 4. Insert offer + update status in parallel (already done)
    const [res] = await Promise.all([
      insertDataService("api/dr/insert", "offers_released", payload),
      updateByIdService(
        "api/dr/update/id",
        { status: "offered" },
        "applications",
        application_id,
      ),
    ]);

    if (!res.success) {
      return { success: false, message: "Failed to release offer." };
    }

    return { success: true, message: "Offer released successfully." };
  } catch (error) {
    console.error("offerReleased error:", error);
    return { success: false, message: "Something went wrong." };
  }
};

export const cancelInterview = async (id) => {};
