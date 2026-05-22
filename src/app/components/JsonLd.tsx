// JsonLd renders structured data (schema.org JSON-LD) as an inline script tag.
//
// The tag is rendered inside the React tree (inside <div id="root">) rather than
// via react-helmet-async. This is intentional: the prerender pipeline only captures
// helmet.title / .meta / .link into <head>; helmet.script is not forwarded.
// Google explicitly supports JSON-LD placement anywhere in the page — <head> or
// <body> — so rendering here is spec-compliant and fully recognised by Googlebot.
//
// dangerouslySetInnerHTML is required to emit a raw JSON string inside a <script>
// tag without React escaping the content. The schema objects are constructed from
// trusted application data (never from user input), so XSS risk is nil.

interface JsonLdProps {
  schemas: object[];
}

export function JsonLd({ schemas }: JsonLdProps) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
