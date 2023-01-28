export type MenuContent = MenuItemObject[][];

export type MenuItemObject = {
  name: string;
  shortcut?: string;
  disabled?: boolean;
  callback?: (data: any) => void;
  sub?: MenuContent;
};
