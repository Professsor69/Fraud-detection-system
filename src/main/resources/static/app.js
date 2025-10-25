const authViewHTML = `
    <div class="flex flex-col md:flex-row items-center justify-center min-h-[70vh] gap-8 md:gap-16 px-4">
        <div class="w-full max-w-md animated-card rounded-xl shadow-lg p-8">
            <div class="flex justify-center mb-6">
                <button id="login-tab-btn" class="px-6 py-2 text-lg font-semibold border-b-2 border-blue-500 text-white">Login</button>
                <button id="register-tab-btn" class="px-6 py-2 text-lg font-semibold border-b-2 border-transparent text-gray-400">Register</button>
            </div>
            <form id="login-form">
                <div class="mb-4"><label for="login-email" class="block mb-2 text-sm font-medium text-gray-300">Email</label><input type="email" id="login-email" class="w-full p-3 rounded-lg form-input" required value="alice@example.com"></div>
                <div class="mb-6"><label for="login-password" class="block mb-2 text-sm font-medium text-gray-300">Password</label><input type="password" id="login-password" class="w-full p-3 rounded-lg form-input" required value="password123"></div>
                <div class="mb-4"><label for="login-role" class="block mb-2 text-sm font-medium text-gray-300">Login As</label>
                    <select id="login-role" class="w-full p-3 rounded-lg form-select text-gray-900">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">Login</button>
                <p id="auth-error" class="text-red-400 text-center mt-3"></p>
            </form>
            <form id="register-form" class="hidden">
                <div class="mb-4"><label for="register-username" class="block mb-2 text-sm font-medium text-gray-300">Username</label><input type="text" id="register-username" class="w-full p-3 rounded-lg form-input" required></div>
                <div class="mb-4"><label for="register-email" class="block mb-2 text-sm font-medium text-gray-300">Email</label><input type="email" id="register-email" class="w-full p-3 rounded-lg form-input" required></div>
                <div class="mb-4"><label for="register-country" class="block mb-2 text-sm font-medium text-gray-300">Country</label><input type="text" id="register-country" class="w-full p-3 rounded-lg form-input" required value="USA"></div>
                <div class="mb-6"><label for="register-password" class="block mb-2 text-sm font-medium text-gray-300">Password</label><input type="password" id="register-password" class="w-full p-3 rounded-lg form-input" required></div>
                <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">Register</button>
                <p id="auth-error-register" class="text-red-400 text-center mt-3"></p>
            </form>
        </div>
        <div class="max-w-xs text-center md:text-left">
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4 text-blue-400">FraudShield</h1>
            <p class="text-lg text-gray-300">Real-time fraud detection and secure transaction monitoring powered by Spring Boot and Java.</p>
        </div>
    </div>
`;

const dashboardStatsHTML = ({ approved, flagged, pending }) => `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-800 p-5 rounded-xl shadow-lg border border-green-600">
            <p class="text-sm font-medium text-gray-400">Approved</p>
            <p class="text-3xl font-bold text-green-400">${approved}</p>
        </div>
        <div class="bg-gray-800 p-5 rounded-xl shadow-lg border border-red-600">
            <p class="text-sm font-medium text-gray-400">Flagged</p>
            <p class="text-3xl font-bold text-red-400">${flagged}</p>
        </div>
        <div class="bg-gray-800 p-5 rounded-xl shadow-lg border border-yellow-600">
            <p class="text-sm font-medium text-gray-400">Pending</p>
            <p class="text-3xl font-bold text-yellow-400">${pending}</p>
        </div>
    </div>
`;

