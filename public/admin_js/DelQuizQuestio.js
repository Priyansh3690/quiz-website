window.addEventListener('DOMContentLoaded', () => {
  const urlParam = new URLSearchParams(window.location.search);
  const did = urlParam.get('id');

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch('/DeleteQuestion', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ didd: did }),
      }).then(res => res.json()).then(data => {
        if (data.success == 'success') {
          return Swal.fire({
            title: 'Success!',
            text: 'You have deleted category Question successfully!',
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => {
            window.location = 'ListDelQuizQuestion.html';
          });
        }
        Swal.fire({
          title: 'Error!',
          text: 'You Can Not Delete category before Clearing is`s Question!',
          icon: 'error'
        }).then(() => {
          window.location = 'ListDelQuizQuestion.html';
        });
      });
    }
    else {
      window.location = 'ListDelQuizQuestion.html'
    }
  });
});