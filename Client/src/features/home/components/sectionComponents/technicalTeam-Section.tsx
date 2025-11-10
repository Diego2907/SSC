type technicalTeamProps = {
  imgSrc: string;
  altImage: string;
  classNameImage?: string;
  name: string;
  position: string;
};

const technicalTeam = ({
  imgSrc,
  classNameImage,
  altImage,
  name,
  position,
}: technicalTeamProps) => {
  return;
  <div>
    <img src={imgSrc} alt={altImage} className={classNameImage}></img>
    <p>{name}</p>
    <p>{position}</p>
  </div>;
};

export default technicalTeam;
