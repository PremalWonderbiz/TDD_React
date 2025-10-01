import React from 'react';
import Homes from '../components/Homes';
import { getNodeText, render, screen } from '@testing-library/react';
import apiClient from '@/services/apiClient';


describe('home tests', () => {
    beforeEach(() => {
        jest.spyOn(apiClient, "getHomes").mockImplementation(() => {
            return Promise.resolve([
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
            ]);
        });
    });
    it('should show homes', async () => {
        render(<Homes />);
        // findAllByTestId automatically waits for async updates + wraps act()
        const homes = await screen.findAllByTestId("home");
        expect(homes.length).toBeGreaterThan(0);
    });

    it('should show home title', async() => {
        render(<Homes />);
        const homeTitles = await screen.findAllByTestId('home-title');
        expect(getNodeText(homeTitles[0])).toBe('Test Home 1');
    });

    it('should show home image', async() => {
        render(<Homes />);
        const homeImages = await screen.findAllByTestId('home-image');
        expect(homeImages[0]).toBeTruthy();

    });

    it('should show home location', async() => {
        render(<Homes />);
        const homeLocations = await screen.findAllByTestId('home-location');
        expect(getNodeText(homeLocations[0])).toBe('Test Location 1');
    });

    it('should show home price', async() => {
        render(<Homes />);
        const homePrices = await screen.findAllByTestId('home-price');
        expect(getNodeText(homePrices[0])).toBe('1');
    });
});
