const nameInput = document.getElementById('nameInput');
const result = document.getElementById('result');

nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchUser();
});

async function searchUser() {
    const name = nameInput.value.trim();
    
    if (!name) {
        showError('Please enter a name');
        return;
    }
    
    result.style.display = 'block';
    result.innerHTML = '<div class="loading">Searching...</div>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const users = await response.json();
        const user = users.find(u => u.name.toLowerCase().includes(name.toLowerCase()));
        
        if (user) {
            displayUser(user);
        } else {
            showError('User not found');
        }
        
    } catch (error) {
        showError('Error: ' + error.message);
    }
}

function displayUser(user) {
    result.innerHTML = `
        <div class="user-card">
            <h2>${user.name}</h2>
            <div class="user-info"><strong>Username:</strong> ${user.username}</div>
            <div class="user-info"><strong>Email:</strong> ${user.email}</div>
            <div class="user-info"><strong>Phone:</strong> ${user.phone}</div>
            <div class="user-info"><strong>Website:</strong> ${user.website}</div>
            <div class="user-info"><strong>Company:</strong> ${user.company.name}</div>
            <div class="user-info">
                <strong>Address:</strong> ${user.address.street}, ${user.address.suite}, 
                ${user.address.city}, ${user.address.zipcode}
            </div>
        </div>
    `;
}

function showError(message) {
    result.innerHTML = `<div class="error">${message}</div>`;
}

function refreshPage() {
    location.reload();
}