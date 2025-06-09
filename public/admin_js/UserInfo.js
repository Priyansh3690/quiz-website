window.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.querySelector('#summaryTable tbody');
    if (!tableBody) {
        console.error("Table body not found");
        return;
    }

    fetch('/getAllUserInfoForAdmin')
        .then(res => res.json())
        .then(data => {
            if (data.not) {
                const row = document.createElement('tr');
                const td = document.createElement('td');
                td.innerText = 'NO DATA FOUND 😔';
                td.colSpan = 5;
                td.style.textAlign = 'center';
                td.style.color = 'red';
                row.appendChild(td);
                tableBody.appendChild(row);
                return;
            }

            let count = 1;
            data.forEach(d => {

                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${count}</td>
                <td>${d.id}</td>
                <td>${d.username}</td>
                <td>${d.email}</td>
                <td>${d.date_time}</td>
                `;

                row.style.cursor = 'pointer';
                // row.addEventListener('click', () => {
                //     window.location.href = `viewFullResult.html?id=${d.cid}&uid=${d.uid}&time=${encodeURIComponent(d.data_time)}`;
                // });

                tableBody.appendChild(row);
                count++;
            });
        });
});
