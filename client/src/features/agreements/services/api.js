import { getByIdService } from "../../../services/dynamic.service";


// router.get("/get/user-id/:table/:user_id", getByUserIdController);

export const fetchAgreementData = async (userId) => {
  const res = await getByIdService("api/dr/get/user-id", "agreements", userId)

  if (!res.success) throw new Error("Failed to fetch agreement data");

  return res;
};
