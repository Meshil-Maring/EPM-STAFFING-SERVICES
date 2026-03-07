import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

export const getAvatar = (name) => {
  return createAvatar(initials, {
    seed: name,
    radius: 50,
    backgroundColor: ["2f1cc1"],
  }).toDataUri();
};
