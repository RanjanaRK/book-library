import Nav from "./Nav";

type ChildType = {
  children: React.ReactNode;
};

const Layout = ({ children }: ChildType) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
