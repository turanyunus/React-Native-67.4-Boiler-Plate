import React, { useEffect, useState } from 'react';
// @ts-ignore
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FormikValues } from 'formik';
import { get } from 'lodash';
import * as Animatable from 'react-native-animatable';
import { colors } from '../../themes/colors';
import { size } from '../../themes/fonts';
import metrics from '../../themes/metrics';
import moment from 'moment';

interface Props {
  formik: FormikValues;
  mode: 'date' | 'time' | 'datetime';
  defaultValue: Date;
  name: string;
  title: string;
}

const DateTimePickerComponent: React.FC<Props> = (props: Props) => {
  const { values, errors, submitCount, setFieldValue } = props.formik;
  const [show, setShow] = useState(false);

  const value = new Date(get(values, props.name));
  const valueString = get(values, props.name);
  const isInitialError = typeof get(errors, props.name) === 'string';
  const isError = isInitialError && submitCount > 0;
  const Info = submitCount === 0 ? '' : get(errors, props.name);

  useEffect(() => {
    setFieldValue(props.name, props.defaultValue.toString());
  }, []);

  const showDatepicker = () => {
    if (!show) setShow(true);
  };

  const closeDatepicker = () => {
    if (show) setShow(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.title}
        {isInitialError && ' *'}
      </Text>

      <View style={[!isError ? styles.formInputContainer : styles.error]}>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.textInput}>{moment(value).format('DD-MM-YYYY')}</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          // @ts-ignore
          testID="dateTimePicker"
          value={value}
          // @ts-ignore
          mode={props.mode}
          //is24Hour={true}
          display="default"
          onChange={(event: any, date: any) => {
            if (date) {
              closeDatepicker();
              setFieldValue(props.name, moment(date.toString()).format('YYYY-MM-DD'));
            }
          }}
        />
      )}

      {Info ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={[!isError ? styles.Info : styles.errorInfo]}>{Info}</Text>
        </Animatable.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 10
  },
  title: {
    fontSize: 14,
    marginBottom: 10
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

export default DateTimePickerComponent;