const userDashboardViewHTML = (username) => `
    <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-white mb-6">Welcome, ${username}</h2>

        <div id="dashboard-summary"></div>

        <section class="mb-10 p-6 bg-gray-800 rounded-xl shadow-xl">
            <h3 class="text-xl font-semibold text-blue-400 mb-4">Request New Transaction</h3>
            <form id="transaction-form" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label for="request-amount" class="block mb-2 text-sm font-medium text-gray-300">Amount ($)</label>
                    <input type="number" step="0.01" id="request-amount" class="w-full p-3 rounded-lg form-input text-gray-900" required placeholder="e.g., 50.00">
                </div>
                <div>
                    <label for="request-location" class="block mb-2 text-sm font-medium text-gray-300">Location (Country)</label>
                    <input type="text" id="request-location" class="w-full p-3 rounded-lg form-input text-gray-900" required placeholder="e.g., USA">
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 h-12">Submit Transaction</button>
            </form>
            <p id="request-success" class="text-green-400 mt-4"></p>
        </section>

        <section class="p-6 bg-gray-800 rounded-xl shadow-xl">
            <h3 class="text-xl font-semibold text-white mb-4">Transaction History (Last 10)</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-700">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody id="user-transactions-tbody" class="divide-y divide-gray-700">
                        </tbody>
                </table>
            </div>
        </section>
    </div>
`;

const profileViewHTML = (user) => `
    <div class="container mx-auto px-4 py-8 max-w-2xl">
        <h2 class="text-3xl font-bold text-white mb-6">User Profile</h2>
        <div class="bg-gray-800 p-8 rounded-xl shadow-xl">
            <form id="profile-form">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="mb-4">
                        <label for="profile-username" class="block mb-2 text-sm font-medium text-gray-300">Username</label>
                        <input type="text" id="profile-username" class="w-full p-3 rounded-lg form-input text-gray-900" value="${user.username}" disabled>
                    </div>
                    <div class="mb-4">
                        <label for="profile-email" class="block mb-2 text-sm font-medium text-gray-300">Email</label>
                        <input type="email" id="profile-email" class="w-full p-3 rounded-lg form-input text-gray-900" value="${user.email}" required>
                    </div>
                    <div class="mb-4">
                        <label for="profile-fullName" class="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                        <input type="text" id="profile-fullName" class="w-full p-3 rounded-lg form-input text-gray-900" value="${user.fullName || ''}">
                    </div>
                    <div class="mb-4">
                        <label for="profile-country" class="block mb-2 text-sm font-medium text-gray-300">Country</label>
                        <input type="text" id="profile-country" class="w-full p-3 rounded-lg form-input text-gray-900" value="${user.country || ''}">
                    </div>
                    <div class="mb-4">
                        <label for="profile-phone" class="block mb-2 text-sm font-medium text-gray-300">Phone Number</label>
                        <input type="text" id="profile-phone" class="w-full p-3 rounded-lg form-input text-gray-900" value="${user.phoneNumber || ''}">
                    </div>
                </div>
                <button type="submit" class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">Update Profile</button>
                <p id="profile-success" class="text-green-400 text-center mt-3"></p>
                <p id="profile-error" class="text-red-400 text-center mt-3"></p>
            </form>
        </div>
    </div>
`;

const adminDashboardViewHTML = (stats) => `
    <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-white mb-6">Admin Dashboard</h2>

        <div id="admin-dashboard-stats">
            ${dashboardStatsHTML(stats)}
        </div>

        <section class="mb-8 p-6 bg-gray-800 rounded-xl shadow-xl flex justify-between items-center">
            <h3 class="text-xl font-semibold text-red-400">Fraud Monitoring</h3>
            <button id="add-random-tx-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 text-sm">
                Add Random Transaction
            </button>
        </section>

        <section class="p-6 bg-gray-800 rounded-xl shadow-xl">
            <h3 class="text-xl font-semibold text-white mb-4">All Transactions</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-700">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th class="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="admin-transactions-tbody" class="divide-y divide-gray-700">
                        </tbody>
                </table>
            </div>
        </section>
    </div>
`;

// --- State Management ---
let currentUser = null;
let lastUserView = 'dashboard';
const mainContent = document.getElementById('main-content');
const adminTransactionsTbody = document.getElementById('admin-transactions-tbody');
const authError = document.getElementById('auth-error');


