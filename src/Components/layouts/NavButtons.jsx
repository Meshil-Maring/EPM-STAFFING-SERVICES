import { useState } from "react";
import ButtonIcon from "../common/ButtonIcon";

function NavButtons() {
  const clicked = useState(false);
  const [buttonName, setButtonName] = useState("Job");

  const onSelect = (name) => {
    setButtonName(name);
  };

  const buttons = [
    {
      id: "nav",
      name: "Job",
      path: "M13.7229 9.0589L13.7168 9.0527M5.42635 9.0589L5.42023 9.0527M13.7229 4.90135C13.7229 2.60863 11.8643 0.75 9.57163 0.75C7.27889 0.75 5.42027 2.60863 5.42027 4.90135M2.82567 19.95H15.7986C16.945 19.95 17.8743 19.0207 17.8743 17.8743V6.97703C17.8743 5.83066 16.945 4.90135 15.7986 4.90135H2.82567C1.67931 4.90135 0.75 5.83066 0.75 6.97703V17.8743C0.75 19.0207 1.67931 19.95 2.82567 19.95Z",
    },
    {
      id: "nav",
      name: "Offer released",
      path: "M7.95 19.9499H3.14999C1.8245 19.9499 0.749991 18.8754 0.75 17.5499L0.750093 3.14999C0.750101 1.82451 1.82462 0.75 3.15009 0.75H13.9504C15.2758 0.75 16.3504 1.82452 16.3504 3.15V9.75M11.5504 16.55L13.7504 18.75L18.5504 13.9498M4.95037 5.55H12.1504M4.95037 9.15H12.1504M4.95037 12.75H8.55037",
    },
    {
      id: "nav",
      name: "Interview pipeline",
      path: "M14.3754 17.8916L14.3757 14.6779C14.3759 12.9027 12.9368 11.4635 11.1616 11.4635H3.96442C2.18948 11.4635 0.750561 12.9023 0.750361 14.6772L0.75 17.8916M19.9497 17.8918L19.95 14.678C19.9502 12.9029 18.5111 11.4637 16.7359 11.4637M13.7563 1.38141C14.5456 1.96705 15.0572 2.9059 15.0572 3.96423C15.0572 5.02256 14.5456 5.96142 13.7563 6.54705M10.8438 3.96406C10.8438 5.73913 9.40482 7.17811 7.62974 7.17811C5.85467 7.17811 4.41569 5.73913 4.41569 3.96406C4.41569 2.18898 5.85467 0.75 7.62974 0.75C9.40482 0.75 10.8438 2.18898 10.8438 3.96406Z",
    },
  ];
  return (
    <div className="w-full pt-5 border-b border-lighter transition-all ease-in-out duration-100 h-full gap-5 flex text-primary flex-col items-center justify-start">
      {buttons.map((button, index) => (
        <ButtonIcon
          key={index}
          id={button.id}
          text={button.name}
          pathData={button.path}
          onSelect={onSelect}
          clicked={button.name === buttonName}
        />
      ))}
    </div>
  );
}

export default NavButtons;
