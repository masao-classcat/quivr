import Image from "next/image";
import Link from "next/link";

// masao : 09-oct-23 : localization

export const Logo = (): JSX.Element => {
  return (
    <Link
      data-testid="app-logo"
      href={"/chat"}
      className="flex items-center gap-4"
    >
      <Image
        className="rounded-full"
        src={"/logo.png"}
        alt="Quivr Logo"
        width={48}
        height={48}
      />
      <h1 className="font-bold">ClassCat Chatbot</h1>
    </Link>
  );
};
