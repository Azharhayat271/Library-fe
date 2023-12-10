import Sidebar from "./index";

function RootLayout({ children }) {
  return (
    <div className="">
      <Sidebar />
      <main className="">{children}</main>
    </div>
  );
}

export default RootLayout;