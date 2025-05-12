/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HTMLProps, Ref } from 'react';
import styled from 'styled-components';

export interface IconProps extends HTMLProps<HTMLButtonElement>, Record<string, unknown> {
  _ref?: Ref<HTMLButtonElement>;
  icon: string;
}

export default function Icon({ _ref, ...rest }: any) {
  return <IconWrapper type="button" {...rest} {...(_ref && { ref: _ref })} />;
}

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: 4rem;
`;
