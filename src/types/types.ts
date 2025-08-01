import type { LucideIcon } from "lucide-react";

export type taskProps = {
  id?: string;
  title: string;
  assignee: string;
  date: string;
  priority: string;
  boardId: string;
  label: string[];
};

export type ProjectProps = {
  projectTitle: string;
  borderColors: string;
  boardId: string;
};

export type featureProps = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type cardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconColor: string;
};

export type tabProps = {
  tabName: string;
  selectedType: string;
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type projectCardProps = {
  title: string;
  description: string;
  status: string;
  taskCompleted: number;
  targetTask: number;
  id: number;
};

export type generalProjectProps = {
  title: string;
  description: string;
  status: string;
  taskCompleted: number;
  targetTask: number;
};
