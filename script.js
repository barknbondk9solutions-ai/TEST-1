const trainers = {
  1: {
    firstName: "Blair",
    lastName: "Almendarez",
    title: "Owner / Lead Trainer",
    credentials: "B.S. Criminal Justice, Minor: Psychology, Certificate in National Security Studies",
    badges: ["Background-Screened (Multiple Checks)", "First Aid Certified (Dog & Human)"],
    experience: "5+ Years",
    specialties: "Obedience & manners, Puppy training & socialization, Behavior modification (reactivity, fear, anxiety), K9 nose work & enrichment, Virtual training & coaching",
    bio: "With years of hands-on experience working with dogs, I have also honed my skills through academic studies, internships, and shadowing government agencies. These experiences sharpened my observation, behavior analysis, and strategic problem-solving abilities, which I now apply to understanding canine behavior and creating effective, customized training plans.",
    gallery: [
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/YrDqlxeZ4JTQb14e/blair-a-m5KnR1PvgNUJe2wz.jpg",
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/YrDqlxeZ4JTQb14e/img_1201-mxBXPR5BeRcaBbzw.jpeg",
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/YrDqlxeZ4JTQb14e/img_5265-ALpPR4gV0WhQLxGj.jpeg"
    ],
  },
  2: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  3: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  4: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  5: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  6: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  7: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  8: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  9: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
  10: { firstName: "", lastName: "", title: "Pending", credentials: "TBA", badges: ["TBA"], experience: "TBA", specialties: "", bio: "Profile coming soon.", gallery: [] },
};

// Modal DOM elements
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalName = document.getElementById("modalName");
const modalTitle = document.getElementById("modalTitle");
const modalCredentials = document.getElementById("modalCredentials");
const modalBadges = document.getElementById("modalBadges");
const modalExperience = document.getElementById("modalExperience");
const modalSpecialties = document.getElementById("modalSpecialties");
const modalBio = document.getElementById("modalBio");
const modalGallery = document.getElementById("modalGallery");
const modalNoPhotos = document.getElementById("modalNoPhotos");

// Populate modal with trainer info
function populateModal(trainer) {
  modalName.textContent = `${trainer.firstName} ${trainer.lastName}`;
  modalTitle.textContent = trainer.title;
  modalCredentials.textContent = trainer.credentials;
  modalExperience.textContent = trainer.experience;
  modalSpecialties.textContent = trainer.specialties;
  modalBio.textContent = trainer.bio;

  // Badges
  modalBadges.innerHTML = "";
  if (trainer.badges && trainer.badges.length) {
    trainer.badges.forEach(badge => {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = badge;
      modalBadges.appendChild(span);
    });
  }

  // Gallery
  modalGallery.innerHTML = "";
  if (trainer.gallery && trainer.gallery.length) {
    modalNoPhotos.style.display = 'none';
    trainer.gallery.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${trainer.firstName} ${trainer.lastName} photo`;
      img.style.cursor = "pointer";
      img.addEventListener('click', () => window.open(src, '_blank'));
      modalGallery.appendChild(img);
    });
  } else {
    modalNoPhotos.style.display = 'block';
  }
}

// Event listeners for modal open and close
function openModal(trainerId) {
  const trainer = trainers[trainerId];
  if (!trainer) return;
  populateModal(trainer);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  sendHeightToParent();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  sendHeightToParent();
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// iframe auto-resize communication
function sendHeightToParent() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ iframeHeight: height }, '*');
}
sendHeightToParent();
window.addEventListener('resize', sendHeightToParent);

// Create trainer cards dynamically
const container = document.getElementById('trainerContainer');

for (const id in trainers) {
  const t = trainers[id];

  const card = document.createElement('div');
  card.classList.add('trainer-card');
  card.dataset.trainer = id;

  if (!t.gallery.length) card.classList.add('coming-soon');

  // Trainer photo or initials fallback
  const photoDiv = document.createElement('div');
  photoDiv.classList.add('trainer-photo');

  if (t.gallery.length) {
    const img = document.createElement('img');
    img.src = t.gallery[0];
    img.alt = `${t.firstName} ${t.lastName}`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "50%";
    photoDiv.appendChild(img);
  } else {
    const initials = `${t.firstName[0] || ''}${t.lastName[0] || ''}`.toUpperCase();
    photoDiv.textContent = initials;
  }

  // Name and title
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('trainer-name');
  nameDiv.textContent = `${t.firstName} ${t.lastName}`.trim();

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('trainer-title');
  titleDiv.textContent = t.title;

  card.append(photoDiv, nameDiv, titleDiv);

  // Open modal on card click
  card.addEventListener('click', () => openModal(id));

  container.appendChild(card);
}

