import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import AddBike from './components/AddBike';
import _ from 'lodash';
import Bike from './components/Bike'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [allBikes, setAllBikes] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [bikeYear, setBikeYear] = useState('');

  useEffect(() => {

    if (localStorage) {

      const bikeLocalStorage = JSON.parse(localStorage.getItem('bikes'));

      if (bikeLocalStorage) {
        saveBike(bikeLocalStorage);
      }
      else {
        saveBike(bikes)
      }
    }

  }, []);

  const saveBike = (bikes) => {
    setAllBikes(bikes);
    setSearchResults(bikes);
    if (localStorage) {
      localStorage.setItem('bikes', JSON.stringify(bikes));
      console.log('saved to local storage');
    }
  };

  const addBike = (newBike) => {
    const updatedBike = [...allBikes, newBike];
    saveBike(updatedBike)
  };

  const searchBike = () => {
    let keywordsArray = [];

    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (bikeYear) {
      keywordsArray.push(bikeYear.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allBikes.filter(bike => {
        for (const word of keywordsArray) {
          if (bike.bikeName.toLowerCase().includes(word) ||
            bike.bikeYear === parseInt(word)) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allBikes);
    }
  }

  const removeBike = (bikeToDelete) => {
    console.table(bikeToDelete)
    const updatedBikesArray = allBikes.filter(bike => bike.id !== bikeToDelete.id);
    saveBike(updatedBikesArray);
  }

  const updateBike = (updatedBike) => {
    const updatedBikesArray = allBikes.map(bike => bike.id === updatedBike.id ? { ...bike, ...updatedBike } : bike)
    saveBike(updatedBikesArray);
  }



  const bikes = [{
    id: nanoid(),
    bikeName: "Honda Cbr 1000RR",
    images: 'images/honda_cbr1000rr.jpg',
    bikeYear: 2023

  }, {
    id: nanoid(),
    bikeName: "Honda Cbr 600rr",
    images: 'images/honda_cbr600rr.jpg',
    bikeYear: 2020
  }, {
    id: nanoid(),
    bikeName: "Honda cbr 300",
    images: 'images/honda_cbr300.jpg',
    bikeYear: 2021
  }, {
    id: nanoid(),
    bikeName: "Yamaha R1",
    images: 'images/yamahaR1.jpg',
    bikeYear: 2022
  }, {
    id: nanoid(),
    bikeName: "Yamaha R6",
    images: 'images/yamahaR6.jpg',
    bikeYear: 2020
  }, {
    id: nanoid(),
    bikeName: "Yamaha R3",
    images: 'images/yamahaR3.jpg',
    bikeYear: 2021
  }, {
    id: nanoid(),
    bikeName: "GSX1000",
    images: 'images/gsx1000.jpg',
    bikeYear: 2019
  }, {
    id: nanoid(),
    bikeName: "GSX 750",
    images: 'images/gsx750.jpg',
    bikeYear: 2022
  }, {
    bikeName: "GSX 650",
    images: 'images/gsx650.jpg',
    bikeYear: 2003
  }, 
  ];


  return (

    <div className='container'>
      <div className='row' id='allBikes'>
        <h3>Current bikes</h3>
        {searchResults && searchResults.map((bike) =>
        (<div className='col-lg-2' key={bike.id}>
          <Bike bike={bike} removeBike={removeBike} updateBike={updateBike} />
        </div>)
        )}

      </div>
      {/*!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveBike(students)}>Save Students</button>*/}
      <AddBike addBike={addBike} />
      <div className='row mt-4' id='searchBike'>
        <div className='col-md-4'>
          <h3>Search Bike</h3>
          <label htmlFor='txtKeyworkds'>Search by Name</label>
          <input type='text' className='form-control' placeholder='Bike Name' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
        </div>
        <div className='col-md-4'>
          <select value={bikeYear} onChange={evt => setBikeYear(evt.currentTarget.value)} className='form-select'>
            <option value=''>Select Year</option>
            {_(allBikes).map(bike => bike.bikeYear).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
          </select>
        </div>
        <div className='col-md-4'>
          <button type='button' className='btn btn-primary' onClick={searchBike}>Search bikes<FontAwesomeIcon icon={faSearch} /></button>
        </div>
      </div>
    </div>
  )
}

export default App