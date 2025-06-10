document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey && e.key === 'c') ||
    (e.ctrlKey && e.key === 'u') ||
    e.key === 'F12') {
    e.preventDefault();
  }
});