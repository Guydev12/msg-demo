const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const dateField = document.querySelector('input[name="date"]');
if (dateField) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().split('T')[0];
  dateField.min = localDate;
}

const modal = document.getElementById('confirmationModal');
const summary = document.getElementById('confirmationSummary');
let previousFocus = null;

function closeConfirmation() {
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (previousFocus) previousFocus.focus();
}

function openConfirmation(data) {
  previousFocus = document.activeElement;
  const items = [
    ['Nom', data.get('name')],
    ['Espace', data.get('space')],
    ['Date souhaitée', data.get('date') || 'À convenir'],
    ['Participants', data.get('people') || 'À préciser']
  ];
  summary.replaceChildren();
  items.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'confirmation-summary-row';
    const key = document.createElement('span');
    key.textContent = label;
    const val = document.createElement('strong');
    val.textContent = value || '—';
    row.append(key, val);
    summary.appendChild(row);
  });
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.confirmation-done').focus();
}

document.getElementById('bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  openConfirmation(new FormData(event.currentTarget));
});

modal.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeConfirmation);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('is-visible')) closeConfirmation();
});
