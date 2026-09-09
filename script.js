emailjs.init('-hmS6y-IjDYfrAYLf'); 

const form = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalOk = document.getElementById('modalOk');
const shareBtn = document.querySelector('.btn-secondary');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const submitBtn = form.querySelector('.btn-primary');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  emailjs.send('service_rrr2e5t', 'template_6ajlih9', { email: email })
    .then(() => {
      openModal();
      form.reset();
    })
    .catch((error) => {
      alert('Error, try again');
      console.error(error);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get a discount';
    });
});

function openModal() {
  modalOverlay.classList.add('visible');
}

function closeModal() {
  modalOverlay.classList.remove('visible');
}

modalClose.addEventListener('click', closeModal);
modalOk.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

// Share with a friend

shareBtn.addEventListener('click', function () {
  const shareData = {
    title: 'Get a 20% discount',
    text: 'I found a great discount - 20%! Look!',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    const telegramUrl = `https://t.me/share/url?url=
    ${encodeURIComponent(shareData.url)}&text=
    ${encodeURIComponent(shareData.text)}`;
    window.open(telegramUrl, '_blank');
  }
});

// Copy button
const copyBtn = document.getElementById('copyBtn');
const promoCode = document.getElementById('promoCode');

copyBtn.addEventListener('click', function () {
  navigator.clipboard.writeText(promoCode.textContent)
    .then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    })
    .catch((error) => {
      console.error('Failed to copy:', error);
    });
});