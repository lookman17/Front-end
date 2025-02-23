import { Sidebar } from "../components_admin/Sidebar";

export const Layout = ({ children }) => {
  try {
    return (
      <div className="flex">
        <Sidebar />
        <main className="w-full">{children}</main>
        <footer></footer>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};
