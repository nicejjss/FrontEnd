import { FetchRepository } from "./FetchRepository.js";
import { CustomerDTO } from "../DTO/CustomerDTO.js";

export class LocalUserRepository extends FetchRepository {
    constructor() {
        super();
        this.localData = []; // Store all data locally
    }

    async getUsers(page) {
        try {
            // If we don't have local data yet, fetch it first
            if (this.localData.length === 0) {
                this.localData = await super.fetchUsers();
            }
            page = page ? page : this.PAGE;
            let limit = this.LIMIT;

            // Calculate pagination
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            
            // Get paginated data
            const paginatedData = this.localData.slice(startIndex, endIndex);

            return this.formatResult(
                paginatedData.map(item => CustomerDTO.convertLocalToDTO(item)),
                this.localData.length,
                page,
                limit
            );
        } catch (error) {
            console.error('Error in LocalUserRepository:', error);
            return {
                data: [],
                total: 0,
                totalPages: 0,
                page: page,
                limit: limit
            };
        }
    }
}

