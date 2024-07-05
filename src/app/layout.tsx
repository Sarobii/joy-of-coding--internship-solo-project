import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import SessionStatus from "../components/SessionStatus";
import ThemeToggle from "../components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-base-200`}>
        <SessionProviderWrapper>
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar bg-base-300">
                <div className="flex-none lg:hidden">
                  <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </label>
                </div> 
                <div className="flex-1 px-2 mx-2">Task Manager</div>
                <div className="flex-none hidden lg:block">
                  <ul className="menu menu-horizontal">
                    <li><SessionStatus /></li>
                    <li><ThemeToggle /></li>
                  </ul>
                </div>
              </div>
              {/* Page content here */}
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div> 
            <div className="drawer-side">
              <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
              <ul className="menu p-4 w-80 h-full bg-base-200">
                <li><SessionStatus /></li>
                <li><ThemeToggle /></li>
              </ul>
            </div>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}