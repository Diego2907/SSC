type ImageProps = {
  SrcImage: string;
  AltImage: string;
  classNameImage?: string;
};

const Image = ({ SrcImage, AltImage, classNameImage }: ImageProps) => {
  return <img src={SrcImage} alt={AltImage} className={classNameImage}></img>;
};

export default Image;
