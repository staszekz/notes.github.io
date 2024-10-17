import { ControlConfig } from '@notes/types';

export function getTableControls<T>(original: T, controlsConfig: ControlConfig<T>) {
  return Object.keys(controlsConfig).map(key => {
    const config = controlsConfig[key];
    if (config) {
      return {
        onClick: () => config.onClick(original),
        icon: {
          Component: config.icon,
          color: config.color
        },
        tooltipMessage: config.tooltipMessage
      };
    }
  }).filter(Boolean);
};