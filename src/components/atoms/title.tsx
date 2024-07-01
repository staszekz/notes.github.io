import { Title as MantineTitle } from '@mantine/core';

export function Title({ children, pb, c = 'var(--primary)', size = 'h2', ta = 'center' }: TitleProps) {
  return (
    <MantineTitle ta={ta} c={c} size={size} pb={pb}>
      {children}
    </MantineTitle>
  );
}

type TitleProps = {
  children: React.ReactNode;
  pb?: number;
  c?: string;
  size?: string;
  ta?: 'left' | 'right' | 'center' | 'justify';
};
