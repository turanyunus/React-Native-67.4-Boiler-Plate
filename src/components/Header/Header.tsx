import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, TouchableOpacity } from 'react-native';
import { size } from '../../themes/fonts';
import { colors } from '../../themes/colors';

// @ts-ignore
const CustomHeader: React.FC<Props> = (props: Props) => {
  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      {!props.isMenu && props.back ? (
        <TouchableOpacity onPress={props.navigation.goBack}>
          <Image
            source={require('../assets/icons/back-button.png')}
            style={{
              height: size.font25,
              width: size.font25
            }}
          />
        </TouchableOpacity>
      ) : null}
      <Appbar.Content title="RN-0.67.4-Boiler-Plate" />
    </Appbar.Header>
  );
};

export default CustomHeader;
