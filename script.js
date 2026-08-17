// List of team members with custom dossiers and descriptions
const players = [
  {
    name: '123456keean1',
    image: 'Images/Players/123456keean1.png',
    description: "One of the member's digital artist and secondary strategist who planned and contributed to the team's pre-game coordination and effort. This is also the person who developed this site to show off how cool Piss Skepter really is.",
    isGold: false
  },
  {
    name: 'A_noobtrooper',
    image: 'Images/Players/A_noobtrooper.png',
    description: "One of the best if not the greatest players to ever roam the blacksite and endured many obstacles up until the death of two teams. This person is a juggernaut and a warrior, determined to win and would choose the key instead of the bread.",
    isGold: true
  },
  {
    name: 'alcyine',
    image: 'Images/Players/alcyine.png',
    description: "Our member's most stylish and greatest team support to ever exist. Star is our member's core foundation helping Piss Skepter band together to become the great team that we are.",
    isGold: false
  },
  {
    name: 'LifeTT213',
    image: 'Images/Players/LifeTT213.png',
    description: "An experienced TBS leader who has helped hundreds if not thousands of people get the badge. Life is very great at leading and finding hiding spots to evade from big threats like Pandemonium or Chainsmoker. Life will always find a way to... be a-life",
    isGold: false
  },
  {
    name: 'Poached_Toasted',
    image: 'Images/Players/Poached_Toasted.png',
    description: "Despite the worries that Taph wouldn't be able to make it to the event, Taph eventually did and was able to endure the long stretch of walking through corridors of horror and chaos. Despite all the lag and circumstances. Taph remains undefeated",
    isGold: false
  },
  {
    name: 'Rainy283',
    image: 'Images/Players/Rainy283.png',
    description: "One of our team's greatest communicator. This absolute unit was able to blast through thousands of screams and confusion and paved a way so clear, we were able to walk like a giant candle guiding us to our victory",
    isGold: false
  },
  {
    name: 'itsyonichi',
    image: 'Images/Players/itsyonichi.png',
    description: "This is one of our newest members and absolute amazing replacement who is able to help with Piss Skepter's success",
    isGold: false
  },
  {
    name: 'lukeskywalker2371',
    image: 'Images/Players/lukeskywalker2371.png',
    description: "The second best communicator in this game who was able to be our lantern in a foggy dark room, this player is an absolute effective communicator and beast",
    isGold: false
  },
  {
    name: 'maitsuw',
    image: 'Images/Players/maitsuw.png',
    description: "One of the acended leaders who have lead many to victory and was one of the people who endured more than 70 doors leading to our team's success. Roslyakova is a leader who can push forward despite the chaos of a thousand footsteps and the hectic spawns of anglers.",
    isGold: false
  },
  {
    name: 'nyanpwa',
    image: 'Images/Players/nyanpwa.png',
    description: "The recruit and the OG. Reol is one of the founding members of Piss Skepter making this entire team built brick by brick like the pyramids of Giza. Reol's ability to find the most skilled people and the best survivors has made Reol a golden touch who makes everything into gold.",
    isGold: false
  },
  {
    name: 'probablyalienn',
    image: 'Images/Players/probablyalienn.png',
    description: "Our greatest support and our greatest morale booster. Probablyalien was able to push through so many doors without breaking a sweat making Piss Skepter glide like a surfer on a wave traversing the 50th door. While the rest were struggling, probablyalien pushed through regardless and made Piss Skepter a monumental team.",
    isGold: false
  },
  {
    name: 'smz2004',
    image: 'Images/Players/smz2004.png',
    description: "One of the Greatest of All Time. The team's champion, the team's hope and the team's shining light. SMZ pushed through every single door up until the very last breath of the final team remaining. SMZ is not only a hero or a icon but a symbol of sportsmanship and absolute endurance. Thank you for being part of Piss Skepter. Your absolute luck and skill is greatly appreciated and recognized.",
    isGold: true
  }
];

let currentIndex = 0;
let typewriterTimeout = null;

