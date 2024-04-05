import * as S from './TextFontBoxStyle';

interface TextFontBoxProps {
  text: string;
  onClick?: () => void;
  color?: string;
  isFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  margin?: boolean;
}
const TextFontBox = ({
  className,
  margin = false,
  text,
  onClick,
  children,
  color = '#fff',
  isFocus = true,
}: TextFontBoxProps) => {
  return (
    <S.TextBox className={className} $margin={margin} onClick={onClick} $color={color} $isFocus={isFocus}>
      {text}
      {children}
    </S.TextBox>
  );
};

export default TextFontBox;
