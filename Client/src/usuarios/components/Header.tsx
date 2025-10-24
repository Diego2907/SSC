import Navbar from "./Navbar"; // Removed unused import
import Button from "./Button";
import Image from "./Image"; // Removed unused import
import logo from "../assets/icons/logo.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-20 bg-white h-[93px] shadow-lg">
      <Image
        SrcImage={logo}
        AltImage="Logo"
        classNameImage="w-[102.47px] h-[52.87px]"
      ></Image>
      <Navbar
        Links={[
          "Conócenos",
          "Servicios",
          "Nuestras marcas",
          "Preguntas frecuentes",
        ]}
        NavClassName="flex gap-6"
        LinkClassName="font-[Sora] font-bold text-[20px] text-[#1D4389]"
      />
      <Button
        ClassNameButton="text-[#1D4488] text-[15px] font-semibold bg-[#FFE907] w-[260px] h-[51px] border-black rounded-[10px] shadow-lg cursor-pointer transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#F5E00A] hover:text-[#14356E] hover:font-bold"
        textButton="Iniciar sesión | Registrarse"
      ></Button>
    </header>
  );
};

export default Header;
