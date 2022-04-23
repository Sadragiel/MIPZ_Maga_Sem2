import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { DataContext } from '../../contexts';
import './CountryGraph.scss';

export function CountryGraph() {
  const { countryMap } = useContext(DataContext);

  const countriesLegend = useMemo(() => {
    const countriesLegend = new Map();

    countryMap.forEach(row => row.forEach(item => 
      item && countriesLegend.set(item.name, item.color),
    ));

    return Array.from(countriesLegend).map(([name, color]) => ({ name, color }))
  }, [countryMap])

  if (!countryMap.length) {
    return null;
  }

  return (
    <div className='country-graph'> 
      <div className='country-graph__matrix'> 
        {
          countryMap.map((row, rowIndex) => (
            <div className='country-graph__row'>
              {
                row.map((item, itemIndex) => (
                  <div 
                    className={classNames('country-graph__item', {
                      'country-graph__item--hidden': !item,
                      'country-graph__item--with-right-neighbor': row[itemIndex + 1],
                      'country-graph__item--with-bottom-neighbor': countryMap[rowIndex - 1] && countryMap[rowIndex - 1][itemIndex],
                    })}
                    style={(item) ? { backgroundColor: item.color } : {}}
                  ></div>
                ))
              }
            </div>
          ))
        }
      </div>

      <div className='country-graph__legend'>
        {
          countriesLegend.map(item => (
            <div className='country-graph__legend-item'>
              <div 
                className='country-graph__item'
                style={(item) ? { backgroundColor: item.color } : {}}
              ></div>

              <div className='country-graph__label'>{ item.name }</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
