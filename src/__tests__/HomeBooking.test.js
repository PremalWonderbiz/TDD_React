import React, { act } from 'react';
import HomeBooking from '../components/HomeBooking';
import bookingDialogService from '@/services/bookingDialogService';
import notificationService from '@/services/notificationService';
import apiClient from '@/services/apiClient';
import { fireEvent, getByTestId, render } from '@testing-library/react';

let container = null;

const mockHome = {
    title: "Test Home 1",
    image: "test.jpg",
    location: "Test Location 1",
    price: "1"
}

describe('homebooking tests', () => {
    beforeEach(() => {
        container = render(<HomeBooking home={mockHome} />).container;
    });

    it('should show title', async () => {
        var title = getByTestId(container, 'title');

        expect(title.textContent).toBe('Test Home 1');
    });

    it('should show price', async () => {
        var price = getByTestId(container, 'price');

        expect(price.textContent).toBe('$1/night');
    });

    it('should show check-in date field', async () => {
        var checkInDate = getByTestId(container, 'check-in');

        expect(checkInDate).toBeTruthy();
    });

    it('should show check-out date field', async () => {
        var checkOutDate = getByTestId(container, 'check-out');

        expect(checkOutDate).toBeTruthy();
    });

    it('should show empty when no home is provided', async () => {
        container = render(<HomeBooking home={null} />).container;
        var empty = getByTestId(container, 'empty');

        expect(empty).toBeTruthy();
    });


    it('should calculate total', async () => {
        //enter chek-in date : 2025-10-01
        fireEvent.change(
            getByTestId(container, 'check-in'),
            { target: { value: '2025-10-01' } }
        )

        //enter chek-out date : 2025-10-04
        fireEvent.change(
            getByTestId(container, 'check-out'),
            { target: { value: '2025-10-04' } }
        )

        //assert that total: 3*1 = 3
        expect(getByTestId(container, 'total').textContent).toBe('Total : $3');
    });

    it('should book home after Book button click', async () => {
        //spy on apiClient
        jest.spyOn(apiClient, "bookHome").mockImplementation(() => {
            return Promise.resolve("Home booked");
        });

        //select dates
        fireEvent.change(
            getByTestId(container, 'check-in'),
            { target: { value: '2025-10-01' } }
        )

        fireEvent.change(
            getByTestId(container, 'check-out'),
            { target: { value: '2025-10-04' } }
        )

        //click Book button
        getByTestId(container,'book-btn').click();

        //assert that apiClient booked the home
        expect(apiClient.bookHome).toHaveBeenCalledWith(mockHome, '2025-10-01', '2025-10-04');

    });

    it('should close the dialog and show notifications after booking home', async () => {
        //spy on apiClient
        jest.spyOn(apiClient, "bookHome").mockImplementation(() => {
            return Promise.resolve("Mock Home booked");
        });

        //spy on bookingDialog service
        jest.spyOn(bookingDialogService, "close").mockImplementation(() => { });

        //spy on notification service
        jest.spyOn(notificationService, "open").mockImplementation(() => { });

        //select dates
        fireEvent.change(
            getByTestId(container, 'check-in'),
            { target: { value: '2025-10-01' } }
        )

        fireEvent.change(
            getByTestId(container, 'check-out'),
            { target: { value: '2025-10-04' } }
        )

        //click Book button
        getByTestId(container,'book-btn').click();

        await act(async () => {});
        //assert that bookingDialog service closes the dialog
        expect(bookingDialogService.close).toHaveBeenCalled();

        //assert that notification service posted a notification
        expect(notificationService.open).toHaveBeenCalledWith("Mock Home booked");
    });
});



