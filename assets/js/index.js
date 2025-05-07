import { RepositoryFactory } from "./Repository/RepositoryFactory.js";

const displayRow = (customers) => {
    const tableBody = document.getElementById('content-data-body');
    
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    let rows = '';
    customers.forEach(customer => {
        rows += `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.company}</td>
          <td>${customer.phone}</td>
          <td>${customer.email}</td>
          <td>${customer.country}</td>
          <td class="data-status">
            <span class="status ${customer.getStatusClass()}">${customer.getStatusLabel()}</span>
          </td>
        </tr>
      `;
    });
    tableBody.innerHTML = rows;
}

const displaySummary = (result) => {
    // Calculate and display summary
    const start = (result.total === 0) ? 0 : (result.page - 1) * result.limit + 1;
    const end = Math.min(result.page * result.limit, result.total);
    const summary = `Showing data ${start} to ${end} of ${result.total.toLocaleString()} entries`;
    const summaryDiv = document.getElementById('pagination-summary');
    if (summaryDiv) {
        summaryDiv.textContent = summary;
    }
}

// Initialize repository using singleton pattern
const repository = RepositoryFactory.getInstance().getRepository();

// Update loadData to render pagination controls
const loadData = async (page, limit) => {
    try {
        const result = await repository.getUsers(page, limit);
        displayRow(result.data);
        displaySummary(result);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

loadData();
