type NavbarProps = {
  Links: string[];
  NavClassName?: string;
  LinkClassName?: string;
};

const Navbar = ({ Links, NavClassName, LinkClassName }: NavbarProps) => {
  return (
    <nav className={NavClassName}>
      {Links.map((link, index) => (
        <a key={index} href="#" className={LinkClassName}>
          {link}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
