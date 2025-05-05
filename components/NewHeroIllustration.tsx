import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledSvg = styled.svg`
  animation: ${float} 6s ease-in-out infinite;
  .pulse {
    animation: ${pulse} 4s ease-in-out infinite;
    transform-origin: center;
  }
`;

export default function NewHeroIllustration() {
  return (
    <StyledSvg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="400" cy="300" r="150" className="pulse" fill="rgba(147, 51, 234, 0.1)" />
      <circle cx="400" cy="300" r="100" className="pulse" fill="rgba(147, 51, 234, 0.2)" />
      <path
        d="M400 150C489.411 150 562.5 223.089 562.5 312.5C562.5 401.911 489.411 475 400 475C310.589 475 237.5 401.911 237.5 312.5C237.5 223.089 310.589 150 400 150Z"
        fill="rgb(147, 51, 234)"
        fillOpacity="0.2"
      />
      <path
        d="M400 200C461.797 200 512.5 250.703 512.5 312.5C512.5 374.297 461.797 425 400 425C338.203 425 287.5 374.297 287.5 312.5C287.5 250.703 338.203 200 400 200Z"
        fill="rgb(147, 51, 234)"
        fillOpacity="0.4"
      />
      <path
        d="M375 275L425 325L375 375"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
}