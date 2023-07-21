export interface DialogState {
  open: boolean;
  component?: JSX.Element;
  header?: string;
  footerLabelLeft?: string;
  footerLabelRight?: string;
  onClick?: () => void;
  minWidth?: string;
}

export enum DialogActionType {
  Update = 'Update'
}

export interface DialogUpdateAction {
  type: DialogActionType;
  payload: DialogState;
}

export type DialogAction = DialogUpdateAction;
