import crypto from "crypto";

export const testFunction = () => {
  return crypto.randomInt(100000, 999999);
};
