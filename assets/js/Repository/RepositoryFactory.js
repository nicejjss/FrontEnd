import { LocalUserRepository } from './LocalUserRepository.js';
import { RemoteUserRepository } from './RemoteUserRepository.js';
import { config, databaseSource } from '../config/database.js';

export class RepositoryFactory {
    static instance = null;
    static repository = null;

    static getInstance() {
        if (!RepositoryFactory.instance) {
            RepositoryFactory.instance = new RepositoryFactory();
        }
        return RepositoryFactory.instance;
    }

    getRepository() {
        if (!RepositoryFactory.repository) {
            const source = databaseSource;
            const repositoryConfig = config[source];

            if (!repositoryConfig) {
                throw new Error(`Unknown repository source: ${source}`);
            }

            RepositoryFactory.repository = this.createRepository(source);
        }
        return RepositoryFactory.repository;
    }

    createRepository(source) {
        if (source === 'local') {
            return new LocalUserRepository();
        } else if (source === 'remote') {
            return new RemoteUserRepository();
        } else {
            throw new Error('Unknown repository source: ' + source);
        }
    }
} 