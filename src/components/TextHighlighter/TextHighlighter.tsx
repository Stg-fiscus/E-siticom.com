interface ITextHighlighterProps {
  text: string;
  search: string;
}

export const TextHighlighter = ({ text, search }: ITextHighlighterProps) => {
  if (!search) {
    return <>{text}</>;
  }

  const parts: string[] = text.split(new RegExp(`(${search})`, "gi"));

  return (
    <>
      {parts.map((part: string, index: number) => (
        <span
          key={index}
          style={
            part.toLowerCase() === search.toLowerCase()
              ? { backgroundColor: "#ffc069" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};
