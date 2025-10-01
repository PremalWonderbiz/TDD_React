import apiClient from '@/services/apiClient';
import React, { useEffect } from 'react';

const Homes = () => {
  const [homeState, setHomeState] = React.useState<any[]>([]);


  useEffect(() => {
    const homesDataPromise = Promise.resolve([
      {
        title: "Test Home 1",
        image: "test.jpg",
        location: "Test Location 1",
        price: "1"
      },
      {
        title: "Test Home 2",
        image: "test.jpg",
        location: "Test Location 2",
        price: "2"
      },
      {
        title: "Test Home 3",
        image: "test.jpg",
        location: "Test Location 3",
        price: "3"
      },
      {
        title: "Test Home 4",
        image: "test.jpg",
        location: "Test Location 4",
        price: "4"
      },
      {
        title: "Test Home 5",
        image: "test.jpg",
        location: "Test Location 5",
        price: "5"
      },
      {
        title: "Test Home 6",
        image: "test.jpg",
        location: "Test Location 6",
        price: "6"
      },
    ]);

    // const homesDataPromise = apiClient.getHomes();
    homesDataPromise.then(data => setHomeState(data));

  }, []);

  return (
    <div className='container m-2'>
      <h1>Homes</h1>
      <div className='row'>
        {homeState.map((home, index) =>
          <div className="col-6 col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
            <div data-testid="home" className="card w-100">
              <img data-testid="home-image" src={home.image} alt="" className="card-img-top" />
              <div className="card-body">
                <div data-testid="home-title" className="card-title h5">{home.title}</div>
                <div data-testid="home-location">{home.location}</div>
                <div data-testid="home-price">${home.price}/night</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homes;