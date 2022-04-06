import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors } from '../../themes/colors';
import { splashLogo } from '../../assets/icons/';
import metrics from '../../themes/metrics';
import { size } from '../../themes/fonts';
import BackButtonHeaderComponent from '../../components/Button/back-button-header';
import Button from '../../components/Button/button';
import * as Yup from 'yup';
import Input from '../../components/Input/input';
import { email, padlock, phone, user } from '../../assets/icons';
import { Role, UserCreateRequest } from '../../models/dto/user';
import moment from 'moment';
import { useFormik } from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validation = Yup.object({
  email: Yup.string().email('Please enter valid email').required('Email Address is Required'),
  name: Yup.string().required('Name is Required'),
  surname: Yup.string().required('Surname is Required'),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password Confirm is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'to short')
    .max(10, 'to long')
    .required('Phone is required')
});

const initialState: UserCreateRequest = {
  email: '',
  password: '',
  phone: '',
  name: '',
  surname: '',
  // @ts-ignore
  role: Object.keys(Role).find((key) => key === 'INDIVIDUAL'),
  tckn: '00000000000',
  birthdate: moment().format('YYYY-MM-DD')
};

const RegisterPage = (props: any) => {
  const [spinner, setSpinner] = useState(false);
  const initialValues: UserCreateRequest = initialState;

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onRegister(values);
    },
    validationSchema: validation
  });

  const onRegister = (values: UserCreateRequest) => { };

  return (
    <>
      <Spinner visible={spinner} textContent={'Kayıt işlemi yapılıyor...'} textStyle={{ color: '#ffffff' }} />

      <View style={styles.container}>
        <BackButtonHeaderComponent navigation={props.navigation} />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounce"
            duration={1500}
            source={splashLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text_header}>RN-0.67.4-Boiler-Plate</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.formStyle}>
          <ScrollView>
            <Input formik={formik} name={'email'} title={'Email'} isIcon={email} placeholder={'Email'} />
            <Input formik={formik} name={'name'} title={'Name'} isIcon={user} placeholder={'Name'} />
            <Input formik={formik} name={'surname'} title={'Surname'} isIcon={user} placeholder={'Surname'} />
            <Input formik={formik} name={'password'} title={'Password'} isIcon={padlock} placeholder={'Password'} />
            <Input
              formik={formik}
              name={'passwordConfirm'}
              title={'Password Confirm'}
              isIcon={padlock}
              placeholder={'Confirm'}
            />
            <Input formik={formik} name={'phone'} title={'Phone'} isIcon={phone} placeholder={'Phone'} />

            {/* Giriş Yap Buton Kısmı */}
            <Button
              label={'Kayıt Olunuz'}
              color={colors.primary}
              loading={spinner}
              onPress={formik.handleSubmit}
              style={styles.signInButton}
              upperCase={false}
              disabled={spinner}
            />
            {/* Footer Kısmı */}
            <View style={styles.footerSide}>
              <TouchableOpacity>
                <Text style={styles.footerText} onPress={() => props.navigation.navigate('LogInPage')}>
                  Giriş yapmak istiyorum?
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </>
  );
};

const { height } = Dimensions.get('screen');
const logo = height * 0.24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  logo: {
    width: logo * 0.5,
    height: logo * 0.5
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text_header: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: size.font20
  },
  formStyle: {
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: metrics.screenHeight * 0.04,
    borderTopRightRadius: metrics.screenHeight * 0.04,
    paddingHorizontal: metrics.screenHeight * 0.03,
    paddingVertical: metrics.screenHeight * 0.04
  },
  signInButton: {
    width: '100%',
    height: metrics.screenHeight * 0.06,
    marginTop: metrics.screenHeight * 0.03,
    justifyContent: 'center',
    borderRadius: 10
  },
  signInButtonText: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
  footerSide: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  footerText: {
    color: colors.black,
    marginTop: metrics.screenHeight * 0.02,
    fontSize: size.font14
  }
});

export default RegisterPage;
