import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagicWandSparkles, faWarning } from '@fortawesome/free-solid-svg-icons'
import './Bike.css'

function bike(props) {
  const [bikeName, setBikeName] = useState('');
  const [bikeYear, setBikeYear] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setBikeName(props.bike.bikeName);
    setBikeYear(props.bike.bikeYear);

  }, []);

  const saveBike = () => {
    setEditMode(false);
    const updatedBike = {
      bikeName: bikeName, bikeYear: bikeYear, id: props.bike.id, images: props.bike.images
    }
    props.updateBike(updatedBike);
  }


  return (
    <div className='card'>
      <img src={props.bike.images} alt='Our Bikes' className='card-img-top mx-auto' />
      {!editMode && <ul className='list-group list-group-flush'>
        <li className='list-group-item text-center'>{props.bike.bikeName}</li>
        <li className='list-group-item text-center'>{props.bike.bikeYear}</li>
        <button type="button" className="btn btn-danger" onClick={() => props.removeBike(props.bike)}> Delete Bike <FontAwesomeIcon icon={faWarning} /></button>
        <button type='button' className='btn btn-warning' onClick={() => setEditMode(true)}>Edit<FontAwesomeIcon icon={faMagicWandSparkles} /></button>
      </ul>
      }
      {editMode &&
        <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={bikeName} onChange={(evt) => setBikeName(evt.currentTarget.value)} /></li>
          <li className='list-group-item text-center'><input type='text' className='form-control' value={bikeYear} onChange={(evt) => setBikeYear(evt.currentTarget.value)} /></li>
          <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveBike}>Save</button></li>

        </ul>}
    </div>
  )

}
export default bike