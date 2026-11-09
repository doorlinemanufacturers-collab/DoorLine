// Answer-first box for AEO / GEO: a short, factual, self-contained answer directly under the H1.
export default function QuickAnswer({ children }) {
  return (
    <div className="qa" role="note">
      <p><strong>Quick answer:</strong> {children}</p>
    </div>
  );
}
