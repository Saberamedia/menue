document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td><button onclick="editData(${item.id}, '${item.name}')">Bearbeiten</button></td>
                `;
            });
        });
}

function editData(id, name) {
    document.getElementById('update-id').value = id;
    document.getElementById('update-name').value = name;
}

function updateData() {
    const id = document.getElementById('update-id').value;
    const name = document.getElementById('update-name').value;

    fetch(`/api/data/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })
    .then(response => {
        if (response.ok) {
            fetchData();
            alert('Daten erfolgreich aktualisiert!');
        } else {
            alert('Fehler beim Aktualisieren der Daten.');
        }
    });
}
