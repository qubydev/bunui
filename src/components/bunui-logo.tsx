interface BunUILogoProps {
  className?: string;
  size?: number;
  height?: number;
  width?: number;
}

export function BunUILogo({className, height, size = 26, width}: BunUILogoProps) {
  const svgHeight = height || size;
  const svgWidth = width || size;

  return (
    <>
      <svg
        aria-hidden="true"
        className={className}
        fill="none"
        height={svgHeight}
        viewBox="0 0 612 612"
        width={svgWidth}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M306 78.5c36.5 0 25.267 54.5 43.767 69.5 0 0 4.5-44 17.5-57s31.311-8.08 43.5 5c61.5 66 142.965 75 172.593 186.544C616.581 407.615 563.83 530.197 306 530.197S-4.315 407.615 28.906 282.544C58.534 171 140 162 201.5 96c12.189-13.08 30.5-18 43.5-5s17.5 57 17.5 57c18.5-15 7-69.5 43.5-69.5m-77.137 176.378c-15.074 0-27.294 12.22-27.295 27.294v48.656c.001 15.074 12.221 27.294 27.295 27.294s27.295-12.22 27.295-27.294v-48.656c0-15.074-12.22-27.294-27.295-27.294m154.274 0c-15.074 0-27.294 12.22-27.294 27.294v48.656c0 15.074 12.22 27.294 27.294 27.294s27.294-12.22 27.295-27.294v-48.656c-.001-15.074-12.221-27.294-27.295-27.294"
          fill="currentColor"
        />
      </svg>
    </>
  );
}