import { useState } from 'react';
import { AddNewButton, openNoteModal } from '@notes/components';
import { ComboboxItem, Grid, Select, Title } from '@mantine/core';
import { MainLayout } from '@notes/layout';
import { ViewType, viewTypes } from '@notes/types';
import { formOption } from '@notes/utils';

type Props = {
  isData: boolean;
  title: string;
  Table: React.FC<{ isLoading: boolean }>;
  Stickers?: React.FC;
  Tiles?: React.FC;
};

export function DataDisplay({ isData, title, Table, Stickers, Tiles }: Props) {
  const [viewType, setViewType] = useState<ComboboxItem>(formOption<ViewType>(viewTypes.TABLE));

  const options = [
    formOption<ViewType>(viewTypes.TABLE),
    formOption<ViewType>(viewTypes.GRID),
    formOption<ViewType>(viewTypes.STICKERS)
  ];

  return (
    <MainLayout>
      <Grid align="center" justify="space-between" p="xl">
        <Grid.Col span={3} order={{ base: 1, sm: 2, lg: 1 }}>
          <AddNewButton openModal={openNoteModal} />
        </Grid.Col>
        <Grid.Col span={3} order={{ base: 1, sm: 2, lg: 1 }}>
          <Title order={2}>{title}</Title>
        </Grid.Col>
        <Grid.Col span={3} order={{ base: 1, sm: 2, lg: 1 }}>
          <Select
            c={'var(--primary)'}
            label="Change display view:"
            data={options}
            value={viewType.value}
            allowDeselect={false}
            onChange={(_value, option) => setViewType(option)}
          />
        </Grid.Col>
      </Grid>
      {viewType.value === viewTypes.TABLE && <Table isLoading={!isData} />}
      {viewType.value === viewTypes.STICKERS && <Stickers isLoading={!isData} />}
      {viewType.value === viewTypes.GRID && <Tiles isLoading={!isData} />}

      {!isData && <Title order={3}>Your list is empty! </Title>}
    </MainLayout>
  );
}
