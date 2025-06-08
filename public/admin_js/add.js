const form = document.getElementById('form');
const categoty_input = document.getElementById('categoty-input');
const type_input = document.getElementById('type-input');
const image_input = document.getElementById('images-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  let errors = []
  errors = getLoginFormsError(categoty_input.value, type_input.value, image_input.files[0])
  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
  else {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', categoty_input.value.toLowerCase());
    formdata.append('type', type_input.value.toLowerCase());
    // formdata.append('image', image_input.files[0]);

    const imageFile = image_input.files[0];
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(imageFile, options);
    formdata.append('image', compressedFile);



    fetch('/addcat', {
      method: 'post',
      body: formdata,
    }).then(res => res.json()).then(data => {
      if (data.success == 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'You have Added New Category successfully!',
          icon: 'success',
          confirmButtonText: 'Continue'
        }).then(() => {
          window.location = 'addcategory.html'
        });
      }
      if (data.category == 'Incorrect') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is error ,Enter uniqe Category!",
        });
      }
      if (data.img == 'Incorrect') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There is error ,Imports Image!",
        });
      }
    });
  }
});

function getLoginFormsError(categoty, type, images) {
  let errors = [];
  if (categoty === '' || categoty == null) {
    errors.push('Category is required');
    categoty_input.parentElement.classList.add('incorrect');
  }
  if (type === '' || type == null) {
    errors.push('Type is required');
    type_input.parentElement.classList.add('incorrect');
  }
  if (type.toLowerCase() != 'easy' && type.toLowerCase() != 'medium' && type.toLowerCase() != 'hard') {
    errors.push('Type Must be Easy or Medium or hard');
    type_input.parentElement.classList.add('incorrect');
  }
  if (images == '' || images == null) {
    errors.push('Image is required');
    image_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

const allInputs = [categoty_input, type_input, image_input].filter(input => input != null);
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  })
})
