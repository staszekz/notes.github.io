
export type ControlConfig<T> = {
  [key: string]: {
    onClick: (original: T) => void;
    icon: JSX.Element;
    color: string;
    tooltipMessage: string;
  };
};