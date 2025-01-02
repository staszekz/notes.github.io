import { createLink, LinkComponent } from '@tanstack/react-router';
import { forwardRef } from 'react';
import { Anchor, AnchorProps } from '@mantine/core';

interface MantineAnchorProps extends AnchorProps {
  href: string;
  rel: 'noopener noreferrer';
}

const MantineAnchorLink = forwardRef<HTMLAnchorElement, MantineAnchorProps>((props, ref) => {
  return <Anchor ref={ref} {...props} />;
});

const CustomAnchorLink = createLink(MantineAnchorLink);

export const AnchorLink: LinkComponent<typeof MantineAnchorLink> = props => {
  return <CustomAnchorLink preload="intent" {...props} />;
};
