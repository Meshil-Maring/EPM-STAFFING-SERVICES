import { getWithPageService } from "../../../../services/dynamic.service";

export const getOfferReleaseInfo = async (page = 1) => {
  const res = await getWithPageService(
    "api/dr/get",
    "offers_released_info",
    page,
  );

  return res;
};
