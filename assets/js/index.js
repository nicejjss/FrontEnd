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

const displayControls = (result, name) => {
    const paginationControls = document.getElementById('pagination-controls');
    const { totalPages, page } = result;

    let buttons = `<button class="pagination-button" id="prev-page" ${page === 1 ? 'disabled' : ''}>&lt;</button>`;

    // Always show first page
    buttons += `<button class="pagination-button" id="page-1">1</button>`;

    // Calculate range of pages to show
    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);

    // Add dots if needed after first page
    if (startPage > 2) {
        buttons += `<button class="dots">...</button>`;
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
        buttons += `<button class="pagination-button" id="page-${i}">${i}</button>`;
    }

    // Add dots if needed before last page
    if (endPage < totalPages - 1) {
        buttons += `<button class="dots">...</button>`;
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
        buttons += `<button class="pagination-button" id="page-${totalPages}">${totalPages}</button>`;
    }

    buttons += `<button class="pagination-button" id="next-page" ${page === totalPages ? 'disabled' : ''}>&gt;</button>`;

    paginationControls.innerHTML = buttons;

    // Add active class to current page
    const activeButton = paginationControls.querySelector(`#page-${page}`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Remove old event listener before adding new one
    const newPaginationControls = paginationControls.cloneNode(true);
    paginationControls.parentNode.replaceChild(newPaginationControls, paginationControls);

    // Add new event listener
    newPaginationControls.addEventListener('click', (e) => handlePaginationClick(e, result.page, name));
}

// Main pagination click handler
const handlePaginationClick = (e, currentPage, name) => {
    if (!e.target.classList.contains('pagination-button')) return;

    let page = currentPage;
    if (e.target.id === 'prev-page') {
        page = currentPage - 1;
    } else if (e.target.id === 'next-page') {
        page = currentPage + 1;
    } else if (e.target.id.startsWith('page-')) {
        page = parseInt(e.target.id.split('-')[1]);
    }

    loadData(page, name);
}

// Initialize repository using singleton pattern
const repository = RepositoryFactory.getInstance().getRepository();

// Update loadData to render pagination controls
const loadData = async (page, name = '') => {
    try {
        const result = await repository.getUsers(page, name);
        displayRow(result.data);
        displaySummary(result);
        displayControls(result, name);
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

// Debounce timer variable
let debounceTimer;

// Initialize search functionality
const initializeSearch = () => {
    const searchInput = document.getElementById('search-inp');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const name = e.target.value.trim();
            loadData(1, name);
        }, 1000);
    });
};

// Initialize the application
const initializeApp = () => {
    loadData();
    initializeSearch();
};

initializeApp();

