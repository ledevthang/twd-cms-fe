import React from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';

interface ProductDialogProps {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
}
function ProductDialog({
  name,
  description,
  price,
  quantity
}: ProductDialogProps) {
  return (
    <div className='p-fluid'>
      <div className='field'>
        <label htmlFor='name'>Name</label>
        <InputText
          id='name'
          value={name}
          //  onChange={e => onInputChange(e, 'name')}
          required
          autoFocus
          className={classNames({
            'p-invalid': !name
          })}
        />
        {!name && <small className='p-invalid'>Name is required.</small>}
      </div>
      <div className='field'>
        <label htmlFor='description'>Description</label>
        <InputTextarea
          id='description'
          value={description}
          //  onChange={e => onInputChange(e, 'description')}
          required
          rows={3}
          cols={20}
        />
      </div>
      <div className='field'>
        <label className='mb-3'>Category</label>
        <div className='formgrid grid'>
          <div className='field-radiobutton col-6'>
            <RadioButton
              inputId='category1'
              name='category'
              value='Accessories'
              //   onChange={onCategoryChange}
              //   checked={category === 'Accessories'}
            />
            <label htmlFor='category1'>Accessories</label>
          </div>
          <div className='field-radiobutton col-6'>
            <RadioButton
              inputId='category2'
              name='category'
              value='Clothing'
              //   onChange={onCategoryChange}
              //   checked={product.category === 'Clothing'}
            />
            <label htmlFor='category2'>Clothing</label>
          </div>
          <div className='field-radiobutton col-6'>
            <RadioButton
              inputId='category3'
              name='category'
              value='Electronics'
              //   onChange={onCategoryChange}
              //   checked={product.category === 'Electronics'}
            />
            <label htmlFor='category3'>Electronics</label>
          </div>
          <div className='field-radiobutton col-6'>
            <RadioButton
              inputId='category4'
              name='category'
              value='Fitness'
              //   onChange={onCategoryChange}
              //   checked={product.category === 'Fitness'}
            />
            <label htmlFor='category4'>Fitness</label>
          </div>
        </div>
      </div>
      <div className='formgrid grid'>
        <div className='field col'>
          <label htmlFor='price'>Price</label>
          <InputNumber
            id='price'
            value={price}
            // onValueChange={e => onInputNumberChange(e, 'price')}
            mode='currency'
            currency='USD'
            locale='en-US'
          />
        </div>
        <div className='field col'>
          <label htmlFor='quantity'>Quantity</label>
          <InputNumber
            id='quantity'
            value={quantity}
            // onValueChange={e => onInputNumberChange(e, 'quantity')}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDialog;
