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
      fetch('/delecate', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ didd: did }),
      }).then(res => res.json()).then(data => {
        if (data.success == 'success') {
          Swal.fire({
            title: 'Success!',
            text: 'You have deleted category successfully!',
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => {
            window.location = 'ldelcate.html';
          });
        }
      });
    }
    else {
      window.location = 'ldelcate.html'
    }
  });
});