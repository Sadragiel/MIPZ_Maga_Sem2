import './CountryFormItem.scss';

export function CountryFormItem({ 
  id,
  onRemove,
  onUpdate,
}) {
  return (
    <div className='country-form-item'> 
      <label className='country-form-item__name'>
        <span className='country-form-item__label'>Country Name</span>
        <input 
          className='country-form-item__input'
          name={`name_${id}`}
          onChange={(event) => onUpdate('name', event.target.value)}
          required
        />
      </label>
      <label className='country-form-item__xl'>
        <span className='country-form-item__label'>Xl</span>
        <input 
          className='country-form-item__input'
          name={`xl_${id}`}
          type='number'
          onChange={(event) => onUpdate('xl', event.target.value)}
          required
        />
      </label>
      <label className='country-form-item__yl'>
        <span className='country-form-item__label'>Yl</span>
        <input 
          className='country-form-item__input'
          name={`yl_${id}`}
          type='number'
          onChange={(event) => onUpdate('yl', event.target.value)}
          required
        />
      </label>
      <label className='country-form-item__xh'>
        <span className='country-form-item__label'>Xh</span>
        <input 
          className='country-form-item__input'
          name={`xh_${id}`}
          type='number'
          onChange={(event) => onUpdate('xh', event.target.value)}
          required
        />
      </label>
      <label className='country-form-item__yh'>
        <span className='country-form-item__label'>Yh</span>
        <input 
          className='country-form-item__input'
          name={`yh_${id}`}
          type='number'
          onChange={(event) => onUpdate('yh', event.target.value)}
          required
        />
      </label>
      {
        !!onRemove 
        ? <button type='button' className='country-form-item__remove' onClick={onRemove} />
        : null
      }
    </div>
  );
}
