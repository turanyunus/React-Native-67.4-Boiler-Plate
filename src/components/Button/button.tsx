import * as React from 'react';
import { Button } from 'react-native-paper';

interface Props {
  label: string;
  color: string;
  loading?: boolean;
  disabled?: boolean;
  upperCase?: boolean;
  widthPercent?: string;
  style?: object;

  onPress(): void;
}

const ButtonComponent: React.FC<Props> = (props: Props) => (
  <Button
    style={[{ backgroundColor: props.color, width: props.widthPercent }, props.style]}
    mode="contained"
    uppercase={props.upperCase}
    loading={props.loading}
    disabled={props.disabled}
    onPress={props.onPress}
  >
    {props.label}
  </Button>
);

export default ButtonComponent;
