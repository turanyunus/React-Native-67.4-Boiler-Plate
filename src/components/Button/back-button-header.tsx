import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { size } from '../../themes/fonts';
import metrics from '../../themes/metrics';

interface Props {
  navigation: any;
}

const BackButtonHeaderComponent: React.FC<Props> = (props: Props) => (
  <TouchableOpacity onPress={props.navigation.goBack} style={{ padding: metrics.screenHeight * 0.02 }}>
    <Image
      source={require('../../assets/icons/back-button.png')}
      style={{
        height: size.font25,
        width: size.font25
      }}
    />
  </TouchableOpacity>
);

export default BackButtonHeaderComponent;