// --- Utility Functions ---
function getStatusBadge(status) {
    switch (status.toLowerCase()) {
        case 'approved': return `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>`;
        case 'flagged': return `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Flagged</span>`;
        case 'pending': return `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>`;
        default: return `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-500 text-gray-100">Unknown</span>`;
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function updateUILayout() {
    const navButtons = document.getElementById('nav-buttons');
    const headerTitle = document.getElementById('header-title');

    if (currentUser) {
        // Logged In
        document.body.classList.remove('auth-background');
        navButtons.classList.remove('hidden');
        headerTitle.textContent = currentUser.role.toUpperCase() + ' Portal';

        // Show correct view
        if (currentUser.role === 'admin') {
            showView('adminDashboard');
        } else {
            showView(lastUserView);
        }
    } else {
        // Logged Out
        document.body.classList.add('auth-background');
        navButtons.classList.add('hidden');
        headerTitle.textContent = 'Fraud Detection System';
        mainContent.innerHTML = authViewHTML;
        bindAuthEventListeners();
    }
}

function showView(viewId) {
    if (currentUser && currentUser.role !== 'admin') {
        lastUserView = viewId; // Save last view for non-admin users
    }

    if (!currentUser) return;

    // Remove active class from all nav buttons
    document.querySelectorAll('#nav-buttons button').forEach(btn => btn.classList.remove('border-blue-500', 'text-white'));

    // Render the correct content
    switch (viewId) {
        case 'dashboard':
            mainContent.innerHTML = userDashboardViewHTML(currentUser.username);
            document.getElementById('nav-dashboard-btn').classList.add('border-blue-500', 'text-white');
            renderDashboardSummary();
            bindUserDashboardEventListeners();
            break;
        case 'profile':
            mainContent.innerHTML = profileViewHTML(currentUser);
            document.getElementById('nav-profile-btn').classList.add('border-blue-500', 'text-white');
            bindProfileEventListeners();
            break;
        case 'adminDashboard':
            document.getElementById('nav-admin-btn')?.classList.add('border-blue-500', 'text-white');
            renderAdminDashboard();
            break;
    }
}


// --- API Call Functions ---

/**
 * @REFACTORED: Now uses fetch to call Spring Security for login.
 */
async function handleLogin(e) {
    e.preventDefault();
    document.getElementById('auth-error').textContent = '';
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value; // Used for UI demo only

    const formData = new FormData();
    formData.append('username', email); // Spring Security expects 'username' (which is the email)
    formData.append('password', password);

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            // Login success: fetch user profile to populate global state
            await fetchCurrentUserAndInitialize(role);
        } else {
             document.getElementById('auth-error').textContent = 'Invalid credentials. Please check email/password.';
        }
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('auth-error').textContent = 'An error occurred. Please try again.';
    }
}

/**
 * @REFACTORED: Now uses fetch to call the Spring Boot registration API.
 */
async function handleRegister(e) {
    e.preventDefault();
    const errorEl = document.getElementById('auth-error-register');
    errorEl.textContent = '';

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const country = document.getElementById('register-country').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, country })
        });

        const text = await response.text();
        if (response.ok) {
            alert('Registration successful! Please log in.');
            switchTab('login');
        } else {
            errorEl.textContent = text || 'Registration failed.';
        }
    } catch (error) {
        console.error('Registration failed:', error);
        errorEl.textContent = 'Registration failed due to a network error.';
    }
}

/**
 * @REFACTORED: Now uses fetch to call Spring Security for logout.
 */
async function handleLogout() {
    // Spring Security expects a POST to /api/auth/logout for session invalidation
    await fetch('/api/auth/logout', { method: 'POST' });
    currentUser = null;
    lastUserView = 'dashboard';
    updateUILayout();
}


/**
 * @REFACTORED: Now uses fetch to call the Spring Boot transaction creation API.
 * The fraud check logic is now on the server.
 */
