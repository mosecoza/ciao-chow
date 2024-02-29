import Link from "next/link";
import Image from "next/image";
import PublicHeader from "./components/PublicHeader";
import AppLayout from "./components/AppLayout";

export default function Home() {
  return (
    <AppLayout UIClass="bg-primary">
      <PublicHeader>
        <div className="flex justify-center ">
          <Image
            className="logo"
            src="/assets/logo.png"
            width={200}
            height={64}
            alt="logo"
          />
        </div>
        <div className="images">
          <Image
            className="character"
            width={200}
            height={10}
            src="/assets/character_woman.svg"
            alt="character_woman"
            />
          <Image
            className="character"
            width={200}
            height={10}
            src="/assets/character_man.svg"
            alt="character_man"
          />
        </div>
      </PublicHeader>
      <section className="px-5">
        <p className="text-white text-center px-14">
          Hungry? <strong className="font-bold">CiaoChow</strong> helps you find
          something to eat.
        </p>
        <Link
          href={"/auth"}
          className="bg-white text-primary text-center block font-semibold text-lg w-full rounded-[10px] mt-12 p-3"
        >
          Get Started
        </Link>
      <div className="flex gap-1 justify-center py-12">
        <div className="bg-neutral-300 rounded-full w-2 h-2"></div>
        <div className="bg-neutral-300 rounded-full w-2 h-2"></div>
        <div className="bg-white rounded-full w-2 h-2"></div>
      </div>
      </section>
    </AppLayout>
  );
}
