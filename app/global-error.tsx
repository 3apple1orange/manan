"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Georgia, serif", background: "#fafaf8", color: "#0f0f0f", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0, textAlign: "center", padding: 24 }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6b6b6b" }}>Something went wrong</p>
          <h1 style={{ fontSize: 40, fontWeight: 400, margin: "16px 0" }}>A brief moment of disorder.</h1>
          <button onClick={reset} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 999, border: "none", background: "#0f0f0f", color: "#fafaf8", cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}