async function handleTransactionRequest(e) {
    e.preventDefault();
    const requestSuccessMessage = document.getElementById('request-success');
    requestSuccessMessage.textContent = '';

    const amount = parseFloat(document.getElementById('request-amount').value);
    const location = document.getElementById('request-location').value.trim();

    if (isNaN(amount) || amount <= 0 || !location) {
        alert('Please enter a valid amount and location.');
        return;
    }

    try {
        const response = await fetch('/api/transactions/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, location })
        });

        if (response.ok) {
            const newTransaction = await response.json();
            e.target.reset();
            requestSuccessMessage.textContent = `Transaction submitted! Status: ${newTransaction.status}.`;
            renderDashboardSummary();
            setTimeout(() => { if (requestSuccessMessage) requestSuccessMessage.textContent = ''}, 3000);
        } else if (response.status === 401) {
            alert('Session expired. Please log in again.');
            handleLogout();
        } else {
            alert('Transaction failed to submit.');
        }
    } catch (error) {
        console.error('Transaction request error:', error);
    }
}


/**
 * @REFACTORED: Now uses fetch to update the user profile on the server.
 */
async function handleProfileUpdate(e) {
    e.preventDefault();
    const successEl = document.getElementById('profile-success');
    const errorEl = document.getElementById('profile-error');
    successEl.textContent = '';
    errorEl.textContent = '';

    const payload = {
        fullName: document.getElementById('profile-fullName').value,
        email: document.getElementById('profile-email').value,
        country: document.getElementById('profile-country').value,
        phoneNumber: document.getElementById('profile-phone').value,
        // The username is disabled and not updated
    };

    try {
        const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Update local state and show success
            const updatedUser = await response.json();
            currentUser = updatedUser;
            currentUser.role = updatedUser.role.replace('ROLE_', '').toLowerCase(); // Map back to JS role
            successEl.textContent = 'Profile updated successfully!';
        } else if (response.status === 401) {
            alert('Session expired. Please log in again.');
            handleLogout();
        } else {
            const errorText = await response.text();
            errorEl.textContent = errorText || 'Failed to update profile.';
        }
    } catch (error) {
        errorEl.textContent = 'A network error occurred.';
    }
}

/**
 * @REFACTORED: Now uses fetch to request a random transaction from the server.
 */
async function addRandomTransaction() {
    try {
        const response = await fetch('/api/admin/generate-random', { method: 'POST' });
        if (response.ok) {
            // Re-render the admin dashboard to show the new transaction
            renderAdminDashboard();
        } else {
            alert('Failed to add random transaction.');
        }
    } catch (error) {
        console.error('Random transaction error:', error);
    }
}

/**
 * @REFACTORED: Now uses fetch to call the admin API to approve or flag a transaction.
 */
async function handleAdminAction(e) {
    const action = e.target.dataset.action;
    const txId = e.target.dataset.id;
    if (!action || !txId) return;

    let endpoint = '';
    if (action === 'approve') {
        endpoint = `/api/admin/transactions/${txId}/approve`;
    } else if (action === 'flag') {
        endpoint = `/api/admin/transactions/${txId}/flag`;
    } else {
        return;
    }

    try {
        const response = await fetch(endpoint, { method: 'PUT' });
        if (response.ok) {
            renderAdminDashboard(); // Refresh the whole dashboard
        } else {
            alert(`Failed to ${action} transaction ${txId}.`);
        }
    } catch (error) {
        console.error(`Admin action error:`, error);
    }
}

// --- Rendering Functions ---

function renderUserTransactionRow(tbody, transaction) {
    const row = tbody.insertRow();
    row.className = 'bg-gray-800 hover:bg-gray-700 transition duration-150';

    row.insertCell().textContent = transaction.id;
    row.insertCell().textContent = formatCurrency(transaction.amount);
    row.insertCell().textContent = transaction.location;
    row.insertCell().textContent = formatDate(transaction.timestamp);
    row.insertCell().innerHTML = getStatusBadge(transaction.status);
}

