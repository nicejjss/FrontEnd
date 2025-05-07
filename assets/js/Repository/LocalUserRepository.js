import { FetchRepository } from "./FetchRepository.js";
import { CustomerDTO } from "../DTO/CustomerDTO.js";

export class LocalUserRepository extends FetchRepository {
    constructor() {
        super();
        this.localData = []; // Store all data locally
    }

    async getUsers(page = FetchRepository.PAGE, limit = FetchRepository.LIMIT) {
        try {
            // If we don't have local data yet, fetch it first
            if (this.localData.length === 0) {
                this.localData = await super.fetchUsers();
            }

            // Calculate pagination
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            
            // Get paginated data
            const paginatedData = this.localData.slice(startIndex, endIndex);
            
            return {
                data: paginatedData.map(item => CustomerDTO.convertLocalToDTO(item)),
                total: this.localData.length,
                totalPages: await super.fetchTotalPages(),
                page: page,
                limit: limit
            };
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

