import { Title as MantineTitle } from '@mantine/core';

export function Title({ children, pb, c, size, ta }: TitleProps) {
  return (
    <MantineTitle ta={ta || 'center'} c={c || 'var(--primary)'} size={size || 'h2'} pb={pb}>
      {children}
    </MantineTitle>
  );
}

type TitleProps = {
  children: React.ReactNode;
  pb?: number;
  c?: string;
  size?: string;
  ta?: string;
};
