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

document.getElementById('bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const value = key => (form.get(key) || '').toString().trim();
  const lines = [
    'Bonjour MSG, je souhaite obtenir des informations sur une réservation.',
    '',
    `Nom : ${value('name')}`,
    `Téléphone : ${value('phone')}`,
    `Espace : ${value('space')}`,
    `Date souhaitée : ${value('date') || 'À convenir'}`,
    `Participants : ${value('people') || 'À préciser'}`,
    `Besoin : ${value('message') || 'À discuter'}`
  ];
  const message = encodeURIComponent(lines.join('\n'));
  const note = document.getElementById('formNote');
  note.textContent = 'Votre message est prêt. Pour l’envoyer, ajoutez le numéro WhatsApp officiel de MSG au lien WhatsApp du site final. Cette démo ne transmet aucune donnée.';
  const whatsappNumber = ''; // À remplacer par le numéro WhatsApp officiel de MSG, chiffres uniquement.
  if (whatsappNumber) {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener');
  } else {
    const preview = document.createElement('textarea');
    preview.value = decodeURIComponent(message);
    preview.setAttribute('readonly', '');
    preview.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(preview);
    preview.select();
    try { document.execCommand('copy'); note.textContent += ' Le texte de la demande a été copié.'; }
    catch (_) { note.textContent += ' Copiez les informations du formulaire manuellement.'; }
    preview.remove();
  }
});
