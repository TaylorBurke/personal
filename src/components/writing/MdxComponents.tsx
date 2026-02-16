import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl sm:text-4xl font-heading font-bold mt-12 mb-6"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl sm:text-3xl font-heading font-bold mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl sm:text-2xl font-heading font-semibold mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-fog leading-relaxed mb-6" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside text-fog mb-6 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside text-fog mb-6 space-y-2"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="text-violet hover:text-violet-hover underline underline-offset-4 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-violet pl-6 italic text-fog my-6"
      {...props}
    />
  ),
  code: (props) => {
    const isInline = typeof props.children === "string";
    if (isInline) {
      return (
        <code
          className="bg-smoke px-1.5 py-0.5 rounded text-sm text-coral font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props) => (
    <pre
      className="rounded-xl overflow-x-auto mb-6 text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="border-ash my-12" />,
  strong: (props) => (
    <strong className="text-snow font-semibold" {...props} />
  ),
};
