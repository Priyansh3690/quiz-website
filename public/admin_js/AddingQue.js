function addQuestionBlock() {
  const container = document.getElementById('questionContainer');
  const firstBlock = container.querySelector('.question-block');
  const clone = firstBlock.cloneNode(true);

  // Clear inputs in the clone
  clone.querySelectorAll('input').forEach(input => input.value = '');
  container.appendChild(clone);
}

function removeBlock(button) {
  const container = document.getElementById('questionContainer');
  if (container.querySelectorAll('.question-block').length > 1) {
    button.parentElement.remove();
  } else {
    // alert("You must have at least one question.");
    Swal.fire({
      title: "You must have at Least one Question",
      icon: "warning"
    });
  }
}

// Handle form submit (example only)
document.addEventListener('DOMContentLoaded', function () {
  const urlParam = new URLSearchParams(window.location.search);
  const cid = urlParam.get('id');
  document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const questions = [];

    const entries = formData.getAll('questions[]');
    for (let i = 0; i < entries.length; i++) {
      questions.push({
        question: formData.getAll('questions[]')[i],
        options: [
          formData.getAll('options1[]')[i],
          formData.getAll('options2[]')[i],
          formData.getAll('options3[]')[i],
          formData.getAll('options4[]')[i]
        ],
        answer: formData.getAll('answers[]')[i],
        cid: cid
      });
    }
    fetch('/AddQuestion', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questions),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success == 'success') {
          Swal.fire({
            title: 'Success!',
            text: 'You have Added New Category successfully!',
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => {
            window.location = 'AddQuestion.html ';
          });
        }
      });
  });

});