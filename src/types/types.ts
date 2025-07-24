import type { LucideIcon } from "lucide-react";

export type taskProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: string;
  boardId: string,
};

export type ProjectProps = {
  projectTitle: string;
  borderColors: string;
  boardId: string
};


export type featureProps = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type dashboardCardProps = {
  title: string;
  value: number;
  progress: string;
  icon: LucideIcon;
  iconColor: string;
};