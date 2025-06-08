window.addEventListener('DOMContentLoaded', function () {
    const urlParam = new URLSearchParams(window.location.search);
    const cid = parseInt(urlParam.get('id'));
    const uid = parseInt(urlParam.get('uid'));
    const time = urlParam.get('time');
    console.log(cid);
    console.log(uid);
    console.log(time);
    const form = document.getElementById('userQuiz');

    fetch('/viewFullResult', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cid: cid, uid: uid, time: time }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.not) {
                return Swal.fire({
                    title: 'Error!',
                    text: 'Somthing Went Wrong!',
                    icon: 'error',
                    confirmButtonText: 'Return'
                }).then(() => {
                    window.location = 'ShowResult.html';
                });
            }
            const qustion = data.Question;
            const result = data.Result;
            const lenth = data.len;
            form.innerHTML = '';
            let coutn = 1;

            for (let i = 0; i < lenth; i++) {
                let que = qustion[i];
                let Rs = result[i];
                const div = document.createElement('div');
                div.classList.add('question-block');
                let optionsHTML = '';

                // option 1
                const isSelected1 = que.op1 === Rs.opetion;
                const isCorrect1 = que.op1 === que.ans;

                let color = 'black';
                if (isSelected1 && isCorrect1) {
                    color = 'green'; // user selected correct
                } else if (isSelected1 && !isCorrect1) {
                    color = 'red';   // user selected wrong
                } else if (isCorrect1) {
                    color = 'green'; // correct option not selected by user
                }

                optionsHTML += `
                <label style="display: block; margin: 4px 0; color: ${color}; font-weight: ${isCorrect1 ? 'bold' : 'normal'}">
                 <input type="radio" name="q${que.id}" value="${que.op1}" ${isSelected1 ? 'checked' : ''} disabled>
                    ${que.op1}
                </label>
                `;

                // option 2
                const isSelected2 = que.op2 === Rs.opetion;
                const isCorrect2 = que.op2 === que.ans;

                let color1 = 'black';
                if (isSelected2 && isCorrect2) {
                    color1 = 'green'; // user selected correct
                } else if (isSelected2 && !isCorrect2) {
                    color1 = 'red';   // user selected wrong
                } else if (isCorrect2) {
                    color1 = 'green'; // correct option not selected by user
                }

                optionsHTML += `
                <label style="display: block; margin: 4px 0; color: ${color1}; font-weight: ${isCorrect2 ? 'bold' : 'normal'}">
                    <input type="radio" name="q${que.id}" value="${que.op2}" ${isSelected2 ? 'checked' : ''} disabled>
                    ${que.op2}
                </label>
                `;

                // option 3
                const isSelected3 = que.op3 === Rs.opetion;
                const isCorrect3 = que.op3 === que.ans;

                let color2 = 'black';
                if (isSelected3 && isCorrect3) {
                    color2 = 'green'; // user selected correct
                } else if (isSelected3 && !isCorrect3) {
                    color2 = 'red';   // user selected wrong
                } else if (isCorrect3) {
                    color2 = 'green'; // correct option not selected by user
                }

                optionsHTML += `
                <label style="display: block; margin: 4px 0; color: ${color2}; font-weight: ${isCorrect3 ? 'bold' : 'normal'}">
                    <input type="radio" name="q${que.id}" value="${que.op3}" ${isSelected3 ? 'checked' : ''} disabled>
                    ${que.op3}
                </label>
                `;

                // option 4
                const isSelected4 = que.op4 === Rs.opetion;
                const isCorrect4 = que.op4 === que.ans;

                let color3 = 'black';
                if (isSelected4 && isCorrect4) {
                    color3 = 'green'; // user selected correct
                } else if (isSelected4 && !isCorrect4) {
                    color3 = 'red';   // user selected wrong
                } else if (isCorrect4) {
                    color3 = 'green'; // correct option not selected by user
                }

                optionsHTML += `
                <label style="display: block; margin: 4px 0; color: ${color3}; font-weight: ${isCorrect4 ? 'bold' : 'normal'}">
                    <input type="radio" name="q${que.id}" value="${que.op4}" ${isSelected4 ? 'checked' : ''} disabled>
                    ${que.op4}
                </label>
                `;

                div.innerHTML = `<p class="question">${coutn}. ${que.question}</p>
                ${optionsHTML}
                <hr>
                `;
                form.appendChild(div);
                coutn++;
            }
        });

    const back = document.getElementById('back');
    back.addEventListener('click', () => {
        window.location = 'ShowResult.html';
    });

});