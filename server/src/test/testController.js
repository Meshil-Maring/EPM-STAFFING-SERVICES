import { generateOTP } from "../util/generateOTP.js";

export const testController = async (req, res) => {
  const response = await generateOTP();

  console.log(response);
  res.send(response);
};
