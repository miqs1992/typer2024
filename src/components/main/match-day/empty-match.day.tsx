import Image from "next/image";
import exclamationIcon from "./exclamation-diamond-fill-svgrepo-com.svg";

export const EmptyMatchDay = ({ previous }: { previous?: boolean }) => {
  return (
    <>
      <div>
        <h3 className="mb-10 text-center text-3xl font-bold text-white">
          {previous ? "Previous Match Day" : "Current Match Day"}
        </h3>
      </div>
      <div className="relative w-full overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600">
        <div className="flex w-full items-center justify-center rounded-lg bg-gray-800">
          <span className="my-8 flex gap-3 text-xl font-semibold text-white">
            <Image
              src={exclamationIcon}
              alt="exclamationIcon"
              width={20}
              height={20}
            />
            No matches available
          </span>
        </div>
      </div>
    </>
  );
};
