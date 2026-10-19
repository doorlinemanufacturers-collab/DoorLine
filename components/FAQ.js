export default function FAQ({ faqs, schema = true }) {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <>
      {faqs.map((f, i) => (
        <details key={i} className="faq">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
    </>
  );
}
