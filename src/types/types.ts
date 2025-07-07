export type taskProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: string;
};

export type ProjectProps = {
  projectTitle: string;
  tasks: taskProps[];
  borderColors: string;
};
