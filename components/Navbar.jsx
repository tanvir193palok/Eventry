import Image from "next/image";
import Link from "next/link";
import AuthButton from "./auth/AuthButton";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <div className="text-md md:text-lg font-sans">
              <span className="text-3xl md:text-6xl font-bold md:font-extrabold font-serif text-cyan-400">
                E
              </span>
              _ventry
            </div>
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>
            <AuthButton />
          </li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
