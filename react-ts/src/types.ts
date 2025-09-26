// base
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

// Base + description
export interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

// Basic part
export interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

// Group project part
export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

// Special part 
export interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

// Union of all parts
export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
