import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "../features/auth/authslice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, user } = useSelector((s) => s.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (token && !user) dispatch(fetchMe());
  }, [token, user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header
      style={{
        background: "#1e3a8a",
        color: "white",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo / Judul */}
      <Link
        href="/"
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.2rem",
          textDecoration: "none",
          letterSpacing: "0.3px",
        }}
      >
        Dicoding Forum
      </Link>

      {/* Navigation */}
      <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: router.pathname === "/" ? "600" : "400",
          }}
        >
          Home
        </Link>
        <Link
          href="/leaderboard/leaderboarPage"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: router.pathname.includes("leaderboard") ? "600" : "400",
          }}
        >
          Leaderboard
        </Link>

        {/* Auth Buttons */}
        {!isClient ? null : token ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.1)",
              padding: "6px 12px",
              borderRadius: "20px",
            }}
          >
            <img
              src={user?.avatar || "https://via.placeholder.com/32"}
              alt={user?.name}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ fontSize: "0.95rem" }}>{user?.name ?? "Me"}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/auth/login"
              style={{
                color: "#fff",
                background: "rgba(255,255,255,0.2)",
                padding: "6px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "500",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              style={{
                color: "#1e3a8a",
                background: "#fff",
                padding: "6px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "500",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
