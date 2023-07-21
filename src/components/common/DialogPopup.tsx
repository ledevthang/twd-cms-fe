import { useAppDispatch } from '@/hooks/redux.hook';
import { updateDialogState } from '@/store/slices/dialogSlice';
import { DialogState } from '@/types/dialog';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { PropsWithChildren, useCallback, useMemo } from 'react';

function DialogPopup({
  children,
  open,
  header,
  minWidth,
  footerLabelLeft,
  footerLabelRight
}: PropsWithChildren<DialogState>) {
  const dispatch = useAppDispatch();

  const onHide = useCallback(() => {
    dispatch(updateDialogState({ open: false }));
  }, [dispatch]);

  const dialogFooter = useMemo(
    () => (
      <>
        <Button
          label={footerLabelLeft}
          icon='pi pi-times'
          text
          onClick={onHide}
        />
        <Button label={footerLabelRight} icon='pi pi-check' text />
      </>
    ),
    [footerLabelLeft, footerLabelRight, onHide]
  );

  return (
    <Dialog
      visible={open}
      style={{ width: minWidth }}
      header={header}
      modal
      footer={dialogFooter}
      onHide={onHide}
    >
      {children}
    </Dialog>
  );
}

export default DialogPopup;
