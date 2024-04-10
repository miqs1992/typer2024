import Image from "next/image";

interface FlagIconProps {
  country: string;
}

const FlagIcon = ({ country }: FlagIconProps) => {
  return (
    <Image
      alt={country}
      src={`https://flagicons.lipis.dev/flags/4x3/${country}.svg`}
      height="10"
      width="15"
    />
  );
};

export default FlagIcon;
