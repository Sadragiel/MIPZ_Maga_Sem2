import { useCallback, useContext, useEffect, useState } from 'react';
import { getValidationErrors, createEmptyInputItem } from '../../services';
import { CountryFormItem } from '..';
import './CountryForm.scss';
import { DataContext } from '../../contexts';

export function CountryForm() {
    const [inputs, setInputs] = useState([createEmptyInputItem(), createEmptyInputItem()]);
    const [errorList, setErrorList] = useState([]);
    const { applyUserInput } = useContext(DataContext);

    useEffect(() => {
      setErrorList(getValidationErrors(inputs));
    }, [inputs])
  
    const getRemoveInputHandler = useCallback((inputId) => {
        return () => setInputs(inputs => inputs.filter(({ id }) => id !== inputId));
    }, []);

    const getUpdateInputHandler = useCallback((inputId) => {
        return (key, value) => setInputs(inputs => {
            const item = inputs.find(({id}) => id === inputId);
            if(item) {
                item[key] = value;
            }
            return [...inputs];
        });
    }, []);

    const addInputItem = useCallback(() => {
        setInputs(inputs => [...inputs, createEmptyInputItem()])
    }, []);

    const onSubmit = useCallback((event) => {
      event.preventDefault();

      if(errorList.length) {
        return;
      }

      applyUserInput(inputs);
    }, [inputs, errorList])

    return (
    <form 
      className="country-form"
      onSubmit={onSubmit}
    >
        {
            inputs.map(({ id }, index) => 
                <CountryFormItem 
                    id={id} 
                    onRemove={index > 1 ? getRemoveInputHandler(id) : null}
                    onUpdate={getUpdateInputHandler(id)} 
                />
            )
        }
        <ul className='country-form__error-list'>
          {
            errorList.map(errorMessage => 
              <li className='country-form__error-item'>
                { errorMessage }
              </li>
            )
          }
        </ul>

        <div className='country-form__footer'>
          <button 
            type='button'
            className='country-form__add'
            onClick={addInputItem}
          >Add One More Country</button>
          <button
            type='submit'
            disabled={errorList.length}
            className='country-form__submit'
          >Run Calculation</button>
        </div>
    </form>
  );
}
