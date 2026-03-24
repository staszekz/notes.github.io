import { Select } from '@mantine/core';
import { ViewType, viewTypes } from '@notes/types';
import { formOption } from '@notes/utils';
import { useDisplayViewContext } from '@notes/hooks';

const options = [
  formOption<ViewType>(viewTypes.TABLE),
  // formOption<ViewType>(viewTypes.GRID),
  formOption<ViewType>(viewTypes.STICKERS)
];

export const SelectView = ({ withLabel = true, disabled = false }) => {
  const { view, setView } = useDisplayViewContext();
  return (
    <Select
      disabled={disabled}
      c={'var(--primary)'}
      label={withLabel && 'Change display view:'}
      data={options}
      value={view}
      allowDeselect={false}
      // because Mantine Select only accepts string as value we need to cast it to ViewType
      onChange={_value => setView(_value as ViewType)}
    />
  );
};
