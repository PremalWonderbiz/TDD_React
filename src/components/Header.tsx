import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div>
      <nav className="py-2 border-bottom navbar navbar-expand navbar-light">
        <div className="container-fluid">
          <Link data-testid="logo" href="/#" className="navbar-brand">
            <img src="logo192.png" width="40" alt="" />
          </Link>
          <form data-testid="search" className="mr-auto w-50 form-inline">
            <input placeholder="Search homes" type="text" className="w-50 form-control" />
          </form>
          <div data-testid="menu" className="ml-auto text-uppercase navbar-nav">
            <a href="#home" className="nav-link">Become a host</a>
            <a href="#link" className="nav-link">Help</a>
            <a href="#link" className="nav-link">Sign up</a>
            <a href="#link" className="nav-link">Login</a>
          </div>
        </div>
      </nav>

      <div className='m-0 px-4 py-2 container-fluid mw-100 border-bottom container d-flex gap-2'>
        <button data-testid="home-type" className='text-nowrap mr-4 py-1 btn btn-outline-secondary'>
          Home type
        </button>
        <button data-testid="dates" className='text-nowrap mr-4 py-1 btn btn-outline-secondary'>
          Dates
        </button>
        <button data-testid="guests" className='text-nowrap mr-4 py-1 btn btn-outline-secondary'>
          Guests
        </button>
        <button data-testid="price" className='text-nowrap mr-4 py-1 btn btn-outline-secondary'>
          Price
        </button>
        <button data-testid="rooms" className='text-nowrap mr-4 py-1 btn btn-outline-secondary'>
          Rooms
        </button>
        <button data-testid="amenities" className='text-nowrap mr-4 py-1 btn btn-outline-secondary'>
          Amenities
        </button>
      </div>
    </div>
  );
};

export default Header;