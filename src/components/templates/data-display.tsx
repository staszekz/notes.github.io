import { ReactNode } from 'react';
import { AddNewButton, openNoteModal, openTodoModal, SelectView } from '@notes/components';
import { Grid, Title, Text, Flex } from '@mantine/core';
import { viewTypes } from '@notes/types';
import { useLocation } from '@tanstack/react-router';
import { useNetwork } from '@mantine/hooks';
import { useDisplayViewContext } from '@notes/hooks';

type Props = {
  isData: boolean;
  title: string;
  Table: () => ReactNode;
  Stickers: () => ReactNode;
  Tiles: () => ReactNode;
};

export function DataDisplay({ isData, title, Table, Stickers }: Props) {
  const { view } = useDisplayViewContext();

  const { online } = useNetwork();
  const pathname = useLocation({
    select: location => location.pathname
  });
  const isNotes = pathname.includes('notes');
  return (
    <>
      <Grid align="center" justify="space-between" p="xl">
        <Grid.Col span={3} order={{ base: 1, sm: 2, lg: 1 }}>
          <AddNewButton openModal={isNotes ? openNoteModal : openTodoModal} />
        </Grid.Col>
        <Grid.Col span={3} order={{ base: 1, sm: 2, lg: 1 }}>
          <Flex direction={'column'} align={'center'}>
            <Title order={2}>{title}</Title>

            <Text
              size="lg"
              c={'var(--red)'}
              fs={'italic'}
              ff={'auto'}
              style={{ visibility: online ? 'hidden' : 'visible' }}
            >
              <Flex direction={'row'} align={'center'}>
                you are offline{' '}
              </Flex>
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={3} order={{ base: 1, sm: 2, lg: 1 }}>
          <SelectView />
        </Grid.Col>
      </Grid>
      {view === viewTypes.TABLE && <Table />}
      {view === viewTypes.STICKERS && <Stickers />}
      {/*{viewType.value === viewTypes.GRID && <Tiles />}*/}

      {!isData && <Title order={3}>Your list is empty! </Title>}
    </>
  );
}
