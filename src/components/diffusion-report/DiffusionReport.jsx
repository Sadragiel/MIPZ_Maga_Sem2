import { useContext } from 'react';
import { DataContext } from '../../contexts';
import './DiffusionReport.scss';

export function DiffusionReport() {
  const { diffusionReport } = useContext(DataContext);

  if (!diffusionReport) return null;

  return (
    <div className='diffusion-report'> 
      <div className='diffusion-report__table'>
        <div className='diffusion-report__row'>
          <div className='diffusion-report__cell'>Counry Name</div>
          <div className='diffusion-report__cell'>Days Taken To Obtain all currancies</div>
        </div>
        {
          Object.keys(diffusionReport).map((countryName) => (
            <div className='diffusion-report__row'>
              <div className='diffusion-report__cell'>{countryName}</div>
              <div className='diffusion-report__cell'>{diffusionReport[countryName]} days</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
