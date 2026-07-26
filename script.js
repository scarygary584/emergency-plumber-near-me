document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-lead-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('button[type="submit"]');
  const originalText = submit ? submit.textContent : '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (status) status.textContent = '';
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending…';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'The request could not be sent.');
      }

      form.reset();
      if (status) status.textContent = 'Your plumbing request was sent. Watch for a call, text, or email from an available provider.';
    } catch (error) {
      if (status) status.textContent = 'The form did not send. Please call (951) 621-9532 instead.';
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = originalText;
      }
    }
  });
});