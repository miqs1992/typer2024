import Image from "next/image";

interface FlagIconProps {
  country: string;
}

const FlagIcon = ({ country }:FlagIconProps) => {
  return (
    <Image
      alt={country}
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.toUpperCase()}.svg`}
      height="10"
      width="15"
    />
  );
}

export default FlagIcon;
