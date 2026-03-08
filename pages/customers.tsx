import React, { useState } from "react";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { formatCurrency, formatUSD, formatDate } from "../lib/format";

interface Customer {
  id: string;
  name: string;
  email: string;
  tier: string;
  balance: number;
  createdAt: string;
}

export default function CustomersPage() {
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLookup() {
    if (!customerId.trim()) return;

    setLoading(true);
    setError("");
    setCustomer(null);

    try {
      const res = await fetch(`/api/customers/${customerId.trim()}`);
      if (!res.ok) {
        throw new Error(`Customer not found (HTTP ${res.status})`);
      }
      const data: Customer = await res.json();
      setCustomer(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch customer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="customers-page">
        <h1>Customer Lookup</h1>
        <p className="subtitle">Enter a customer ID to view details</p>

        <div className="lookup-form">
          <SearchBox
            value={customerId}
            onChange={setCustomerId}
            placeholder="e.g. C001"
          />
          <button
            onClick={handleLookup}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Looking up..." : "Lookup"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {customer && (
          <div className="customer-card">
            <h2>{customer.name}</h2>
            <table className="detail-table">
              <tbody>
                <tr>
                  <td className="label">ID</td>
                  <td>{customer.id}</td>
                </tr>
                <tr>
                  <td className="label">Email</td>
                  <td>{customer.email}</td>
                </tr>
                <tr>
                  <td className="label">Tier</td>
                  <td className="tier-badge">{customer.tier}</td>
                </tr>
                <tr>
                  <td className="label">Balance</td>
                  {/* BUG (Issue 7): Uses formatCurrency here... */}
                  <td>{formatCurrency(customer.balance)}</td>
                </tr>
                <tr>
                  <td className="label">Balance (alt)</td>
                  {/* ...and formatUSD here — two different formatters */}
                  <td>{formatUSD(customer.balance)}</td>
                </tr>
                <tr>
                  <td className="label">Customer Since</td>
                  <td>{formatDate(customer.createdAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