// DOM Elements - Main Page
const holoImage = document.getElementById('holoImage');
const holoMemberName = document.getElementById('holoMemberName');
const descriptionWrapper = document.getElementById('descriptionWrapper');
const typewriterText = document.getElementById('typewriterText');
const typingCursor = document.querySelector('.typing-cursor');

const playerCard = document.getElementById('playerCard');
const playerImage = document.getElementById('playerImage');
const playerName = document.getElementById('playerName');
const playerIndex = document.getElementById('playerIndex');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// DOM Elements - Loading Screen
const loadingScreen = document.getElementById('loadingScreen');
const loadingSilhouettes = document.getElementById('loadingSilhouettes');
const loadingBarFill = document.getElementById('loadingBarFill');
const loadingPercent = document.getElementById('loadingPercent');
const loadingStatus = document.getElementById('loadingStatus');

// -------------------------------------------------------------
// Loading Screen Animation (8 Seconds with Realistic Variable Pacing)
// -------------------------------------------------------------
function initLoadingScreen() {
  if (!loadingScreen || !loadingSilhouettes) {
    updatePlayer(0, false);
    return;
  }

  // Create silhouette items for each player
  players.forEach((player, idx) => {
    const item = document.createElement('div');
    item.className = 'silhouette-item';
    item.id = `sil-${idx}`;

    const img = document.createElement('img');
    img.src = player.image;
    img.alt = `${player.name} Silhouette`;
    img.className = 'silhouette-img';

    item.appendChild(img);
    loadingSilhouettes.appendChild(item);
  });

  const duration = 8000; // 8 seconds total
  const startTime = performance.now();
  let lastLoadedIdx = -1;

  // Waypoints for realistic pacing (timeFraction, targetPercentage)
  const waypoints = [
    { t: 0.00, p: 0 },
    { t: 0.08, p: 12 }, // quick initial burst
    { t: 0.18, p: 19 }, // slow handshake
    { t: 0.28, p: 38 }, // data surge
    { t: 0.42, p: 46 }, // steady slow crawl
    { t: 0.54, p: 68 }, // rapid downloading of assets
    { t: 0.68, p: 74 }, // brief hesitation/micro-pause
    { t: 0.80, p: 90 }, // second burst
    { t: 0.92, p: 96 }, // slow final integrity check
    { t: 1.00, p: 100 } // snap to completion
  ];

  function getRealisticPercent(timeFraction) {
    if (timeFraction <= 0) return 0;
    if (timeFraction >= 1) return 100;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const curr = waypoints[i];
      const next = waypoints[i + 1];
      if (timeFraction >= curr.t && timeFraction <= next.t) {
        const segProgress = (timeFraction - curr.t) / (next.t - curr.t);
        // Smooth interpolation within segment
        return curr.p + segProgress * (next.p - curr.p);
      }
    }
    return 100;
  }

  function updateLoading(currentTime) {
    const elapsed = currentTime - startTime;
    const timeFraction = Math.min(elapsed / duration, 1);
    const calculatedPercent = getRealisticPercent(timeFraction);
    const percent = Math.min(100, Math.floor(calculatedPercent));

    // Update progress bar and percent text
    if (loadingBarFill) loadingBarFill.style.width = `${percent}%`;
    if (loadingPercent) loadingPercent.textContent = `${percent}%`;

    // Calculate current silhouette index based on calculated percentage
    const currentSilhouetteIdx = Math.min(
      Math.floor((percent / 100) * players.length),
      players.length - 1
    );

    if (currentSilhouetteIdx > lastLoadedIdx && timeFraction < 1) {
      for (let i = lastLoadedIdx + 1; i <= currentSilhouetteIdx; i++) {
        const item = document.getElementById(`sil-${i}`);
        if (item) {
          item.classList.add('active-loading');
          if (loadingStatus) {
            loadingStatus.textContent = `SYNCING ${players[i].name.toUpperCase()}...`;
          }
          // Change previous items to loaded state
          if (i > 0) {
            const prevItem = document.getElementById(`sil-${i - 1}`);
            if (prevItem) {
              prevItem.classList.remove('active-loading');
              prevItem.classList.add('loaded');
            }
          }
        }
      }
      lastLoadedIdx = currentSilhouetteIdx;
    }

    if (timeFraction < 1) {
      requestAnimationFrame(updateLoading);
    } else {
      // Mark all silhouettes as loaded
      players.forEach((_, i) => {
        const item = document.getElementById(`sil-${i}`);
        if (item) {
          item.classList.remove('active-loading');
          item.classList.add('loaded');
        }
      });

      if (loadingStatus) loadingStatus.textContent = 'TEAM ROSTER READY';
      if (loadingPercent) loadingPercent.textContent = '100%';
      if (loadingBarFill) loadingBarFill.style.width = '100%';

      // Transition out loading screen
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Initialize first player with animation
        updatePlayer(0, false);
      }, 350);
    }
  }

  requestAnimationFrame(updateLoading);
}

