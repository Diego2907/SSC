type ButtonProps = {
  textButton: string;
  ClassNameButton?: string;
};

const Button = ({ textButton, ClassNameButton }: ButtonProps) => {
  return <button className={ClassNameButton}>{textButton}</button>;
};

export default Button;
