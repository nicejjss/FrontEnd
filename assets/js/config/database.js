import { DATA_TYPE, PAGE_LIMIT, PAGE_NUMBER } from '../env.js';

export const databaseSource = DATA_TYPE ? DATA_TYPE : 'local';
export const pageLimit = PAGE_LIMIT;
export const pageNumber = PAGE_NUMBER;

export const config = {
    'local': {
        location: './assets/js/Data/customers.json',
    },

    'remote': {
        location: 'https://jsonplaceholder.typicode.com/users',
    }
}