function renderAdminTransactionRow(tbody, transaction, showActions) {
    const row = tbody.insertRow();
    row.className = 'bg-gray-800 hover:bg-gray-700 transition duration-150';

    row.insertCell().textContent = transaction.id;
    row.insertCell().textContent = transaction.username; // Use username from backend
    row.insertCell().textContent = formatCurrency(transaction.amount);
    row.insertCell().textContent = transaction.location;
    row.insertCell().textContent = formatDate(transaction.timestamp);
    row.insertCell().innerHTML = getStatusBadge(transaction.status);

    if (showActions) {
        const actionCell = row.insertCell();
        actionCell.className = 'px-4 py-4 whitespace-nowrap text-center text-sm font-medium';
        if (transaction.status.toUpperCase() === 'PENDING' || transaction.status.toUpperCase() === 'FLAGGED') {
            actionCell.innerHTML = `
                <button data-id="${transaction.id}" data-action="approve" class="action-btn text-green-500 hover:text-green-700 mr-3">Approve</button>
            `;
        }
        if (transaction.status.toUpperCase() !== 'FLAGGED') {
            actionCell.innerHTML += `
                <button data-id="${transaction.id}" data-action="flag" class="action-btn text-red-500 hover:text-red-700">Flag</button>
            `;
        }
        actionCell.querySelector('.action-btn')?.addEventListener('click', handleAdminAction);
    }
}

/**
 * @REFACTORED: Now fetches summary data from the server.
 */
async function renderDashboardSummary() {
    const dashboardSummaryEl = document.getElementById('dashboard-summary');
    if (!dashboardSummaryEl) return;

    // Check if the user is logged in
    if (!currentUser) return;

    try {
        const response = await fetch('/api/dashboard/summary');
        if (!response.ok) throw new Error('Failed to fetch summary');

        const summaryData = await response.json();

        // Render stats at the top
        dashboardSummaryEl.innerHTML = dashboardStatsHTML(summaryData);

        // Load the transaction history for the user
        loadUserTransactions(currentUser.id);

    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        dashboardSummaryEl.innerHTML = '<p class="text-red-400">Failed to load dashboard data.</p>';
    }
}

/**
 * @REFACTORED: Now fetches the current user's transactions from the server.
 */
async function loadUserTransactions(userId) {
    const userTransactionsTbody = document.getElementById('user-transactions-tbody');
    if (!userTransactionsTbody) return;
    userTransactionsTbody.innerHTML = '<tr><td colspan="5" class="text-center p-4">Loading...</td></tr>';

    try {
        const response = await fetch(`/api/transactions/my-history`);
        if (!response.ok) throw new Error('Failed to fetch user history');

        const transactions = await response.json();

        userTransactionsTbody.innerHTML = '';
        if (transactions.length === 0) {
            userTransactionsTbody.innerHTML = '<tr><td colspan="5" class="text-center p-4">No transactions.</td></tr>';
            return;
        }
        transactions.forEach(t => renderUserTransactionRow(userTransactionsTbody, t));

    } catch (error) {
        console.error('Error loading user transactions:', error);
        userTransactionsTbody.innerHTML = '<tr><td colspan="5" class="text-center p-4 text-red-400">Failed to load transactions.</td></tr>';
    }
}

/**
 * @REFACTORED: Now fetches ALL transactions from the admin API.
 */
async function loadAdminTransactions() {
    const adminTransactionsTbody = document.getElementById('admin-transactions-tbody');
    if (!adminTransactionsTbody) return;
    adminTransactionsTbody.innerHTML = '<tr><td colspan="7" class="text-center p-4">Loading...</td></tr>';

    try {
        const response = await fetch(`/api/admin/transactions`);
        if (!response.ok) throw new Error('Failed to fetch all transactions');

        const transactions = await response.json();

        adminTransactionsTbody.innerHTML = '';
        if (transactions.length === 0) {
            adminTransactionsTbody.innerHTML = '<tr><td colspan="7" class="text-center p-4">No transactions found.</td></tr>';
            return;
        }

        // Sort the transactions client-side for immediate display
        transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        transactions.forEach(t => renderAdminTransactionRow(adminTransactionsTbody, t, true));

    } catch (error) {
        console.error('Error loading admin transactions:', error);
        adminTransactionsTbody.innerHTML = '<tr><td colspan="7" class="text-center p-4 text-red-400">Failed to load transactions.</td></tr>';
    }
}

