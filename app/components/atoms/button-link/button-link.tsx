import { Button, ButtonProps } from '@mantine/core';
import { createLink, Link } from '@tanstack/react-router';
import { ForwardedRef, forwardRef } from 'react';

export const ButtonLink = createLink(
  forwardRef((props: ButtonProps & { onMouseEnter?: () => void }, ref: ForwardedRef<HTMLAnchorElement>) => {
    return <Button {...props} ref={ref} component={Link} />;
  })
);
