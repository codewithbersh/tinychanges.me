import { cn } from "@/lib/utils";

export const Icons = {
  twitter: () => (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>social_x_line</title>
      <g id="Icon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Logo" transform="translate(-48.000000, -288.000000)">
          <g id="social_x_line" transform="translate(48.000000, 288.000000)">
            <path
              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5935,23.2578 L12.5819,23.2595 L12.5109,23.295 L12.4919,23.2987 L12.4767,23.295 L12.4057,23.2595 C12.3958,23.2564 12.387,23.259 12.3821,23.2649 L12.378,23.2758 L12.3609,23.7031 L12.3659,23.7235 L12.3769,23.7357 L12.4805,23.8097 L12.4953,23.8136 L12.5071,23.8097 L12.6107,23.7357 L12.6233,23.7197 L12.6267,23.7031 L12.6096,23.2758 C12.6076,23.2657 12.601,23.2593 12.5935,23.2578 Z M12.8584,23.1453 L12.8445,23.1473 L12.6598,23.2397 L12.6499,23.2499 L12.6472,23.2611 L12.6651,23.6906 L12.6699,23.7034 L12.6784,23.7105 L12.8793,23.8032 C12.8914,23.8069 12.9022,23.803 12.9078,23.7952 L12.9118,23.7812 L12.8777,23.1665 C12.8753,23.1546 12.8674,23.147 12.8584,23.1453 Z M12.143,23.1473 C12.1332,23.1424 12.1222,23.1453 12.1156,23.1526 L12.1099,23.1665 L12.0758,23.7812 C12.0751,23.7927 12.0828,23.8019 12.0926,23.8046 L12.1083,23.8032 L12.3092,23.7105 L12.3186,23.7024 L12.3225,23.6906 L12.3404,23.2611 L12.3372,23.2485 L12.3278,23.2397 L12.143,23.1473 Z"
              id="MingCute"
              fillRule="nonzero"
            ></path>
            <path
              d="M19.7526,4.65852 C20.1163,4.24288 20.0741,3.61112 19.6585,3.24744 C19.2429,2.88375 18.6111,2.92587 18.2474,3.34151 L13.1367,9.18231 L8.80001,3.40001 C8.61115,3.14821 8.31476,2.99999773 8.00000128,2.99999773 L4.00000128,2.99999773 C3.62123,2.99999773 3.27497,3.21402 3.10558,3.5528 C2.93619,3.89158 2.97274,4.297 3.20001,4.60001 L9.63673,13.1823 L4.24743,19.3415 C3.88375,19.7571 3.92586,20.3889 4.3415,20.7526 C4.75714,21.1163 5.3889,21.0742 5.75258,20.6585 L10.8633,14.8177 L15.2,20.6 C15.3889,20.8518 15.6852,21.0000537 16.0000013,21.0000537 L20.0000013,21.0000537 C20.3788,21.0000537 20.725,20.786 20.8944,20.4472 C21.0638,20.1084 21.0273,19.703 20.8,19.4 L14.3633,10.8177 L19.7526,4.65852 Z M16.50001,19 L6.00001,5.00001 L7.50001,5.00001 L18.00001,19 L16.50001,19 Z"
              id="形状"
              fill="#09244BFF"
              className="fill-primary"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  google: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="16"
      height="16"
      viewBox="0 0 50 50"
      className=" fill-primary"
    >
      <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
    </svg>
  ),
  logo: ({ className }: { className: string }) => (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M39.4564 24.6769L47.5396 16.8769C49.4049 15.0769 49.4049 12.2769 47.5396 10.4769L36.0366 21.5769L33.964 19.5769L42.1508 11.6769C44.0162 9.87691 44.0162 7.07692 42.1508 5.27692L30.5442 16.4769L28.4716 14.4769L36.762 6.47691C38.6274 4.67691 38.6274 1.8769 36.762 0.0769043L25.0518 11.1769L17.5904 3.87691C15.7251 2.07691 12.8235 2.07691 10.9581 3.87691L21.7356 14.2769L19.5594 16.3769L12.098 9.17691C10.2327 7.37691 7.33103 7.37691 5.46569 9.17691L16.2433 19.5769L14.1707 21.5769L6.70926 14.3769C4.84392 12.5769 1.94228 12.5769 0.0769348 14.3769L10.6472 24.5769L2.56405 32.3769C0.69871 34.1769 0.69871 36.9769 2.56405 38.7769L14.067 27.6769L16.1396 29.6769L7.95284 37.5769C6.0875 39.3769 6.0875 42.1769 7.95284 43.9769L19.5594 32.7769L21.632 34.7769L13.3416 42.7769C11.4762 44.5769 11.4762 47.3769 13.3416 49.1769L24.9482 37.9769L32.4096 45.2769C34.2749 47.0769 37.1766 47.0769 39.0419 45.2769L28.2643 34.8769L30.4406 32.7769L37.902 39.9769C39.7673 41.7769 42.669 41.7769 44.5343 39.9769L33.7568 29.5769L35.8294 27.5769L43.2907 34.7769C45.1561 36.5769 48.0577 36.5769 49.9231 34.7769L39.4564 24.6769ZM25.0518 17.4769L27.1244 19.4769L24.9482 21.5769L22.8756 19.5769L25.0518 17.4769ZM19.5594 26.4769L17.6941 24.6769L19.5594 22.8769L21.4248 24.7769L19.5594 26.4769ZM25.0518 31.6769L22.9792 29.6769L25.1554 27.5769L27.228 29.5769L25.0518 31.6769ZM28.6789 24.5769L30.5442 22.7769L32.4096 24.5769L30.5442 26.3769L28.6789 24.5769Z"
        fill="#FDE047"
      />
    </svg>
  ),
  contributions: ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="#FDE047"
      className={cn("h-4 w-4", className)}
    >
      <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z" />
      <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z" />
      <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z" />
    </svg>
  ),
};
