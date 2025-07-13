export type SidebarAction = string | (() => void);
export type SidebarItem = {
  title: string;
  action: SidebarAction;
};
