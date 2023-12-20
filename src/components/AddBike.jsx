import React, { useState } from 'react'
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './AddBike.css'


function AddBike(props) {
    // id, firstName, lastName, photo
    const [bikeName, setBikeName] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [bikeYear, setBikeYear] = useState();

    const doWork = () => {
        const newBike = { 'id': nanoid(), bikeName: 'bikeName', 'bikeYear': parseInt(bikeYear), 'images': URL.createObjectURL(selectedFile) }
        props.addBike(newBike);
    }

    const imageUpdate = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div className='row mt-5' id='addBike'>
            <h3>Add Bike</h3>
            <div className='col-md-2'>
                <label htmlFor='txtBikeName' className='form-label'>Bike Name</label>
                <input type='text' id='textBikeName' placeholder='Bike Name' className='form-control' onChange={(evt) => setBikeName(evt.currentTarget.value)} value={bikeName} />
            </div>
            <div className='col-md-2'>
                <label htmlFor='txtBikeYear' className='form-label'>Bike year</label>
                <input type='text' id='txtBikeYear' placeholder='Bike Year' className='form-control' onChange={(evt) => setBikeYear(evt.currentTarget.value)} value={bikeYear} />
            </div>
            <div className='col-md-2'>
                <label htmlFor='fileUpload' className='form-label'>Bike Image</label>
                <input type='file' name='file' id='fileUpload' onChange={imageUpdate} />
            </div>
            <div className='col-md-2'>
                <button type='button' id='btnAdd' className='btn btn-success btn-lg' onClick={doWork}>Add Bike<FontAwesomeIcon icon={faPlusCircle} /></button>
            </div>

        </div>
    );
}

export default AddBike;