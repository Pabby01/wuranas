import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type LinkProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

export default function Link({ href, children, className }: LinkProps) {
  return (
    <NextLink href={href} className={className}>
      <StyledSpan>{children}</StyledSpan>
    </NextLink>
  );
}

const StyledSpan = styled.span`
  display: inline;
  width: fit-content;
  text-decoration: none;

  background: linear-gradient(rgb(var(--primary)), rgb(var(--primary)));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 100% 0px;
  transition: 100ms;
  transition-property: background-size, text-decoration, color;
  color: rgb(var(--primary));

  &:hover {
    background-size: 100% 100%;
    text-decoration: none;
    color: rgb(var(--background));
  }

  &:active {
    color: rgb(var(--background));
    background-size: 100% 100%;
  }
`;
