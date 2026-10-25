export default function Badges({ items = [], center = false }) {
  const list = items.map((x) => String(x).trim()).filter(Boolean);
  if (!list.length) return null;
  return (
    <ul data-nosnippet className={`badges ${center ? 'center' : ''}`}>
      {list.map((b, i) => <li key={i} style={{ animationDelay: `${0.3 + i * 0.12}s` }}><span aria-hidden="true">✔</span> {b}</li>)}
    </ul>
  );
}
