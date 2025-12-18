import Logo from "../assets/img/Logo.webp";
import Image from "../../shared/components/Image";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-20 bg-white dark:bg-gray-900 h-16 sm:h-20 md:h-24 shadow-lg transition-colors duration-300">
      <Link to="/">
        <Image
          SrcImage={Logo}
          AltImage="Logo"
          classNameImage="w-20 h-10 sm:w-[102.47px] sm:h-[52.87px] dark:brightness-0 dark:invert"
        />
      </Link>
    </header>
  );
};

export default Header;
