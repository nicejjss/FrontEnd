import { config, databaseSource } from "../config/database.js";
import { IRepository } from "./IRepository.js";

export class FetchRepository extends IRepository {
    static PAGE = 1;
    static LIMIT = 10;

    fetchUsers(page = FetchRepository.PAGE, limit = FetchRepository.LIMIT) {
        const url = config[databaseSource].location;
        const paginationParams = page && limit ? `?_page=${page}&_limit=${limit}` : '';
        return fetch(url + paginationParams)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error fetching users:', error));
    }

    fetchTotalPages() {
        const url = config[databaseSource].location;
        const total = fetch(url)
            .then(response => response.json())
            .then(total => total.length)
            .catch(error => console.error('Error fetching total pages:', error));

        return total / FetchRepository.LIMIT;
    }
}

