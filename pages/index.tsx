import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="home-page">
        <h1>FinServ Portal</h1>
        <p className="subtitle">Internal financial services operations dashboard</p>

        <div className="card-grid">
          <Link href="/issues" className="card">
            <h2>Issues Inbox</h2>
            <p>View, search, and manage support issues</p>
          </Link>

          <Link href="/customers" className="card">
            <h2>Customer Lookup</h2>
            <p>Search for customer details by ID</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
