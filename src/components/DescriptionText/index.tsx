import React from 'react';

interface DescriptionTextProps {
  children?: React.ReactNode;
}
const DescriptionText: React.FC<DescriptionTextProps> = (props) => {
  const { children } = props;
  return (
    <div key="label" style={{ display: 'flex', justifyContent: 'space-around' }}>
      {children}
    </div>
  )
}

interface DescriptionTextItemProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  reverseColor?: boolean;
}

const LABEL_COLOR = '#00000073';
const VALUE_COLOR = '#000000D9';

export const DescriptionTextItem: React.FC<DescriptionTextItemProps> = (props) => {
  const { top, bottom, className, style, reverseColor = false } = props;
  return (
    <div className={`flex flex-col justify-center ${className}`} style={style}>
      <div style={{ color: reverseColor ? VALUE_COLOR : LABEL_COLOR }}>{top}</div>
      <div style={{ color: reverseColor ? LABEL_COLOR : VALUE_COLOR }}>
        {bottom}
      </div>
    </div>
  )
}

export default DescriptionText;
