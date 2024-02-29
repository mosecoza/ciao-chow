import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import { authPages } from "src/types/auth";

interface Props {
  page: authPages;
}

export const AuthHeaderContent = ({ page }: Props) => (
  <Fragment>
    <div className="navigation">
      <Link href="/">
        <Image
          className="mx-auto max-w-none w-[129px] relative top-10"
          src="/assets/chevron-left.svg"
          width={36}
          height={36}
          priority={false}
          alt="left arrow"
        />
      </Link>
    </div>
    <div className="flex px-5 relative z-20 justify-between w-full">
      <h2 className="font-medium self-end text-white text-[27px] mb-5">
        {`${page === "register" ? "Register" : "Login"}`}
      </h2>
      <Image
        className="mx-auto max-w-none relative top-10 character"
        src={`${
          page === "register"
            ? "/assets/character_woman.svg"
            : "/assets/character_man.svg"
        }`}
        width={130}
        height={130}
        priority={true}
        alt="character_woman"
      />
    </div>
  </Fragment>
);
