import { getWithPageService } from '../../../services/dynamic.service';

export const getListedJobWithPage = async (page) => {
  return await getWithPageService('api/dr/get', 'jobs', page);
};
