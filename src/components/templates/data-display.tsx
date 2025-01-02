import { FC, ReactNode, useState } from 'react';
import { AddNewButton, openNoteModal } from '@notes/components';
import { ComboboxItem, Grid, Select, Title } from '@mantine/core';
import { ViewType, viewTypes } from '@notes/types';
import { formOption } from '@notes/utils';

type Props = {
  isData: boolean;
  title: string;
  Table: () => ReactNode;
  Stickers: () => ReactNode;
  Tiles: () => ReactNode;
};

export function DataDisplay({ isData, title, Table, Stickers, Tiles }: Props) {
  const [viewType, setViewType] = useState<ComboboxItem>(formOption<ViewType>(viewTypes.TABLE));

  const options = [
    formOption<ViewType>(viewTypes.TABLE),
    // formOption<ViewType>(viewTypes.GRID),
    formOption<ViewType>(viewTypes.STICKERS)
  ];

  return (
    <>
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
      {viewType.value === viewTypes.TABLE && <Table />}
      {viewType.value === viewTypes.STICKERS && <Stickers />}
      {/*{viewType.value === viewTypes.GRID && <Tiles />}*/}

      {!isData && <Title order={3}>Your list is empty! </Title>}
    </>
  );
}
