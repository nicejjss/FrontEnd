 export class CustomerDTO {

    constructor(name, company, phone, email, country, status) {
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
        this.country = country;
        this.status = status;
    }

    isActive() {
        return this.status === 1;
    }

    getStatusLabel() {
        return this.isActive() ? 'Active' : 'Inactive';
    }

    getStatusClass() {
        return this.isActive() ? 'active' : 'inactive';
    }

    static convertLocalToDTO(data) {
        return new CustomerDTO(data.name, data.company, data.phone, data.email, data.country, data.status);
    }

    static convertRemoteToDTO(data) {
        return new CustomerDTO(data.name, data.company.name, data.phone, data.email, data.address.city, data.status);
    }
}