import CodeBlock from "@theme/CodeBlock";

function Code({ children, ...props }) {
  return (
    <CodeBlock language="jsx" {...props}>
      {children.trim()}
    </CodeBlock>
  );
}

export default Code;
