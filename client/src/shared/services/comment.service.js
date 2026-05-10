import { insertDataService, updateByIdService, deleteService, getByColumnName } from '../../api/features/dynamic.service';

/**
 * Save a new comment
 */
export const saveComment = async (commentData) => {
  const { application_id, sender_id, type, sender_type, message, from = null } = commentData;

  const res = await insertDataService('api/dr/insert', 'comments', {
    application_id,
    sender_id,
    type,
    sender_type,
    message,
  });

  if (type === 'Rejection' && from == 'rejected') {
    await updateByIdService(
      'api/dr/update/id',
      { status: 'rejected' },
      'applications',
      application_id
    );
  }

  return res;
};

/**
 * Delete a comment
 */
export const deleteComment = async (id) => {
  const res = await deleteService('api/dr/delete/id', 'comments', id);
  return res;
};

/**
 * Update a comment
 */
export const updateComment = async (id, text) => {
  const res = await updateByIdService(
    'api/dr/update/id',
    { message: text },
    'comments',
    id
  );
  return res;
};

/**
 * Get comments for an application
 */
export const getComments = async (applicationId) => {
  if (!applicationId) {
    return { success: false, message: 'Invalid application id' };
  }

  try {
    const res = await getByColumnName(
      'api/dr/get',
      'comments',
      'application_id',
      applicationId
    );
    return res;
  } catch (err) {
    return err;
  }
};
