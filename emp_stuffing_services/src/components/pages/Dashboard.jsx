import Button from "../common/Button";
import Icon from "../common/Icon";
import ButtonHeadings from "../layout/ButtonHeadings";
import Headings from "../layout/Headings";
import NavButtons from "../layout/NavButtons";
function Dashboard() {
  return (
    <div className="w-full h-full flex flex-row">
      {/* right Nav */}
      <div
        className={`w-4/16 h-full border-r border-border-light flex flex-col gap-2 p-2`}
      >
        <ButtonHeadings border_edge="b" padding_y="lg" />
        <NavButtons
          width="md"
          mx="auto"
          flex_direction="col"
          align_items="center"
          gap="4"
          flex="1"
        />
        <Icon text="Settings" height="fit" width="fit" justify_items="center">
          <path
            d="M11.75 14.75C13.4069 14.75 14.75 13.4069 14.75 11.75C14.75 10.0931 13.4069 8.75 11.75 8.75C10.0931 8.75 8.75 10.0931 8.75 11.75C8.75 13.4069 10.0931 14.75 11.75 14.75Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.15 14.75C19.0169 15.0516 18.9772 15.3862 19.036 15.7106C19.0948 16.035 19.2495 16.3343 19.48 16.57L19.54 16.63C19.726 16.8157 19.8735 17.0363 19.9741 17.2791C20.0748 17.5219 20.1266 17.7822 20.1266 18.045C20.1266 18.3078 20.0748 18.5681 19.9741 18.8109C19.8735 19.0537 19.726 19.2743 19.54 19.46C19.3543 19.646 19.1337 19.7935 18.8909 19.8941C18.6481 19.9948 18.3878 20.0466 18.125 20.0466C17.8622 20.0466 17.6019 19.9948 17.3591 19.8941C17.1163 19.7935 16.8957 19.646 16.71 19.46L16.65 19.4C16.4143 19.1695 16.115 19.0148 15.7906 18.956C15.4662 18.8972 15.1316 18.9369 14.83 19.07C14.5342 19.1968 14.282 19.4072 14.1043 19.6755C13.9266 19.9438 13.8313 20.2582 13.83 20.58V20.75C13.83 21.2804 13.6193 21.7891 13.2442 22.1642C12.8691 22.5393 12.3604 22.75 11.83 22.75C11.2996 22.75 10.7909 22.5393 10.4158 22.1642C10.0407 21.7891 9.83 21.2804 9.83 20.75V20.66C9.82226 20.329 9.71512 20.008 9.52251 19.7387C9.3299 19.4694 9.06074 19.2643 8.75 19.15C8.44838 19.0169 8.11381 18.9772 7.78941 19.036C7.46502 19.0948 7.16568 19.2495 6.93 19.48L6.87 19.54C6.68425 19.726 6.46368 19.8735 6.22088 19.9741C5.97808 20.0748 5.71783 20.1266 5.455 20.1266C5.19217 20.1266 4.93192 20.0748 4.68912 19.9741C4.44632 19.8735 4.22575 19.726 4.04 19.54C3.85405 19.3543 3.70653 19.1337 3.60588 18.8909C3.50523 18.6481 3.45343 18.3878 3.45343 18.125C3.45343 17.8622 3.50523 17.6019 3.60588 17.3591C3.70653 17.1163 3.85405 16.8957 4.04 16.71L4.1 16.65C4.33054 16.4143 4.48519 16.115 4.544 15.7906C4.60282 15.4662 4.56312 15.1316 4.43 14.83C4.30324 14.5342 4.09276 14.282 3.82447 14.1043C3.55618 13.9266 3.24179 13.8313 2.92 13.83H2.75C2.21957 13.83 1.71086 13.6193 1.33579 13.2442C0.960714 12.8691 0.75 12.3604 0.75 11.83C0.75 11.2996 0.960714 10.7909 1.33579 10.4158C1.71086 10.0407 2.21957 9.83 2.75 9.83H2.84C3.17099 9.82226 3.492 9.71512 3.7613 9.52251C4.03059 9.3299 4.23572 9.06074 4.35 8.75C4.48312 8.44838 4.52282 8.11381 4.464 7.78941C4.40519 7.46502 4.25054 7.16568 4.02 6.93L3.96 6.87C3.77405 6.68425 3.62653 6.46368 3.52588 6.22088C3.42523 5.97808 3.37343 5.71783 3.37343 5.455C3.37343 5.19217 3.42523 4.93192 3.52588 4.68912C3.62653 4.44632 3.77405 4.22575 3.96 4.04C4.14575 3.85405 4.36632 3.70653 4.60912 3.60588C4.85192 3.50523 5.11217 3.45343 5.375 3.45343C5.63783 3.45343 5.89808 3.50523 6.14088 3.60588C6.38368 3.70653 6.60425 3.85405 6.79 4.04L6.85 4.1C7.08568 4.33054 7.38502 4.48519 7.70941 4.544C8.03381 4.60282 8.36838 4.56312 8.67 4.43H8.75C9.04577 4.30324 9.29802 4.09276 9.47569 3.82447C9.65337 3.55618 9.74872 3.24179 9.75 2.92V2.75C9.75 2.21957 9.96071 1.71086 10.3358 1.33579C10.7109 0.960714 11.2196 0.75 11.75 0.75C12.2804 0.75 12.7891 0.960714 13.1642 1.33579C13.5393 1.71086 13.75 2.21957 13.75 2.75V2.84C13.7513 3.16179 13.8466 3.47618 14.0243 3.74447C14.202 4.01276 14.4542 4.22324 14.75 4.35C15.0516 4.48312 15.3862 4.52282 15.7106 4.464C16.035 4.40519 16.3343 4.25054 16.57 4.02L16.63 3.96C16.8157 3.77405 17.0363 3.62653 17.2791 3.52588C17.5219 3.42523 17.7822 3.37343 18.045 3.37343C18.3078 3.37343 18.5681 3.42523 18.8109 3.52588C19.0537 3.62653 19.2743 3.77405 19.46 3.96C19.646 4.14575 19.7935 4.36632 19.8941 4.60912C19.9948 4.85192 20.0466 5.11217 20.0466 5.375C20.0466 5.63783 19.9948 5.89808 19.8941 6.14088C19.7935 6.38368 19.646 6.60425 19.46 6.79L19.4 6.85C19.1695 7.08568 19.0148 7.38502 18.956 7.70941C18.8972 8.03381 18.9369 8.36838 19.07 8.67V8.75C19.1968 9.04577 19.4072 9.29802 19.6755 9.47569C19.9438 9.65337 20.2582 9.74872 20.58 9.75H20.75C21.2804 9.75 21.7891 9.96071 22.1642 10.3358C22.5393 10.7109 22.75 11.2196 22.75 11.75C22.75 12.2804 22.5393 12.7891 22.1642 13.1642C21.7891 13.5393 21.2804 13.75 20.75 13.75H20.66C20.3382 13.7513 20.0238 13.8466 19.7555 14.0243C19.4872 14.202 19.2768 14.4542 19.15 14.75Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      </div>
      {/* left content */}
      <div className="flex flex-col h-full flex-1 overflow-hidden">
        <div className="gap-2 p-4 border-b bg-primary border-border-light w-full h-22 flex flex-row items-center justify-start">
          <div className="gap-2 w-fit h-full flex flex-row items-center justify-start">
            <img
              src="https://i.ibb.co/sLZsvng/welcomelogo.png"
              alt=""
              className="w-10 border border-border-lighter rounded-full h-10 object-cover flex items-center justify-center"
            />
            <h1 className="text-lg text-left font-Abhaya flex flex-col">
              <span>EMP STAFFING SERVICES OPC PVT.LTD.</span>
              <span className={`text-xs font-Asap`}>
                Recruitement Management Dashboard
              </span>
            </h1>
          </div>
          <div className="flex ml-auto flex-row gap-4 items-center justify-center">
            <div className="flex flex-row gap-2 items-center justify-center font-Inter text-dark bg-platinum border-border-light border rounded-md py-1 px-4">
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 0.75H2.75C2.21957 0.75 1.71086 0.960714 1.33579 1.33579C0.960714 1.71086 0.75 2.21957 0.75 2.75V18.75C0.75 19.2804 0.960714 19.7891 1.33579 20.1642C1.71086 20.5393 2.21957 20.75 2.75 20.75H14.75C15.2804 20.75 15.7891 20.5393 16.1642 20.1642C16.5393 19.7891 16.75 19.2804 16.75 18.75V6.75M10.75 0.75L16.75 6.75M10.75 0.75V6.75H16.75M12.75 11.75H4.75M12.75 15.75H4.75M6.75 7.75H4.75"
                  stroke="#EDEDED"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-md font-Asap font-weight-light">Agreement</p>
            </div>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="after:absolute relative after:top-full after:bottom-0 after:w-4 after:h-4 after:rounded-full after:bg-candy-red after:opacity-70 after:"
            >
              <path
                d="M6.08333 17.8409C6.79101 18.4062 7.72553 18.75 8.75 18.75C9.77447 18.75 10.709 18.4062 11.4167 17.8409M1.25763 14.9318C0.836021 14.9318 0.60054 14.2694 0.855574 13.9014C1.44736 13.0475 2.01855 11.7951 2.01855 10.287L2.04296 8.10166C2.04296 4.04145 5.04581 0.75 8.75 0.75C12.5088 0.75 15.5558 4.08993 15.5558 8.20995L15.5314 10.287C15.5314 11.8055 16.0829 13.0647 16.6506 13.919C16.8958 14.2879 16.6597 14.9318 16.2433 14.9318H1.25763Z"
                stroke="#EDEDED"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className={`bg-candy-red text-primary flex items-center justify-center rounded-full p-2 w-10 h-10`}
            >
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-dark"
              >
                <path
                  d="M17.5494 19.95L17.5497 16.3503C17.5499 14.362 15.938 12.75 13.9497 12.75H4.3504C2.36234 12.75 0.750628 14.3615 0.750405 16.3496L0.75 19.95M12.75 4.35C12.75 6.33822 11.1382 7.95 9.15 7.95C7.16177 7.95 5.55 6.33822 5.55 4.35C5.55 2.36177 7.16177 0.75 9.15 0.75C11.1382 0.75 12.75 2.36177 12.75 4.35Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto">
          <div className="flex items-center flex-wrap p-4">
            <h1 className="mr-auto flex flex-col items-start justify-center text-lg font-Inter">
              <span>Active Job Listings</span>
              <span className="text-xs font-light">
                Recruitment Management Dashboard
              </span>
            </h1>
            <div className="ml-auto bg-btn-gradient flex flex-row gap-2 py-1 px-4 rounded-lg text-primary items-center justify-start text-lg font-Inter">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75 0.75V14.75M0.75 7.75H14.75"
                  stroke="#EDEDED"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <button className="text-lg">Post New Job</button>
            </div>
          </div>
          <div className="relative w-full p-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute my-auto text-lg font-black top-0 bottom-0 left-6 "
            >
              <path
                d="M18.75 18.75L14.4 14.4M16.75 8.75C16.75 13.1683 13.1683 16.75 8.75 16.75C4.33172 16.75 0.75 13.1683 0.75 8.75C0.75 4.33172 4.33172 0.75 8.75 0.75C13.1683 0.75 16.75 4.33172 16.75 8.75Z"
                stroke="#EDEDED"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              placeholder="Search jobs by title, location, or skills"
              className="w-full py-1 px-10 rounded-md bg-platinum border border-border-lighter"
            />
          </div>
          <div className="flex border border-border-lighter rounded-md m-4 p-4 flex-col items-center gap-3">
            <div className="flex flex-row items-center justify-start w-full">
              <h1 className="font-semibold">Senior Software Engineer</h1>
              <p className="mx-auto text-sm py-1 px-2 text-candy-red bg-red-200 rounded-lg">
                Active
              </p>
              <div className="flex ml-auto flex-row items-center justify-center gap-4 p-2">
                <button className="border-border-lighter border rounded-lg py-1 px-2">
                  View Details
                </button>
                <button className="bg-btn-gradient text-primary rounded-lg px-2 py-1">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-baseline w-full gap-4">
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.80978 18.57C8.64658 18.6872 8.45071 18.7503 8.24978 18.7503C8.04885 18.7503 7.85298 18.6872 7.68978 18.57C2.86078 15.128 -2.26422 8.048 2.91678 2.932C4.33912 1.53285 6.25462 0.749124 8.24978 0.750001C10.2498 0.750001 12.1688 1.535 13.5828 2.931C18.7638 8.047 13.6388 15.126 8.80978 18.57Z"
                    stroke="#EDEDED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 9.75C8.78043 9.75 9.28914 9.53929 9.66421 9.16421C10.0393 8.78914 10.25 8.28043 10.25 7.75C10.25 7.21957 10.0393 6.71086 9.66421 6.33579C9.28914 5.96071 8.78043 5.75 8.25 5.75C7.71957 5.75 7.21086 5.96071 6.83579 6.33579C6.46071 6.71086 6.25 7.21957 6.25 7.75C6.25 8.28043 6.46071 8.78914 6.83579 9.16421C7.21086 9.53929 7.71957 9.75 8.25 9.75Z"
                    stroke="#EDEDED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Bungalore, India</p>
              </div>
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="19"
                  height="21"
                  viewBox="0 0 19 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7229 9.0589L13.7168 9.0527M5.42635 9.0589L5.42023 9.0527M13.7229 4.90135C13.7229 2.60863 11.8643 0.75 9.57163 0.75C7.27889 0.75 5.42027 2.60863 5.42027 4.90135M2.82567 19.95H15.7986C16.945 19.95 17.8743 19.0207 17.8743 17.8743V6.97703C17.8743 5.83066 16.945 4.90135 15.7986 4.90135H2.82567C1.67931 4.90135 0.75 5.83066 0.75 6.97703V17.8743C0.75 19.0207 1.67931 19.95 2.82567 19.95Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Full-time</p>
              </div>
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="14"
                  height="24"
                  viewBox="0 0 14 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 0.75V22.75M11.75 4.75H4.25C3.32174 4.75 2.4315 5.11875 1.77513 5.77513C1.11875 6.4315 0.75 7.32174 0.75 8.25C0.75 9.17826 1.11875 10.0685 1.77513 10.7249C2.4315 11.3813 3.32174 11.75 4.25 11.75H9.25C10.1783 11.75 11.0685 12.1187 11.7249 12.7751C12.3813 13.4315 12.75 14.3217 12.75 15.25C12.75 16.1783 12.3813 17.0685 11.7249 17.7249C11.0685 18.3813 10.1783 18.75 9.25 18.75H0.75"
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>20-30 LPA</p>
              </div>
            </div>
            <div className="text-xs flex flex-row items-center justify-start w-full gap-8">
              <p className="after:absolute relative after:w-1 after:h-1 after:bottom-1 after:right-[105%] after:rounded-full after:bg-red-300">
                4 available
              </p>
              <p>Posted 8 days ago</p>
            </div>
          </div>
          <div className="flex border border-border-lighter rounded-md m-4 p-4 flex-col items-center gap-3">
            <div className="flex flex-row items-center justify-start w-full">
              <h1 className="font-semibold">Senior Software Engineer</h1>
              <p className="mx-auto text-sm py-1 px-2 text-candy-red bg-red-200 rounded-lg">
                Active
              </p>
              <div className="flex ml-auto flex-row items-center justify-center gap-4 p-2">
                <button className="border-border-lighter border rounded-lg py-1 px-2">
                  View Details
                </button>
                <button className="bg-btn-gradient text-primary rounded-lg px-2 py-1">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-baseline w-full gap-4">
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.80978 18.57C8.64658 18.6872 8.45071 18.7503 8.24978 18.7503C8.04885 18.7503 7.85298 18.6872 7.68978 18.57C2.86078 15.128 -2.26422 8.048 2.91678 2.932C4.33912 1.53285 6.25462 0.749124 8.24978 0.750001C10.2498 0.750001 12.1688 1.535 13.5828 2.931C18.7638 8.047 13.6388 15.126 8.80978 18.57Z"
                    stroke="#EDEDED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 9.75C8.78043 9.75 9.28914 9.53929 9.66421 9.16421C10.0393 8.78914 10.25 8.28043 10.25 7.75C10.25 7.21957 10.0393 6.71086 9.66421 6.33579C9.28914 5.96071 8.78043 5.75 8.25 5.75C7.71957 5.75 7.21086 5.96071 6.83579 6.33579C6.46071 6.71086 6.25 7.21957 6.25 7.75C6.25 8.28043 6.46071 8.78914 6.83579 9.16421C7.21086 9.53929 7.71957 9.75 8.25 9.75Z"
                    stroke="#EDEDED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Bungalore, India</p>
              </div>
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="19"
                  height="21"
                  viewBox="0 0 19 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7229 9.0589L13.7168 9.0527M5.42635 9.0589L5.42023 9.0527M13.7229 4.90135C13.7229 2.60863 11.8643 0.75 9.57163 0.75C7.27889 0.75 5.42027 2.60863 5.42027 4.90135M2.82567 19.95H15.7986C16.945 19.95 17.8743 19.0207 17.8743 17.8743V6.97703C17.8743 5.83066 16.945 4.90135 15.7986 4.90135H2.82567C1.67931 4.90135 0.75 5.83066 0.75 6.97703V17.8743C0.75 19.0207 1.67931 19.95 2.82567 19.95Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Full-time</p>
              </div>
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="14"
                  height="24"
                  viewBox="0 0 14 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 0.75V22.75M11.75 4.75H4.25C3.32174 4.75 2.4315 5.11875 1.77513 5.77513C1.11875 6.4315 0.75 7.32174 0.75 8.25C0.75 9.17826 1.11875 10.0685 1.77513 10.7249C2.4315 11.3813 3.32174 11.75 4.25 11.75H9.25C10.1783 11.75 11.0685 12.1187 11.7249 12.7751C12.3813 13.4315 12.75 14.3217 12.75 15.25C12.75 16.1783 12.3813 17.0685 11.7249 17.7249C11.0685 18.3813 10.1783 18.75 9.25 18.75H0.75"
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>20-30 LPA</p>
              </div>
            </div>
            <div className="text-xs flex flex-row items-center justify-start w-full gap-8">
              <p className="after:absolute relative after:w-1 after:h-1 after:bottom-1 after:right-[105%] after:rounded-full after:bg-red-300">
                4 available
              </p>
              <p>Posted 8 days ago</p>
            </div>
          </div>
          <div className="flex border border-border-lighter rounded-md m-4 p-4 flex-col items-center gap-3">
            <div className="flex flex-row items-center justify-start w-full">
              <h1 className="font-semibold">Senior Software Engineer</h1>
              <p className="mx-auto text-sm py-1 px-2 text-candy-red bg-red-200 rounded-lg">
                Active
              </p>
              <div className="flex ml-auto flex-row items-center justify-center gap-4 p-2">
                <button className="border-border-lighter border rounded-lg py-1 px-2">
                  View Details
                </button>
                <button className="bg-btn-gradient text-primary rounded-lg px-2 py-1">
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center justify-baseline w-full gap-4">
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.80978 18.57C8.64658 18.6872 8.45071 18.7503 8.24978 18.7503C8.04885 18.7503 7.85298 18.6872 7.68978 18.57C2.86078 15.128 -2.26422 8.048 2.91678 2.932C4.33912 1.53285 6.25462 0.749124 8.24978 0.750001C10.2498 0.750001 12.1688 1.535 13.5828 2.931C18.7638 8.047 13.6388 15.126 8.80978 18.57Z"
                    stroke="#EDEDED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 9.75C8.78043 9.75 9.28914 9.53929 9.66421 9.16421C10.0393 8.78914 10.25 8.28043 10.25 7.75C10.25 7.21957 10.0393 6.71086 9.66421 6.33579C9.28914 5.96071 8.78043 5.75 8.25 5.75C7.71957 5.75 7.21086 5.96071 6.83579 6.33579C6.46071 6.71086 6.25 7.21957 6.25 7.75C6.25 8.28043 6.46071 8.78914 6.83579 9.16421C7.21086 9.53929 7.71957 9.75 8.25 9.75Z"
                    stroke="#EDEDED"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Bungalore, India</p>
              </div>
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="19"
                  height="21"
                  viewBox="0 0 19 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7229 9.0589L13.7168 9.0527M5.42635 9.0589L5.42023 9.0527M13.7229 4.90135C13.7229 2.60863 11.8643 0.75 9.57163 0.75C7.27889 0.75 5.42027 2.60863 5.42027 4.90135M2.82567 19.95H15.7986C16.945 19.95 17.8743 19.0207 17.8743 17.8743V6.97703C17.8743 5.83066 16.945 4.90135 15.7986 4.90135H2.82567C1.67931 4.90135 0.75 5.83066 0.75 6.97703V17.8743C0.75 19.0207 1.67931 19.95 2.82567 19.95Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Full-time</p>
              </div>
              <div className="flex flex-row items-center justify-center w-fit ">
                <svg
                  width="14"
                  height="24"
                  viewBox="0 0 14 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 0.75V22.75M11.75 4.75H4.25C3.32174 4.75 2.4315 5.11875 1.77513 5.77513C1.11875 6.4315 0.75 7.32174 0.75 8.25C0.75 9.17826 1.11875 10.0685 1.77513 10.7249C2.4315 11.3813 3.32174 11.75 4.25 11.75H9.25C10.1783 11.75 11.0685 12.1187 11.7249 12.7751C12.3813 13.4315 12.75 14.3217 12.75 15.25C12.75 16.1783 12.3813 17.0685 11.7249 17.7249C11.0685 18.3813 10.1783 18.75 9.25 18.75H0.75"
                    stroke="#1E1E1E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>20-30 LPA</p>
              </div>
            </div>
            <div className="text-xs flex flex-row items-center justify-start w-full gap-8">
              <p className="after:absolute relative after:w-1 after:h-1 after:bottom-1 after:right-[105%] after:rounded-full after:bg-red-300">
                4 available
              </p>
              <p>Posted 8 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
