import { FetchRepository } from "./FetchRepository.js";
import { CustomerDTO } from "../DTO/CustomerDTO.js";

export class RemoteUserRepository extends FetchRepository {
    constructor() {
        super();
    }

    async getUsers(page = FetchRepository.PAGE, limit = FetchRepository.LIMIT) {
        try {
            const data = await super.fetchUsers(page, limit);
            //return like local
            return {
                data: data.map(item => CustomerDTO.convertRemoteToDTO(item)),
                total: data.length,
                totalPages: await super.fetchTotalPages(),
                page: page,
                limit: limit
            };
        } catch (error) {
            console.error('Error in RemoteUserRepository:', error);
            return [];
        }
    }
}

