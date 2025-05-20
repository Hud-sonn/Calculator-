// ======= THEME TOGGLE =======
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'light') {
  html.setAttribute('data-theme', 'light');
} else {
  html.setAttribute('data-theme', 'dark');
}

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ======= SEARCH FUNCTIONALITY =======
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('[data-title]');
  cards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
});

// ======= PROFILE DATA LOAD =======
document.addEventListener('DOMContentLoaded', () => {
  const nameField = document.getElementById('profileName');
  const nameInput = document.getElementById('nameInput');
  const avatarImg = document.getElementById('avatarImg');
  const avatarInput = document.getElementById('avatarInput');

  // Load saved name
  if (nameField) nameField.textContent = localStorage.getItem('userName') || 'User123';
  if (nameInput) nameInput.value = localStorage.getItem('userName') || '';

  // Load avatar
  const savedAvatar = localStorage.getItem('avatar');
  if (savedAvatar && avatarImg) avatarImg.src = savedAvatar;

  // Save new name
  document.getElementById('saveName')?.addEventListener('click', () => {
    const newName = nameInput.value;
    localStorage.setItem('userName', newName);
    nameField.textContent = newName;
    alert('Name updated!');
  });

  // Avatar bounce + save
  avatarInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      avatarImg.src = event.target.result;
      localStorage.setItem('avatar', event.target.result);
      avatarImg.classList.add('animate-bounce');
      setTimeout(() => avatarImg.classList.remove('animate-bounce'), 800);
    };
    if (file) reader.readAsDataURL(file);
  });
});
function getWatchlist() {
  return JSON.parse(localStorage.getItem("animeWatchlist")) || [];
}

function saveWatchlist(list) {
  localStorage.setItem("animeWatchlist", JSON.stringify(list));
}

function toggleWatchlist(button) {
  const title = button.dataset.title;
  let watchlist = getWatchlist();

  if (watchlist.includes(title)) {
    watchlist = watchlist.filter(item => item !== title);
    button.textContent = "+ Watchlist";
    button.classList.remove("bg-red-600");
    button.classList.add("bg-green-600");
  } else {
    watchlist.push(title);
    button.textContent = "✓ Added";
    button.classList.remove("bg-green-600");
    button.classList.add("bg-red-600");
  }

  saveWatchlist(watchlist);
}

// Optional: highlight added anime on page load
document.addEventListener("DOMContentLoaded", () => {
  const watchlist = getWatchlist();
  document.querySelectorAll(".watchlist-btn").forEach(btn => {
    if (watchlist.includes(btn.dataset.title)) {
      btn.textContent = "✓ Added";
      btn.classList.remove("bg-green-600");
      btn.classList.add("bg-red-600");
    }
  });
  function toggleWatchlist(button) {
  const title = button.dataset.title;
  let watchlist = getWatchlist();

  if (!watchlist.includes(title)) {
    watchlist.push(title);
    saveWatchlist(watchlist);
    button.textContent = "✓ Added";
    button.classList.remove("bg-green-600");
    button.classList.add("bg-red-600");
    showPopup();
  } else {
    watchlist = watchlist.filter(item => item !== title);
    saveWatchlist(watchlist);
    button.textContent = "+ Watchlist";
    button.classList.remove("bg-red-600");
    button.classList.add("bg-green-600");
  }
}

function showPopup() {
  document.getElementById("watchlistPopup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("watchlistPopup").classList.add("hidden");
}

function goToWatchlist() {
  window.location.href = "watchlist.html"; // Adjust if your path is different
}
});
