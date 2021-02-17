import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
interface OwnProps {
  style : any;
  text : string | null;
};

type Props = OwnProps;

const TextCustom: FunctionComponent<Props> = ({ style, text }) => {
    return (text) ? (
      <Text style={{...style}}>{text}</Text>
    ) : null
};
export default TextCustom;
