import { Sidebar } from "../components/Sidebar";

export const LayoutSantri = ({ children }) => {
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
