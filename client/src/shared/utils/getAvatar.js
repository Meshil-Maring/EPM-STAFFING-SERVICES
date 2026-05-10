import { createAvatar } from "@dicebear/core";
import { initials, avataaars } from "@dicebear/collection";

export const getAvatar = (name) => {
  return createAvatar(avataaars, {
    seed: name,
    radius: 50,
    backgroundColor: ["2f1cc1"],
  }).toDataUri();
};

export const getInitials = (name) => {
  return createAvatar(initials, {
    seed: name,
    radius: 50,
    backgroundColor: ["2f1cc1"],
  }).toDataUri();
};
