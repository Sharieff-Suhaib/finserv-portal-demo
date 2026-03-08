import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link href="/">FinServ Portal</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/issues">Issues</Link>
          </li>
          <li>
            <Link href="/customers">Customers</Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}
