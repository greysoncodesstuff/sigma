export interface WindowState {
  id: string;
  title: string;
  app: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  icon: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  defaultWidth: number;
  defaultHeight: number;
}
