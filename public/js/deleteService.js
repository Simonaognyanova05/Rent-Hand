
const deleteBtn = document.querySelector('.delete-btn');

if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {

        const endpoint = `/catalog/${deleteBtn.dataset.doc}`;

        fetch(endpoint, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => window.location.href = data.redirect)
            .catch(err => console.log(err));

    });
}

const editBtn = document.querySelector('.edit-btn');

if (editBtn) {
    editBtn.addEventListener('click', () => {
        window.location.href = `/catalog/edit/${editBtn.dataset.doc}`;
    });
}