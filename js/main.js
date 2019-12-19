// Frontend validation.
const forecastForm = () => {
  const form = document.forms.forecast;

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) e.preventDefault();
  });
};

window.addEventListener('load', () => {
  // Include form related js if form is in current view.
  if (document.forms.forecast) forecastForm();
});
