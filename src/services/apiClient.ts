
const apiClient = {
    getHomes : () => {
        return Promise.resolve([]);
    },

    bookHome : (home : any, checkedInDate : any, checkedOutDate : any) => {
        return Promise.resolve("Home booked");
    }
};

export default apiClient;