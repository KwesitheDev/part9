import type { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
        </p>
      );

    case "group":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );

    case "background":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
          <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );

    default:
      // Exhaustive type checking
      // eslint-disable-next-line no-case-declarations
      const _exhaustiveCheck: never = part;
      return _exhaustiveCheck;
  }
};

export default Part;
