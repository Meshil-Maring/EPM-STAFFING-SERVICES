import { generateOTP } from "../util/generateOTP.js";

export const testController = async (req, res) => {
  const response = await generateOTP();

  response;
  res.send(response);
};
