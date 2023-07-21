import React from 'react';

interface ConfirmDialogProps {
  description: string | JSX.Element;
}
function ConfirmDialog({ description }: ConfirmDialogProps) {
  return (
    <div className='flex align-items-center justify-content-center'>
      <i
        className='pi pi-exclamation-triangle mr-3'
        style={{ fontSize: '2rem' }}
      />
      <span>{description}</span>
    </div>
  );
}

export default ConfirmDialog;
