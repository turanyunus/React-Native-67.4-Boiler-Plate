import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import metrics from '../../themes/metrics';
import DateTimePickerComponent from '../../components/Picker/datetime';

import Button from '../../components/Button/button';
import { colors } from '../../themes/colors';
import Input from '../../components/Input/input';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../utils/store/hooks';

const validation = Yup.object({
  pickLocation: Yup.string()
    .nullable(true)
    .min(3, { text: 'MinLengthError', keys: { value: 3 } })
    .required('RequiredField')
});

export interface SearchTourValues {
  pickLocation: string;
  tourDate: Date;
}

const initialState: SearchTourValues = {
  pickLocation: '',
  tourDate: new Date()
};

const SearchTour = () => {
  const initialValues: any = initialState;
  const navigation = useNavigation();
  const searchSliceSelector = useAppSelector((state) => state.searchSlice);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onLogin(values).then();
    },
    validationSchema: validation
  });

  useEffect(() => {
    if (searchSliceSelector.tourLocationPickState.text !== '')
      formik.setFieldValue('pickLocation', searchSliceSelector.tourLocationPickState.text);
  }, [searchSliceSelector.tourLocationPickState.text]);

  const onLogin = async (values: SearchTourValues) => {
    try {
      //const response = await booking.search(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Select Pick Up Location */}
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate('SearchList');
          }}
          style={styles.block}
        >
          <Input
            formik={formik}
            name={'pickLocation'}
            placeholder={'Country, City, Airport and Region'}
            title={'Select Pick Up Location'}
            editable={false}
          />
        </TouchableOpacity>

        {/* Tour Date */}
        <View style={styles.block}>
          <DateTimePickerComponent
            mode={'date'}
            defaultValue={new Date()}
            formik={formik}
            name={'date'}
            title={'Tour Date'}
          />
        </View>

        {/* Search */}
        <View style={styles.block}>
          <Button
            label={'Search'}
            color={colors.primary}
            //loading={spinner}
            onPress={formik.handleSubmit}
            style={styles.buttonStyle}
            upperCase={false}
            //disabled={spinner}
          />
        </View>
        <Text style={styles.componentText}>Find most popular city tours & activities in your destination.</Text>
      </View>
      <Text style={[styles.componentText, { margin: 10 }]}>Aranan Kelimeler : Hotel, Yurt dışı, Tur, Transfer</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginBottom: 2,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#c6c5c5',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  block: {
    marginBottom: metrics.screenWidth * 0.05
  },
  componentText: {
    fontSize: 14,
    marginBottom: 10
  },
  buttonStyle: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  }
});

export default SearchTour;
