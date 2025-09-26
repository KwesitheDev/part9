import Part from "./Part";
import { type CoursePart } from "../types";

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

export default Content;