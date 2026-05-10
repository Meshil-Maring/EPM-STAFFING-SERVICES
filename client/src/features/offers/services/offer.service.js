import { getByColumnName, insertDataService, updateByIdService, deleteService, getWithPageService } from '../../../api/features/dynamic.service';
import { uploadPdfService } from '../../../api/features/candidate.service';

/**
 * Release an offer to a candidate
 */
export const offerReleased = async (application_id, candidate_id, data, file) => {
  try {
    // 1. Check if offer already exists and if interview exists
    const [existing, checkInterview] = await Promise.all([
      getByColumnName('api/dr/get', 'offers_released', 'application_id', application_id),
      getByColumnName('api/dr/get', 'interviews', 'application_id', application_id),
    ]);

    if (existing?.success && existing?.data.length > 0) {
      return {
        success: false,
        message: 'An offer has already been released for this candidate.',
      };
    }

    // 2. Delete interview and upload file in parallel
    const [uploadRes] = await Promise.all([
      file
        ? uploadPdfService('api/candidates/upload/pdf', file, candidate_id, application_id, 'offer_letters')
        : Promise.resolve(null),
      checkInterview?.data.length > 0
        ? deleteService('api/dr/delete/id', 'interviews', checkInterview.data[0].id)
        : Promise.resolve(null),
    ]);

    if (file && !uploadRes?.success) {
      return { success: false, message: 'Failed to upload offer letter.' };
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
      acceptance_deadline: data.acceptanceDeadline?.split('/').reverse().join('/'),
      working_hours: data.workStart && data.workEnd ? `${data.workStart} - ${data.workEnd}` : null,
      letter_url: fileUrl,
      description: data.message || null,
      application_id,
      released_by: data.releasedBy,
    };

    // 4. Insert offer and update status in parallel
    const [res] = await Promise.all([
      insertDataService('api/dr/insert', 'offers_released', payload),
      updateByIdService('api/dr/update/id', { status: 'offered' }, 'applications', application_id),
    ]);

    if (!res.success) {
      return { success: false, message: 'Failed to release offer.' };
    }

    return { success: true, message: 'Offer released successfully.' };
  } catch (error) {
    console.error('offerReleased error:', error);
    return { success: false, message: 'Something went wrong.' };
  }
};

/**
 * Get offer release information with pagination
 */
export const getOfferReleaseInfo = async (page = 1) => {
  const res = await getWithPageService('api/dr/get', 'offers_released_info', page);
  return res;
};
