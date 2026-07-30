import { parseCommentLinks } from "@/lib/commentLinks";

interface CommentTextProps {
  text: string;
}

export function CommentText({ text }: CommentTextProps) {
  return parseCommentLinks(text).map((part, index) =>
    part.type === "link" ? (
      <a
        key={index}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-[#5252e6] underline underline-offset-2 hover:text-[#4343cf]"
      >
        {part.value}
      </a>
    ) : (
      part.value
    ),
  );
}
