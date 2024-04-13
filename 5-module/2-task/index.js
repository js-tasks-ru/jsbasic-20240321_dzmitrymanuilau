function toggleText() {
  const textElement = document.getElementById('text');
  const button = document.querySelector('.toggle-text-button');

  button.addEventListener('click', function() {
      if (textElement.hasAttribute('hidden')) {
          textElement.removeAttribute('hidden');
      } else {
          textElement.setAttribute('hidden', '');
      }
  });
}