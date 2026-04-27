import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const [loginError, setLoginError] = useState("");

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    notes: "",
  });

  const adminEmail = "yara@gmail.com";
  const adminPassword = "123456";

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginForm.email === adminEmail &&
      loginForm.password === adminPassword
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); 
      setLoginError("");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/api/leads");
      setLeads(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch leads.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5001/api/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/leads/${id}`);
      fetchLeads();
    } catch (err) {
      setError("Failed to delete lead.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/leads", {
        ...form,
        source: "Website Form",
      });

      setForm({ name: "", email: "", notes: "" });
      fetchLeads();
    } catch (err) {
      setError("Failed to add lead.");
    }
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;
  const conversionRate =
    totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;

  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <h1 style={{ marginBottom: "10px", color: "#1e3a8a" }}>
            Admin Login
          </h1>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Login to access the Mini CRM Dashboard.
          </p>

          {loginError && (
            <p
              style={{
                color: "red",
                backgroundColor: "#ffe5e5",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              {loginError}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "8px", color: "#1e3a8a" }}>
              Mini CRM Dashboard
            </h1>
            <p style={{ color: "#555" }}>
              Manage incoming leads, track status, and organize follow-up notes.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              backgroundColor: "#ffe5e5",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Total Leads</h3>
            <p style={cardValueStyle}>{totalLeads}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>New Leads</h3>
            <p style={cardValueStyle}>{newLeads}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Converted</h3>
            <p style={cardValueStyle}>{convertedLeads}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Conversion Rate</h3>
            <p style={cardValueStyle}>{conversionRate}%</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            style={inputStyle}
          />
          <button style={buttonStyle}>Add Lead</button>
        </form>

        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#e0e7ff" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Source</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Notes</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{lead.name}</td>
                  <td style={tdStyle}>{lead.email}</td>
                  <td style={tdStyle}>{lead.source}</td>

                  <td style={tdStyle}>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead._id, e.target.value)
                      }
                      style={selectStyle}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>

                  <td style={tdStyle}>{lead.notes}</td>

                  <td style={tdStyle}>
                    <button
                      type="button"
                      onClick={() => deleteLead(lead._id)}
                      style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: "bold",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const thStyle = {
  padding: "14px",
  textAlign: "left",
};

const tdStyle = {
  padding: "14px",
};

const cardStyle = {
  backgroundColor: "#eff6ff",
  borderRadius: "12px",
  padding: "18px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const cardTitleStyle = {
  margin: "0 0 8px 0",
  fontSize: "16px",
  color: "#1e3a8a",
};

const cardValueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "bold",
  color: "#111827",
};

export default App;