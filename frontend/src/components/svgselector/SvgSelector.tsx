interface Props {
  tool: string;
}

const SvgSelector = ({ tool }: Props) => {
  switch (tool) {
    case "pencil":
      return (
        <svg width="25" height="25" viewBox="0 0 32 32" version="1.1">
          <title>pencil</title>
          <path d="M0 32l12-4 20-20-8-8-20 20zM4 28l2.016-5.984 4 4zM8 20l12-12 4 4-12 12z"></path>
        </svg>
      );
    case "brush":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M608 704v160a96 96 0 0 1-192 0V704h-96a128 128 0 0 1-128-128h640a128 128 0 0 1-128 128h-96zM192 512V128.064h640V512H192z" />
        </svg>
      );
    case "line":
      return (
        <svg
          width="22"
          height="19"
          viewBox="0 0 22 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.1274 0.158655L0.193206 15.7068C0.0869428 15.7941 0.0951929 15.9814 0.21154 16.1231L1.69232 17.9263C1.80866 18.068 1.9908 18.1126 2.09706 18.0253L21.0313 2.47713C21.1375 2.38987 21.1293 2.20255 21.0129 2.06087L19.5322 0.257609C19.4158 0.115924 19.2337 0.0713948 19.1274 0.158655Z" />
        </svg>
      );
    case "rect":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3.125C0 2.2962 0.32924 1.50134 0.915291 0.915291C1.50134 0.32924 2.2962 0 3.125 0L21.875 0C22.7038 0 23.4987 0.32924 24.0847 0.915291C24.6708 1.50134 25 2.2962 25 3.125V21.875C25 22.7038 24.6708 23.4987 24.0847 24.0847C23.4987 24.6708 22.7038 25 21.875 25H3.125C2.2962 25 1.50134 24.6708 0.915291 24.0847C0.32924 23.4987 0 22.7038 0 21.875V3.125Z" />
        </svg>
      );
    case "eraser":
      return (
        <svg
          height="25"
          width="25"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <g>
              <path
                d="M267.537,412.71l-89.353-100.514c-1.604-1.801-4.378-1.92-6.127-0.256l-64.99,61.747
           c-20.258,22.238-15.394,56.175,11.827,82.517c15.087,14.601,35.883,24.926,57.293,24.926c16.051,0,32.461-5.811,47.036-19.977
           l44.083-42.539C268.954,417.028,269.056,414.416,267.537,412.71z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M506.837,1.002c-3.14-1.357-6.775-0.7-9.242,1.656L256.418,231.786c-1.673,1.587-1.775,4.207-0.247,5.931l88.747,99.84
           c1.613,1.809,4.403,1.92,6.153,0.239L509.389,185.04c1.672-1.604,2.611-3.823,2.611-6.144V8.844
           C512,5.431,509.969,2.342,506.837,1.002z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M332.86,349.682l-88.883-99.994c-1.604-1.801-4.378-1.92-6.127-0.256l-47.232,44.868
           c-1.664,1.587-1.775,4.207-0.247,5.922l89.216,100.369c1.613,1.809,4.403,1.92,6.153,0.239l46.891-45.244
           C334.276,354,334.379,351.389,332.86,349.682z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M93.867,494.63H8.533c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h85.333c4.719,0,8.533-3.823,8.533-8.533
           S98.586,494.63,93.867,494.63z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M503.467,494.63H264.533c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h238.933
           c4.719,0,8.533-3.823,8.533-8.533S508.186,494.63,503.467,494.63z"
              />
            </g>
          </g>
        </svg>
      );
    case "circle":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23.4375C15.4008 23.4375 18.1828 22.2852 20.234 20.234C22.2852 18.1828 23.4375 15.4008 23.4375 12.5C23.4375 9.59919 22.2852 6.8172 20.234 4.76602C18.1828 2.71484 15.4008 1.5625 12.5 1.5625C9.59919 1.5625 6.8172 2.71484 4.76602 4.76602C2.71484 6.8172 1.5625 9.59919 1.5625 12.5C1.5625 15.4008 2.71484 18.1828 4.76602 20.234C6.8172 22.2852 9.59919 23.4375 12.5 23.4375ZM12.5 25C15.8152 25 18.9946 23.683 21.3388 21.3388C23.683 18.9946 25 15.8152 25 12.5C25 9.18479 23.683 6.00537 21.3388 3.66117C18.9946 1.31696 15.8152 0 12.5 0C9.18479 0 6.00537 1.31696 3.66117 3.66117C1.31696 6.00537 0 9.18479 0 12.5C0 15.8152 1.31696 18.9946 3.66117 21.3388C6.00537 23.683 9.18479 25 12.5 25Z"
          />
        </svg>
      );
    case "save":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>diskette</title>
          <path d="M0 26.016q0 1.92 1.12 3.488t2.88 2.144v-11.648q0-0.832 0.576-1.408t1.44-0.576h20q0.8 0 1.408 0.576t0.576 1.408v11.648q1.76-0.608 2.88-2.144t1.12-3.488v-20q0-1.952-1.12-3.488t-2.88-2.144v11.616q0 0.832-0.576 1.44t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.44v-11.616q-1.76 0.64-2.88 2.144t-1.12 3.488v20zM6.016 30.016q0 0.832 0.576 1.408t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.408v-8q0-0.832-0.608-1.408t-1.408-0.608h-16q-0.832 0-1.408 0.608t-0.576 1.408v8zM10.016 10.016q0 0.832 0.576 1.408t1.408 0.576h12q0.832 0 1.408-0.576t0.608-1.408v-8q0-0.832-0.608-1.408t-1.408-0.608h-12q-0.832 0-1.408 0.608t-0.576 1.408v8zM20 8v-4q0-0.832 0.576-1.408t1.44-0.576 1.408 0.576 0.576 1.408v4q0 0.832-0.576 1.44t-1.408 0.576-1.44-0.576-0.576-1.44z"></path>
        </svg>
      );
    case "undo":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 9.50026H14.0385C15.9502 9.50026 17.5 11.05 17.5 12.9618C17.5 14.8736 15.9502 16.4233 14.0385 16.4233H9.5M6.5 9.50026L8.75 7.42334M6.5 9.50026L8.75 11.5772"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "redo":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 9.50026H9.96155C8.04979 9.50026 6.5 11.05 6.5 12.9618C6.5 14.8736 8.04978 16.4233 9.96154 16.4233H14.5M17.5 9.50026L15.25 7.42334M17.5 9.50026L15.25 11.5772"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return <svg></svg>;
  }
};

export default SvgSelector;
