import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

const Nav = () => {
  return (
    <>
      <Navbar isBordered maxWidth="2xl">
        <NavbarBrand>
          <Link href={"/"} className="font-bold text-inherit text-2xl">
            Book Library
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="underline hover:font-bold">
            <Link href="/">Library</Link>
          </NavbarItem>
          <NavbarItem className="underline hover:font-bold">
            <Link href="/book">Add Book</Link>
          </NavbarItem>
          <NavbarItem className="underline hover:font-bold">
            <Link href="/author">Add Author</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Nav;
