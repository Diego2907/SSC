type ButtonProps = {
  textButton: string;
  ClassNameButton?: string;
  onClick?: () => void;
};

const Button = ({ textButton, ClassNameButton, onClick }: ButtonProps) => {
  return (
    <button className={ClassNameButton} onClick={onClick}>
      {textButton}
    </button>
  );
};

export default Button;
