window.addEventListener('DOMContentLoaded', () => {

  const urlParam = new URLSearchParams(window.location.search);
  const did = urlParam.get('id');

  const form = document.getElementById('form');
  const categoty_input = document.getElementById('categoty-input');
  const type_input = document.getElementById('type-input');
  const image_input = document.getElementById('images-input');
  const imge = document.getElementById('preview');

  fetch('/editcate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ didd: did }),
  })
    .then(res => res.json())
    .then(data => {
      categoty_input.value = data.name;
      type_input.value = data.type;
      const img = data.path;
      imge.src = img;
    });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cate = categoty_input.value.toLowerCase();
    const typ = type_input.value.toLowerCase();
    const formdata = new FormData();
    formdata.append('id', did);
    formdata.append('name', cate);
    formdata.append('type', typ);
    if (image_input.files.length > 0) {
      const imageFile = image_input.files[0];
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(imageFile, options);
      formdata.append('img', compressedFile);
    }
    else {
      formdata.append('existingImg', imge.src);
    }
    fetch('/updatecategory', {
      method: 'post',
      body: formdata,
    }).then(res => res.json()).then(data => {
      if (data.success == 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'You have Updated Category successfully!',
          icon: 'success',
          confirmButtonText: 'Continue'
        }).then(() => {
          window.location = 'listeditcategory.html';
        });
      }
    });
  });

});