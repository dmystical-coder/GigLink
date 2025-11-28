import ReactMarkdown from 'react-markdown';

interface DescriptionRendererProps {
  content: string;
}

export function DescriptionRenderer({ content }: DescriptionRendererProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-a:text-blue-600 prose-code:text-blue-600 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
