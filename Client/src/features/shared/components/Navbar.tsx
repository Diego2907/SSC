type NavbarProps = {
  Links: string[];
  NavClassName?: string;
  LinkClassName?: string;
};

const Navbar = ({ Links, NavClassName, LinkClassName }: NavbarProps) => {
  const getHref = (label: string) => {
    switch (label) {
      case "Inicio":
        return "#inicio";
      case "Conócenos":
        return "#conocenos";
      case "Servicios":
        return "#servicios";
      case "Marcas que trabajamos":
      case "Nuestras marcas":
        return "#marcas";
      case "Preguntas frecuentes":
        return "#preguntas-frecuentes";
      default:
        return "#";
    }
  };

  return (
    <nav className={NavClassName}>
      {Links.map((link, index) => (
        <a key={index} href={getHref(link)} className={LinkClassName}>
          {link}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
