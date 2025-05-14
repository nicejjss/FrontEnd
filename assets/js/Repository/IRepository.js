// IRepository.js as Interface Repository
import { pageNumber, pageLimit } from "../config/database.js";

export class IRepository {
    async getUsers(page = pageNumber, limit = pageLimit) {
        throw new Error('Method not implemented');
    }
} 