/**
 * @REFACTORED: Combines stat fetch and transaction list load for admin.
 */
async function renderAdminDashboard() {
    const adminDashboardEl = document.getElementById('admin-dashboard-view');
    if (!adminDashboardEl) {
        // Must dynamically inject admin dashboard view after checking stats
        try {
            const response = await fetch('/api/dashboard/summary');
            if (!response.ok) throw new Error('Failed to fetch admin summary');
            const summaryData = await response.json();
            mainContent.innerHTML = adminDashboardViewHTML(summaryData);
            bindAdminDashboardEventListeners();
            loadAdminTransactions();
        } catch (error) {
            mainContent.innerHTML = '<div class="text-red-400 p-8 text-center">Failed to load Admin Dashboard.</div>';
        }
    } else {
        // If already rendered, just update the lists
        loadAdminTransactions();
    }
}


// --- Event Listeners and Initializers ---

function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab-btn');
    const registerTab = document.getElementById('register-tab-btn');

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('border-blue-500', 'text-white');
        registerTab.classList.remove('border-blue-500', 'text-white');
        registerTab.classList.add('border-transparent', 'text-gray-400');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerTab.classList.add('border-blue-500', 'text-white');
        loginTab.classList.remove('border-blue-500', 'text-white');
        loginTab.classList.add('border-transparent', 'text-gray-400');
    }
}

function bindAuthEventListeners() {
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('register-form')?.addEventListener('submit', handleRegister);
    document.getElementById('login-tab-btn')?.addEventListener('click', () => switchTab('login'));
    document.getElementById('register-tab-btn')?.addEventListener('click', () => switchTab('register'));
}

function bindCommonEventListeners() {
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('nav-dashboard-btn')?.addEventListener('click', () => showView('dashboard'));
    document.getElementById('nav-profile-btn')?.addEventListener('click', () => showView('profile'));
}

function bindUserDashboardEventListeners() {
    document.getElementById('transaction-form')?.addEventListener('submit', handleTransactionRequest);
}

function bindProfileEventListeners() {
    document.getElementById('profile-form')?.addEventListener('submit', handleProfileUpdate);
}

function bindAdminDashboardEventListeners() {
    document.getElementById('add-random-tx-btn')?.addEventListener('click', addRandomTransaction);
    // Actions are bound dynamically inside renderAdminTransactionRow
}


/**
 * FIXED: Ensures that the response body is only parsed as JSON
 * if the request was successful (status 200-299), preventing crashes on 401/403.
 */
async function fetchCurrentUserAndInitialize(loginRoleOverride = null) {
    let user = null; // Local variable to hold the fetched user data

    try {
        // 1. Check if a user session already exists
        const response = await fetch('/api/auth/me');

        if (response.ok) {
            // SUCCESS (Status 200): Session exists. Safely parse the JSON body.
            user = await response.json();
            currentUser = user;
            // Map backend role (e.g., "ROLE_USER") to app's role (e.g., "user")
            currentUser.role = user.role.replace('ROLE_', '').toLowerCase();
        } else {
            // FAILURE (Status 401/403): User is not logged in or forbidden.
            // This is the expected flow for an unauthenticated user.
            // Crucially, we skip 'await response.json()' to avoid a crash.
            currentUser = null;
        }

    } catch (error) {
        // Catches network errors (e.g., server down) or an internal error during the fetch process.
        console.error('Network or communication error during session check:', error);
        currentUser = null;
    }

    // --- INITIALIZE UI ---
    // Override role if we just completed a successful login.
    if (loginRoleOverride && currentUser) {
        currentUser.role = loginRoleOverride;
    }

    // This is the main entry point to render the UI (login or dashboard)
    updateUILayout();
    bindCommonEventListeners();
}

// Initial script execution
fetchCurrentUserAndInitialize();