// -------------------------------------------------------------
// Typewriter Description Effect
// -------------------------------------------------------------
function typeWriter(text, i = 0) {
  if (i === 0) {
    typewriterText.textContent = '';
    if (typingCursor) {
      typingCursor.classList.remove('finished');
    }
  }

  if (i < text.length) {
    typewriterText.textContent += text.charAt(i);
    // Variable typing cadence for natural typewriter feel
    const speed = text.charAt(i) === '.' || text.charAt(i) === ',' ? 60 : 18;
    typewriterTimeout = setTimeout(() => {
      typeWriter(text, i + 1);
    }, speed);
  } else {
    if (typingCursor) {
      typingCursor.classList.add('finished');
    }
  }
}

// -------------------------------------------------------------
// Player Carousel Update
// -------------------------------------------------------------
function updatePlayer(index, animate = true) {
  if (players.length === 0) return;

  // Clear active typing timer
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  // Wrap around index
  currentIndex = (index + players.length) % players.length;
  const player = players[currentIndex];

  // Update bottom carousel card
  if (animate) {
    playerCard.classList.add('fading');
    setTimeout(() => {
      playerImage.src = player.image;
      playerImage.alt = `${player.name} avatar`;
      playerName.textContent = player.name;
      playerIndex.textContent = `Member ${currentIndex + 1} of ${players.length}`;
      playerCard.classList.remove('fading');
    }, 120);
  } else {
    playerImage.src = player.image;
    playerImage.alt = `${player.name} avatar`;
    playerName.textContent = player.name;
    playerIndex.textContent = `Member ${currentIndex + 1} of ${players.length}`;
  }

  // Update gold glowing status
  if (player.isGold) {
    descriptionWrapper.classList.add('is-gold');
  } else {
    descriptionWrapper.classList.remove('is-gold');
  }

  // Update top holographic showcase
  holoMemberName.textContent = player.name;

  // Reset and trigger fast holographic appear animation
  holoImage.classList.remove('animating');
  // Trigger reflow to restart CSS animation cleanly
  void holoImage.offsetWidth;
  holoImage.src = player.image;
  holoImage.alt = `${player.name} Hologram`;
  holoImage.classList.add('animating');

  // Start smooth typewriter effect
  typeWriter(player.description, 0);
}

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');

    tabButtons.forEach((b) => b.classList.remove('active'));
    tabPanes.forEach((pane) => pane.classList.remove('active'));

    btn.classList.add('active');
    const targetPane = document.getElementById(`tab-${targetTab}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  });
});

// Event Listeners
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    updatePlayer(currentIndex - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    updatePlayer(currentIndex + 1);
  });
}

// Keyboard navigation (ArrowLeft and ArrowRight only while on Members tab)
document.addEventListener('keydown', (e) => {
  const membersTab = document.getElementById('tab-members');
  if (membersTab && membersTab.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      updatePlayer(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updatePlayer(currentIndex + 1);
    }
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
});

