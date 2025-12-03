// Fetch all orders from backend
async function fetchOrders() {
    try {
        const res = await fetch('https://pharmacy-backend.fly.dev/api/orders');
        const orders = await res.json();
        const tbody = document.querySelector('#ordersTable tbody');
        tbody.innerHTML = '';

        orders.forEach(order => {
            order.items.forEach(item => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
            <td data-label="User Name">${order.user.name}</td>
            <td data-label="Email">${order.user.email}</td>
            <td data-label="Phone">${order.user.phone}</td>
            <td data-label="Address">${order.user.address}</td>
            <td data-label="Item Name">${item.name}</td>
            <td data-label="Quantity">${item.quantity}</td>
            <td data-label="Total">${order.total}</td>
            <td data-label="Status" class="status">
                <select data-order-id="${order._id}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td data-label="Created At">${formatDate(order.createdAt)}</td>
            <td data-label="Updated At">${formatDate(order.updatedAt)}</td>
            <td>
                <button class="delete-btn" data-order-id="${order._id}">Delete</button>
            </td>
        `;
                tbody.appendChild(tr);
            });
        });

    } catch (err) {
        console.error('Error fetching orders:', err);
    }
}

// Format timestamp to: 02-12-2025 05:43 PM
function formatDate(dateStr) {
    const options = {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    };
    return new Date(dateStr).toLocaleString('en-GB', options);
}

// Initial fetch
fetchOrders();

document.addEventListener('change', async (e) => {
    if(e.target.tagName === 'SELECT' && e.target.dataset.orderId){
        const orderId = e.target.dataset.orderId;
        const newStatus = e.target.value;

        try {
            const res = await fetch(`https://pharmacy-backend.fly.dev/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if(!res.ok) throw new Error('Failed to update status');

            const data = await res.json();
            alert(`Status updated to ${data.status}`);
            fetchOrders(); // Refresh table
        } catch(err) {
            console.error(err);
            alert('Error updating status');
        }
    }
});

document.addEventListener('click', async (e) => {
    if(e.target.classList.contains('delete-btn')){
        const orderId = e.target.dataset.orderId;
        console.log('Deleting order:', orderId); // 🔹 debug

        if(!orderId) return alert('Order ID missing!');

        if(!confirm('Are you sure you want to delete this order?')) return;

        try {
            const res = await fetch(`https://pharmacy-backend.fly.dev/api/orders/${orderId}`, {
                method: 'DELETE'
            });

            if(!res.ok) throw new Error('Failed to delete order');

            alert('Order deleted successfully');
            fetchOrders(); // Refresh table
        } catch(err) {
            console.error('Delete order error:', err);
            alert('Error deleting order');
        }
    }
});

document.addEventListener('click', async (e) => {
    if(e.target.classList.contains('delete-btn')){
        const orderId = e.target.dataset.orderId;
        console.log('Order ID to delete:', orderId);  // 🔹 Check here

        if(!orderId) return alert('Order ID missing!');
    }
});




