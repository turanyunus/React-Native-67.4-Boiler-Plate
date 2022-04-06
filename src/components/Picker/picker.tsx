import RNPickerSelect from 'react-native-picker-select';
import { FormikValues } from 'formik';
import React, { useEffect } from 'react';
import { get } from 'lodash';
import { View } from 'react-native';
import metrics from '../../themes/metrics';

interface Props {
  formik: FormikValues;
  name: string;
  items: any[];
  width?: number;
}

export const Picker: React.FC<Props> = (props: Props) => {
  const { values, errors, submitCount, setFieldValue } = props.formik;
  const value = get(values, props.name);

  useEffect(() => {
    setFieldValue(props.name, value);
  }, []);

  return (
    <View style={{ width: props.width ? props.width : metrics.screenWidth * 0.9 }}>
      <RNPickerSelect
        placeholder={{
          label: value ? value : 'Select',
          value: ''
        }}
        onValueChange={(value) => setFieldValue(props.name, value)}
        items={props.items}
        value={value}
      />
    </View>
  );
};
