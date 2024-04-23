export interface Task {
  id: number;
  projectId: number | null;
  name: string;
  description: string;
  completed: boolean;
}
