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
                return () => {
                    const row = document.createElement('tr');
                    row.innerText = 'DOES NOT GIVE ANY QUEZI 😔';
                    tableBody.appendChild(row);
                };
            }

            let count = 1;
            data.forEach(d => {

                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${count}</td>
                <td>${d.name}</td>
                <td>${d.total_que}</td>
                <td>${d.correct_que}</td>
                <td>${d.wrong_que}</td>
                <td>${d.percentage}%</td>`;

                row.style.cursor = 'pointer';
                row.addEventListener('click', () => {
                    window.location.href = `/viewResult?id=${d.cid}`;
                });

                tableBody.appendChild(row);
                count++;
            });
        });
});
