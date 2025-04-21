export default function ProjectIcon({ type = 'login', style = {}, width = 48, height = 48 }) {
  // In the future, you can switch icons based on `type`.
  if (type === 'login') {
    return (
      <span style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 128 128">
          <path fill="#fff" d="M101.1,105.6C93.7,92.7,79.9,84,64,84h0c-15.9,0-29.7,8.7-37.1,21.6L27,109h74L101.1,105.6z"></path>
          <path fill="#444b54" d="M78.8,89.7c-0.3,0-0.7-0.1-1-0.2c-4.4-1.6-9-2.5-13.8-2.5c-1.7,0-3-1.3-3-3s1.3-3,3-3c5.5,0,10.8,1,15.9,2.8c1.6,0.6,2.3,2.3,1.8,3.9C81.2,88.9,80,89.7,78.8,89.7z"></path>
          <path fill="#444b54" d="M26.9,108.6c-0.5,0-1-0.1-1.5-0.4c-1.4-0.8-1.9-2.6-1.1-4.1C32.4,89.9,47.6,81,64,81c1.7,0,3,1.3,3,3s-1.3,3-3,3c-14.2,0-27.4,7.7-34.5,20.1C29,108,28,108.6,26.9,108.6z"></path>
          <path fill="#fff" d="M64 30A20 20 0 1 0 64 70A20 20 0 1 0 64 30Z"></path>
          <path fill="#444b54" d="M64,73c-12.7,0-23-10.3-23-23s10.3-23,23-23s23,10.3,23,23S76.7,73,64,73z M64,33c-9.4,0-17,7.6-17,17s7.6,17,17,17s17-7.6,17-17S73.4,33,64,33z"></path>
          <g><path fill="#fff" d="M107.9,109h-14c-1.7,0-3-1.3-3-3s1.3-3,3-3h14c1.7,0,3,1.3,3,3S109.6,109,107.9,109z"></path></g>
          <g><path fill="#71c2ff" d="M119,94h-1.1c0-0.2,0.1-0.3,0.1-0.5V85c0-7.7-6.3-14-14-14s-14,6.3-14,14v9h-1c-2.8,0-5,2.2-5,5v7c0,11,9,20,20,20s20-9,20-20v-7C124,96.2,121.8,94,119,94z M96,94v-9c0-4.4,3.6-8,8-8s8,3.6,8,8v8.5c0,0.2,0,0.3,0.1,0.5H96z"></path><path fill="#fff" d="M104,110.7c-1.7,0-3-1.3-3-3v-0.2c0-1.7,1.3-3,3-3s3,1.3,3,3v0.2C107,109.4,105.7,110.7,104,110.7z"></path></g>
        </svg>
      </span>
    );
  }
  if (type === 'register') {
    return (
      <span style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0,0,256,256">
          <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M25.5,9c-4.136,0 -7.5,3.589 -7.5,8c0,4.411 3.364,8 7.5,8c4.136,0 7.5,-3.589 7.5,-8c0,-4.411 -3.364,-8 -7.5,-8zM25.27734,28.33008c-6.88,0 -12.85991,3.65856 -14.87891,9.10156c-0.658,1.771 0.71853,3.56836 2.51953,3.56836h18.51758c-1.367,-3.861 0.5975,-7.93278 4.1875,-9.42578c-2.774,-2.043 -6.4097,-3.24414 -10.3457,-3.24414zM38.5,32c-3.59,0 -6.5,2.91 -6.5,6.5c0,3.59 2.91,6.5 6.5,6.5c3.59,0 6.5,-2.91 6.5,-6.5c0,-3.59 -2.91,-6.5 -6.5,-6.5zM38.5,34.5c0.276,0 0.5,0.224 0.5,0.5v3h3c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5h-3v3c0,0.276 -0.224,0.5 -0.5,0.5c-0.276,0 -0.5,-0.224 -0.5,-0.5v-3h-3c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h3v-3c0,-0.276 0.224,-0.5 0.5,-0.5z"></path></g></g>
        </svg>
      </span>
    );
  }
  if (type === 'dashboard') {
    return (
      <span style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0 0 128 128">
          <path fill="#fff" d="M124,127H4V14C4,8.5,8.5,4,14,4h100c5.5,0,10,4.5,10,10V127z"></path>
          <path fill="#444b54" d="M4,127c-1.7,0-3-1.3-3-3V41c0-1.7,1.3-3,3-3s3,1.3,3,3v83C7,125.7,5.7,127,4,127z"></path>
          <path fill="#444b54" d="M124,127c-1.7,0-3-1.3-3-3V14c0-3.9-3.1-7-7-7H14c-3.9,0-7,3.1-7,7v11h104c1.7,0,3,1.3,3,3s-1.3,3-3,3H4 c-1.7,0-3-1.3-3-3V14C1,6.8,6.8,1,14,1h100c7.2,0,13,5.8,13,13v110C127,125.7,125.7,127,124,127z"></path>
          <circle cx="16" cy="16" r="3" fill="#444b54"></circle>
          <circle cx="26" cy="16" r="3" fill="#444b54"></circle>
          <circle cx="36" cy="16" r="3" fill="#444b54"></circle>
          <path fill="#71c2ff" d="M111,121h-4V61c0-1.7-1.3-3-3-3H86c-1.7,0-3,1.3-3,3v60h-6v-20c0-1.7-1.3-3-3-3H56c-1.7,0-3,1.3-3,3v20h-6V91 c0-1.7-1.3-3-3-3H26c-1.7,0-3,1.3-3,3v30h-4c-1.7,0-3,1.3-3,3s1.3,3,3,3h7h18h12h18h12h18h7c1.7,0,3-1.3,3-3S112.7,121,111,121z"></path>
        </svg>
      </span>
    );
  }
  // Placeholder for future icons
  return null;
}
