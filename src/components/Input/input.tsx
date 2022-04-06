import { FormikValues } from 'formik';
import { get } from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors } from '../../themes/colors';
import { size } from '../../themes/fonts';
import metrics from '../../themes/metrics';

type InputProps = {
  name: string;
  formik: FormikValues;
  imgSource?: string;
  editable?: boolean;
  title?: string;
  placeholder?: string;
  isIcon?: any;
};

const Input = ({ name, title, placeholder, formik, isIcon, editable }: InputProps) => {
  const { values, errors, submitCount, handleChange, setFieldTouched } = formik;

  const value = get(values, name);
  const isInitialError = typeof get(errors, name) === 'string';
  const isError = isInitialError && submitCount > 0;
  const Info = submitCount === 0 ? '' : get(errors, name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
        {isInitialError && ' *'}
      </Text>

      <View style={[!isError ? styles.formInputContainer : styles.error]}>
        {isIcon ? <Image source={isIcon} style={styles.formInputImage} /> : null}
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          autoCapitalize="none"
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          editable={editable}
        />
      </View>

      {Info ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={[!isError ? styles.Info : styles.errorInfo]}>{Info}</Text>
        </Animatable.View>
      ) : null}
    </View>
  );
};
export default Input;

Input.defaultProps = {
  title: '',
  placeholder: ''
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
