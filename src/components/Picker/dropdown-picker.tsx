import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FormikValues } from 'formik';
import { get } from 'lodash';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../themes/colors';
import { size } from '../../themes/fonts';
import metrics from '../../themes/metrics';

interface Props {
  zIndex: number;
  placeHolder: string;
  list: any[];
  formik: FormikValues;
  name: string;
  onSearchText(text: string): void;
}

const DropdownPicker: React.FC<Props> = (props: Props) => {
  const { setFieldValue, errors, submitCount } = props.formik;

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(props.list);
  const [value, setValue] = useState(null);

  const isInitialError = typeof get(errors, props.name) === 'string';
  const isError = isInitialError && submitCount > 0;
  const Info = submitCount === 0 ? '' : get(errors, props.name);

  useEffect(() => {
    setFieldValue(props.name, value);
  }, [value]);

  return (
    <>
      <DropDownPicker
        style={{ borderColor: '#CCC' }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setItems={setItems}
        searchable={true}
        zIndex={props.zIndex}
        placeholder={props.placeHolder}
        // @ts-ignore
        setValue={setValue}
        onChangeSearchText={(text: string) => {
          props.onSearchText(text);
        }}
      />
      {Info ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={[!isError ? styles.Info : styles.errorInfo]}>{Info}</Text>
        </Animatable.View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 10
  },
  title: {
    color: colors.InputTextColor,
    fontWeight: '500',
    fontSize: size.font14,
    marginBottom: metrics.screenHeight * 0.01,
    height: metrics.screenHeight * 0.03
  },
  textInput: {
    width: '100%',
    height: metrics.screenHeight * 0.052,
    padding: metrics.screenHeight * 0.01,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
  formInputContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    height: metrics.screenHeight * 0.052,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
  formInputImage: {
    height: metrics.screenHeight * 0.025,
    width: metrics.screenHeight * 0.025,
    display: 'flex',
    alignSelf: 'center',
    marginLeft: metrics.screenHeight * 0.01,
    opacity: 0.6
  },
  Info: {
    fontSize: size.font10,
    padding: 4,
    position: 'absolute',
    lineHeight: 1,
    borderRadius: 4,
    bottom: -20,
    color: colors.error
  },
  error: {
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ff0025',
    width: '100%',
    borderRadius: 4,
    height: metrics.screenHeight * 0.052,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
  errorInfo: {
    color: colors.error
  }
});

export default DropdownPicker;
