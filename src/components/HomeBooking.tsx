import apiClient from '@/services/apiClient';
import bookingDialogService from '@/services/bookingDialogService';
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import moment from 'moment';
import notificationService from '@/services/notificationService';

const HomeBooking = (props: any) => {
    const [checkInState, setCheckInState] = useState<string>();
    const [checkOutState, setCheckOutState] = useState<string>();
    const [totalPrice, setTotalPrice] = useState<any>();

    useEffect(() => {
        const price = props.home ? props.home.price : 0;
        const checkInDate = moment(checkInState, 'YYYY-MM-DD');
        const checkOutDate = moment(checkOutState, 'YYYY-MM-DD');
        const nights = checkOutDate.diff(checkInDate, 'days');
        const total = nights * price;

        if (Number.isInteger(total))
            setTotalPrice(total)
        else
            setTotalPrice('--')
    }, [checkInState, checkOutState, props]);

    const handleBooking = () => {
        apiClient.bookHome(props.home, checkInState, checkOutState).then(res => {
            bookingDialogService.close();
            notificationService.open(res)
        });

    }

    if (!props.home)
        return <div data-testid="empty"></div>

    return (
        <>
            <h2 data-testid="title">{props.home.title}</h2>
            <div data-testid="price" className='mb-3'>
                <span className='font-weight-bold text-primary text-large'>
                    ${props.home.price}
                </span>/night
            </div>
            <form className='form-group mb-2'>
                <label htmlFor="checkInDate">Choose your check-in date</label>
                <input
                    data-testid="check-in"
                    type='date'
                    className='form-control'
                    id='checkInDate'
                    onChange={e => setCheckInState(e.target.value)} />

            </form>
            <form className='form-group'>
                <label htmlFor="checkOutDate">Choose your check-out date</label>
                <input
                    data-testid="check-out"
                    type='date'
                    className='form-control'
                    id='checkOutDate'
                    onChange={e => setCheckOutState(e.target.value)} />

            </form>
            <div data-testid="total" className='my-3 text-right'>
                <span className='font-weight-bold text-large'>
                    Total : ${totalPrice}
                </span> 
            </div>
            <div className='d-flex justify-content-end'>
            <button
                data-testid="book-btn"
                type='button'
                className='btn btn-primary'
                onClick={() => handleBooking()}>Book</button>
            </div>
        </>
    );
};

export default HomeBooking;