window.addEventListener('DOMContentLoaded', () => {

    const key = localStorage.key(0);
    const UserId = JSON.parse(localStorage.getItem(key));

    const tableBody = document.querySelector('#summaryTable tbody');
    if (!tableBody) {
        console.error("Table body not found");
        return;
    }

    fetch('/getAllResult', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: UserId })
    })
        .then(res => res.json())
        .then(data => {
            if (data.not) {
                return;
            }
            data.forEach(d => {
                
                const row = document.createElement('tr');
                row.innerHTML = `<td>${d.category}</td>
                <td>${d.total}</td>
                <td>${d.correct}</td>
                <td>${d.wrong}</td>
                <td>${d.percentage}%</td>`;

                row.style.cursor = 'pointer';
                row.addEventListener('click', () => {
                    window.location.href = `/viewResult?id=${result.categoryId}`;
                });

                tableBody.appendChild(row);
            });
        });
});
