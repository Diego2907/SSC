import { Link } from "react-router";
import Image from "../../shared/components/Image";
import Logo from "../assets/img/Logo.webp";
import Notificaciones from "../assets/icons/Notificaciones.svg";
import Mensajes from "../assets/icons/Mensajes.svg";
import Chats from "../assets/icons/Chats.svg";
import Historial from "../assets/icons/Historial.svg";
import UserAvatar from "../assets/icons/avatar.svg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-20 bg-white dark:bg-gray-900 h-16 sm:h-20 md:h-24 shadow-lg ">
      <Link to="/">
        <Image
          SrcImage={Logo}
          AltImage="Logo"
          classNameImage="w-20 h-10 sm:w-[102.47px] sm:h-[52.87px] dark:brightness-0 dark:invert"
        />
      </Link>
      <div className="flex items-center justify-end gap-8 pr-5">
        <Image
          SrcImage={Notificaciones}
          AltImage="Icono Notificacioes"
          classNameImage="w-8 h-8 cursor-pointer"
        />
        <Image
          SrcImage={Mensajes}
          AltImage="Icono Mensajes"
          classNameImage="w-8 h-8 cursor-pointer"
        />
        <Image
          SrcImage={Chats}
          AltImage="Icono Chats"
          classNameImage="w-8 h-8 cursor-pointer"
        />
        <Image
          SrcImage={Historial}
          AltImage="Icono Historial"
          classNameImage="w-8 h-8 cursor-pointer"
        />
        <div>
          <Image
            SrcImage={UserAvatar}
            AltImage="Avatar de usuario"
            classNameImage="w-14 h-16 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
