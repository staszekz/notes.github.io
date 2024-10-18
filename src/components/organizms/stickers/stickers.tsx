import { SimpleGrid } from '@mantine/core';
import classes from './stickers.module.css';

export function Stickers<T extends { id: number }>({
  data,
  Component
}: {
  data: T[];
  Component: React.FC<{ data: T }>;
}) {
  return (
    <SimpleGrid spacing="xl" component={'ul'} cols={4} p={24} className={classes.stickerWrapper}>
      {data.map(element => {
        return <Component data={element} key={element.id} />;
      })}
    </SimpleGrid>
  );
}
