import { FetchRepository } from "./FetchRepository.js";
import { CustomerDTO } from "../DTO/CustomerDTO.js";

export class RemoteUserRepository extends FetchRepository {
    constructor() {
        super();
    }

    async getUsers(page) {
        try {
            const data = await super.fetchUsers(page);
            let total = await super.fetchTotal();
            let limit = this.LIMIT;
            
            return this.formatResult(
                data.map(item => CustomerDTO.convertRemoteToDTO(item)),
                total,
                page,
                limit
            );
        } catch (error) {
            console.error('Error in RemoteUserRepository:', error);
            return [];
        }
    }
}

