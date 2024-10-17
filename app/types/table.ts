
export type ControlConfig<T> = {
  [key: string]: {
    onClick: (data: T) => void;
    icon: JSX.Element;
    color: string;
    tooltipMessage: string;
  };
};