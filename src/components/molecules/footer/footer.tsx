import { Box, Flex } from '@mantine/core';
import { AnchorLink } from '../../atoms';

export function Footer() {
  return (
    <Flex
      wrap="wrap"
      pos={'sticky'}
      bg={'var(--dark-bg-color)'}
      c={'var(--primary)'}
      p={'1rem'}
      bottom={0}
      justify={'space-between'}
      style={{ borderTop: '2px solid var(--primary)' }}
    >
      <Box>made with ❤ by Staszek Zajaczkowski</Box>
      <Box>
        visit:{' '}
        <AnchorLink href="https://www.staszek.ovh" target="_blank" rel="noopener noreferrer">
          staszek.ovh
        </AnchorLink>
      </Box>
      <Box>&#169; notes&todos {new Date().getFullYear()}</Box>
    </Flex>
  );
}
