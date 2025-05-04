export type ButtonOptions = {
  class?: string;
  type?: 'primary' | 'secondary' | 'plain';
  size?: 'small' | 'medium' | 'large' | 'fill' | 'fit';
  shape?: 'round' | 'rectangular' | 'box';
  disabled?: boolean;
  loading?: boolean;
  onclick?: () => void;
};
