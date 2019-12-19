// Frontend validation.
const forecastForm = () => {
  const form = document.forms.forecast;

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) e.preventDefault();
  });
};

const copyrightYear = () => {
  const ele = document.querySelector('.copyright__year');

  if (ele) ele.innerHTML = new Date().getFullYear();
};

copyrightYear();

window.addEventListener('load', () => {
  // Include form related js if form is in current view.
  if (document.forms.forecast) forecastForm();
});
