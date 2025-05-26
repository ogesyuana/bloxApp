import "../globals.css";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Layout } from "antd";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className='min-h-screen'>
      <Sidebar></Sidebar>
      <Layout>
        <Navbar></Navbar>
        {children}
      </Layout>
    </Layout>
  );
}
