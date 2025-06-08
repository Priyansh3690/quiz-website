fetch('/listcategory')
    .then(async res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        const container = document.getElementById('listcategory');
        data.forEach(value => {
            let id = value.id;
            let name = value.name;
            let type = value.type;
            let img = value.path;
            let classes = '';
            if (type == 'hard') {
                classes = 'container maths'
            }
            else if (type == 'medium') {
                classes = 'container bluess'
            }
            else {
                classes = 'container science';
            }
            let elemented = document.createElement('a');
            elemented.href = 'ListQuestion.html?id=' + id;
            elemented.classList.add(...classes.split(' '));
            elemented.innerHTML = `<img src="${img}" alt="" class="img">
      <h3>
        ${name}
      </h3>
      <p>
        Type : ${type}
      </p>`;
            container.appendChild(elemented);
        });
    });