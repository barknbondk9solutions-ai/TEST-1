(function() {
// =======================
// SETTINGS
// =======================
const settings = {
  testMode: false,
  emergencyActive: false,

  messages: {
    emergency: {
      text: `⚠️ IMPORTANT NOTICE ⚠️

Due to severe weather conditions, our operations are temporarily suspended. The safety and well-being of our clients, team members, and community remain our top priority. We will remain closed both during the hazardous conditions and throughout the recovery process that follows.

We will provide updates as soon as it is safe to reopen and resume regular services. In the meantime, we encourage everyone to take all necessary precautions and stay safe.

Thank you for your patience, understanding, and continued support.`,
      color: "#b91c1c",
      textColor: "#fff"
    },
    away: {
      text: "We’re on vacation! 🍁🎃 from October 25 to November 2, 2025. We’ll be back and ready to assist you on November 3rd!",
      color: "#0f172a",
      textColor: "#fff",
      startDateTime: "2025-10-01T00:00:00-04:00",
      endDateTime: "2025-11-02T23:59:59-04:00"
    }
  },

  customWeatherMessages: {
    "heat": { 
    text: "⚠️ HEAT ALERT ⚠️\n\n☀️ Adventure pups, beware—it's way too hot outside! 🌡️ Let’s stay busy indoors with treat scavenger hunts, tug-of-war, or learning some new tricks.", 
    color: "linear-gradient(90deg, #FF7F50, #FF4500)",
    textColor: "#ffffff" 
  },
  "thunderstorm": { 
    text: "⚠️ THUNDERSTORM ALERT ⚠️\n\n⛈️ Boom-booms in the sky! Thunderstorms might be nearby, so pups should stay cozy and safe indoors. Calm games like puzzle toys, hide-and-seek, or gentle obedience activities can keep their minds busy and spirits up.", 
    color: "linear-gradient(90deg, #FF8C00, #FFB300)",
    textColor: "#000000" 
  },
  "tornado": { 
    text: "⚠️ TORNADO ALERT ⚠️\n\n🌪️ Whoa—big winds are rolling through! Tornado activity is nearby, so pups are on indoor adventure duty today. Mini agility courses, hide-and-seek, or zoomies in safe spaces keep tails wagging!", 
    color: "linear-gradient(90deg, #CC0000, #FF4500)",
    textColor: "#ffffff" 
  },
  "hurricane": { 
    text:  "⚠️ HURRICANE ALERT ⚠️\n\n🌀 Stormy snuggles incoming!! High winds and heavy rain mean pups are staying indoors today. Interactive toys, memory games, or some clicker training keep tails wagging while the storm passes!", 
    color: "linear-gradient(90deg, #FF69B4, #FF1493)",
    textColor: "#ffffff" 
  },
  "tropical storm": { 
    text: "⚠️ TROPICAL STORM ALERT ⚠️\n\n🌀 Who turned on the giant sprinkler? Tropical storm’s in town! Better to stay cozy inside and try new tricks, fetch toys by name, or short indoor scent trails.", 
    color: "linear-gradient(90deg, #FF69B4, #FF1493)",
    textColor: "#ffffff" 
  },
  "flood": { 
    text: "⚠️ FLOOD ALERT ⚠️\n\n🌊 Splish splash! It's flooded outside, so pups are on indoor adventure duty. Stay high and dry while chasing balls, tugging ropes, or conquering mini obstacle courses.",
    color: "linear-gradient(90deg, #1E40AF, #2563EB)",
    textColor: "#ffffff" 
  },
  "high wind": { 
    text: "⚠️ HIGH WIND ALERT ⚠️\n\n💨 Flying fur and flying hats! Gusty winds outside make outdoor activities risky, so dogs should stay inside. They can play 'find the treat', use DIY agility tunnels, or practice fun obedience commands.", 
    color: "linear-gradient(90deg, #0D9488, #14B8A6)",
    textColor: "#ffffff" 
  },
  "air quality": { 
    text: "⚠️ AIR QUALITY ALERT ⚠️\n\n🌫️ Smoggy skies today! Time to turn the living room into a doggy adventure zone. Puzzle feeders, hidden treats, and silly training games will keep pups entertained while staying safe indoors.", 
    color: "linear-gradient(90deg, #A855F7, #9333EA)",
    textColor: "#ffffff" 
  },
  "high uv index": { 
    text: "⚠️ HIGH UV INDEX ALERT ⚠️\n\n☀️ Sun’s blasting the paws today! Extreme UV means dogs should skip outdoor walks. They can play scent games, enjoy gentle tug, or learn new tricks indoors.", 
    color: "linear-gradient(90deg, #FF8C00, #FF6F00)",
    textColor: "#ffffff" 
  },
  "smoke": { 
    text: "⚠️ SMOKE ALERT ⚠️\n\n🔥 Smoke in the air! Time to turn the living room into a puppy playground. Short training sessions, interactive toy play, or indoor fetch will keep the pups happy and safe.", 
    color: "linear-gradient(90deg, #8B4513, #A0522D)",
    textColor: "#ffffff"}
  },

  clearWeatherMessages: [
    "☀️ It's a beautiful clear day!",
    "🌞 Clear skies and sunshine!",
    "🌤️ Enjoy the calm weather!"
  ],

  nightWeatherMessages: [
    "🌙 Clear and calm tonight.",
    "🌌 A peaceful night sky.",
    "🛌 Great night to sleep in."
  ],

  holidayMessages: {
    Christmas: ["🎄 Merry Christmas!", "🎁 Happy Holidays!"],
    "New Year": ["🎉 Happy New Year!", "🥂 Cheers to 2025!"]
  },

  holidayGradients: [
    { name: "Christmas", startDate: "2025-12-24", endDate: "2025-12-26", gradient: "linear-gradient(90deg, #d32f2f, #388e3c)", textColor: "#fff" },
    { name: "New Year", startDate: "2025-12-31", endDate: "2026-01-01", gradient: "linear-gradient(90deg, #2196f3, #fbc02d)", textColor: "#000" }
  ],

  specialEventMessages: {
    "Dog Show": ["🐶 Dog Show Today!", "🐾 Come meet the pups!"],
    "Art Fair": ["🎨 Art Fair Ongoing!", "🖼️ Visit local artists!"]
  },

  specialEventGradients: [
    { name: "Dog Show", startDate: "2025-10-01", endDate: "2025-10-01", gradient: "linear-gradient(90deg, #ff9800, #fff3e0)", textColor: "#000" },
    { name: "Art Fair", startDate: "2025-10-15", endDate: "2025-10-16", gradient: "linear-gradient(90deg, #8e24aa, #ce93d8)", textColor: "#fff" }
  ]
};

// =======================
// DOM REFERENCES
// =======================
const container = document.getElementById("banner-container");
let banner = null;

// =======================
// UTILITY FUNCTIONS
// =======================
let bannerIndex = 0;
let bannerQueue = [];

function createBanner() {
  if (banner) banner.remove();
  banner = document.createElement("div");
  banner.className = "announcement-banner";
  banner.style.display = "none";
  const p = document.createElement("p");
  banner.appendChild(p);
  container.appendChild(banner);
  return banner;
}

function setBannerContent(text, background, textColor) {
  banner.querySelector("p").textContent = text;
  banner.style.background = background;
  banner.querySelector("p").style.color = textColor;
  banner.style.display = "block";
  adjustContentPadding();
  syncHeaderFooterColors(background, textColor);
}

function adjustContentPadding() {
  const height = banner ? banner.offsetHeight : 0;
  const content = document.getElementById("page-content") || document.body;
  content.style.paddingTop = `${height}px`;
}

function syncHeaderFooterColors(bg, color) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const nav = document.querySelector(".nav-bar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links"); // added

  [header, footer, nav, navLinks].forEach(el => {
    if (!el) return;
    el.style.background = bg;
    el.style.color = color;
    el.querySelectorAll("*").forEach(child => {
      child.style.color = color;
      child.style.borderColor = color;
      if (["svg", "path"].includes(child.tagName.toLowerCase())) {
        child.style.fill = color;
        child.style.stroke = color;
      }
    });
    el.style.setProperty("--pseudo-color", color);
  });

  if (hamburger) {
    hamburger.style.color = color;
    hamburger.style.borderColor = color;
    hamburger.querySelectorAll("*").forEach(child => {
      child.style.color = color;
      child.style.fill = color;
      child.style.stroke = color;
    });
  }
}

function getGradientForDate(gradients) {
  const now = new Date();
  return gradients.find(({ startDate, endDate }) => {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59`);
    return now >= start && now <= end;
  });
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
  
function getSeason() {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
  if (month >= 2 && month <= 4) {
    return "spring";
  } else if (month >= 5 && month <= 7) {
    return "summer";
  } else if (month >= 8 && month <= 10) {
    return "fall";
  } else {
    return "winter";
  }
}

// =======================
// SUNRISE/SUNSET
// =======================
let sunriseEST = null;
let sunsetEST = null;

async function fetchSunTimes() {
  try {
    const res = await fetch("https://api.sunrise-sunset.org/json?lat=25.7617&lng=-80.1918&formatted=0");
    const data = await res.json();
    if (data.status === "OK") {
      sunriseEST = new Date(new Date(data.results.sunrise).toLocaleString("en-US", { timeZone: "America/New_York" }));
      sunsetEST = new Date(new Date(data.results.sunset).toLocaleString("en-US", { timeZone: "America/New_York" }));
    }
  } catch (err) {
    console.error("Sunrise/Sunset fetch error:", err);
  }
}

function isDaytimeEST() {
  if (!sunriseEST || !sunsetEST) return true; // default daytime
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  return now >= sunriseEST && now < sunsetEST;
}

fetchSunTimes();
setInterval(fetchSunTimes, 86400000); // refresh every day

// =======================
// WEATHER ALERTS
// =======================
let activeAlerts = new Map();

async function fetchWeatherAlerts() {
  activeAlerts.clear();

  if (settings.testMode) {
    Object.entries(settings.customWeatherMessages).forEach(([type]) => {
      activeAlerts.set(type, ["Miami-Dade"]);
    });
    return;
  }

  try {
    const res = await fetch("https://api.weather.gov/alerts/active?area=FL");
    const data = await res.json();

    const validEvents = Object.keys(settings.customWeatherMessages);
    const relevantCounties = ["Miami-Dade", "Broward", "Monroe"];
    const allowedSeverities = ["Unknown", "Minor", "Moderate", "Severe", "Extreme"];

    data.features.forEach(alert => {
      const p = alert.properties;

      // Only process alerts with allowed severities and relevant counties
      if (
        p.status === "Actual" &&
        p.messageType === "Alert" &&
        allowedSeverities.includes(p.severity) &&
        relevantCounties.some(c => p.areaDesc.includes(c)) &&
        validEvents.some(e => p.event.toLowerCase().includes(e.toLowerCase()))
      ) {
        // Find the matching event key
        const eventType = validEvents.find(ev => p.event.toLowerCase().includes(ev.toLowerCase()));
        if (eventType) {
          // Use a Set to keep unique counties
          let countiesSet = new Set(activeAlerts.get(eventType) || []);
          p.areaDesc.split(";").forEach(c => {
            const trimmed = c.trim();
            if (relevantCounties.includes(trimmed)) {
              countiesSet.add(trimmed);
            }
          });
          // Convert back to array for storage
          activeAlerts.set(eventType, Array.from(countiesSet));
        }
      }
    });
  } catch (e) {
    console.error("Error fetching weather alerts:", e);
  }
}

// =======================
// DISPLAY PRIORITY CHECK
// =======================

async function updateBanner() {
  if (!banner) createBanner();

  // 1️⃣ Emergency Active
  if (settings.emergencyActive) {
    const em = settings.messages.emergency;
    setBannerContent(em.text, em.color, em.textColor);
    return;
  }

  // 2️⃣ Timed "Away" message
  const now = new Date();
  const away = settings.messages.away;
  if (away.startDateTime && away.endDateTime) {
    const start = new Date(away.startDateTime);
    const end = new Date(away.endDateTime);
    if (now >= start && now <= end) {
      setBannerContent(away.text, away.color, away.textColor);
      return;
    }
  }

  // 3️⃣ Special Event Gradient
  const special = getGradientForDate(settings.specialEventGradients);
  if (special) {
    const msg = settings.specialEventMessages[special.name]?.[0] || "🎉 Special Event!";
    setBannerContent(msg, special.gradient, special.textColor);
    return;
  }

  // 4️⃣ Weather Alerts
await fetchWeatherAlerts();

if (activeAlerts.size > 0) {
  const alertsArray = Array.from(activeAlerts.entries());

  let bannerIndex = 0;

  const showBanner = (index) => {
    const [type, counties] = alertsArray[index];
    const msgData = settings.customWeatherMessages[type];
    const countiesAffected = counties.length ? counties.join(", ") : "your area";
    const textColor = msgData.textColor || getTextColor(msgData.color || "#000");

    if (!banner) createBanner();

    banner.querySelector("p").innerHTML = `
      ${msgData.text}
      <span style="display:block; margin-top: 10px;">🚨 Advisory for: ${countiesAffected} 🚨</span>
    `;
    banner.style.background = msgData.color;
    banner.querySelector("p").style.color = textColor;
    banner.style.display = "block";
    adjustContentPadding();
    syncHeaderFooterColors(msgData.color, textColor);
  };

  // Initial banner display
  showBanner(bannerIndex);

  // Enable cycling if multiple alerts
  if (alertsArray.length > 1) {
    container.addEventListener("click", () => {
      bannerIndex = (bannerIndex + 1) % alertsArray.length;
      showBanner(bannerIndex);
    });
  }
  return;
}


  // 5️⃣ Holiday Gradient
  const holiday = getGradientForDate(settings.holidayGradients);
  if (holiday) {
    const msgs = settings.holidayMessages[holiday.name] || ["🎉 Happy Holidays!"];
    setBannerContent(getRandomFromArray(msgs), holiday.gradient, holiday.textColor);
    return;
  }

  // 6️⃣ Clear / Night default messages
  const isDay = isDaytimeEST();
const season = getSeason();

const messagesPool = isDay
  ? settings.clearWeatherMessages
  : settings.nightWeatherMessages;

let bg;

// 🌦️ Choose gradient based on season and time of day
switch (season) {
  case "spring":
    bg = isDay
      ? "linear-gradient(90deg, #81c784, #aed581)"   // Light greens
      : "linear-gradient(90deg, #33691e, #558b2f)";   // Darker greens
    break;
  case "summer":
    bg = isDay
      ? "linear-gradient(90deg, #4fc3f7, #81d4fa)"    // Bright blues
      : "linear-gradient(90deg, #01579b, #0288d1)";   // Deep blues
    break;
  case "fall":
    bg = isDay
      ? "linear-gradient(90deg, #ffb74d, #ff8a65)"    // Orange tones
      : "linear-gradient(90deg, #e65100, #bf360c)";   // Deep autumn colors
    break;
  case "winter":
    bg = isDay
      ? "linear-gradient(90deg, #90caf9, #e3f2fd)"    // Frosty blues
      : "linear-gradient(90deg, #1a237e, #0d47a1)";   // Cold night blues
    break;
}

const textColor = "#fff";
setBannerContent(getRandomFromArray(messagesPool), bg, textColor);
}

// Initial call and setup interval
updateBanner();
setInterval(updateBanner, settings.testMode ? 10000 : 10000);

// ===========================
// FULL PAGE BLUR OVERLAY
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const banner = document.getElementById("banner-container");
  const pageContent = document.getElementById("page-content");

  // Create overlay
  const blurOverlay = document.createElement("div");
  blurOverlay.id = "blur-overlay";
  Object.assign(blurOverlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    zIndex: "998", // just below nav and banner
    pointerEvents: "none", // click passes through
    opacity: "0",
    transition: "opacity 0.25s ease"
  });
  document.body.appendChild(blurOverlay);

  function toggleOverlay(show) {
    blurOverlay.style.opacity = show ? "1" : "0";
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const isOpen = navLinks.classList.contains("active");
      toggleOverlay(isOpen);
    });
  }

  // Optional: hide overlay if clicking outside nav
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && e.target !== hamburger) {
      navLinks.classList.remove("active");
      toggleOverlay(false);
    }
  });

  // Adjust overlay on resize
  window.addEventListener("resize", () => {
    blurOverlay.style.width = `${window.innerWidth}px`;
    blurOverlay.style.height = `${window.innerHeight}px`;
  });
});

// =======================
// TEST MODE CYCLE (Optional)
// =======================
if (settings.testMode) {
  let testIndex = 0;
  const testBanners = [
    { text: settings.messages.emergency.text, color: settings.messages.emergency.color, textColor: settings.messages.emergency.textColor },
    ...Object.values(settings.customWeatherMessages).map(m => ({ text: m.text, color: m.color, textColor: "#fff" })),
    ...settings.clearWeatherMessages.map(msg => ({ text: msg, color: "linear-gradient(90deg, #4caf50, #81c784)", textColor: "#fff" })),
    ...Object.values(settings.specialEventMessages).flatMap(arr => arr.map(text => ({ text, color: "#000", textColor: "#fff" }))),
    ...Object.values(settings.holidayMessages).flatMap(arr => arr.map(text => ({ text, color: "#000", textColor: "#fff" })))
  ];

  function cycleTestBanners() {
    const b = testBanners[testIndex];
    if (!banner) createBanner();
    setBannerContent(b.text, b.color, b.textColor);
    testIndex = (testIndex + 1) % testBanners.length;
  }

  setInterval(cycleTestBanners, 10000);
  container.addEventListener("click", cycleTestBanners);
}
  })();

(function() {
  const body = document.body;

  // Create full-page overlay that hides content on forbidden actions
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    opacity: '1',
    color: '#fff',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    userSelect: 'none',
    cursor: 'not-allowed',
    visibility: 'hidden',
  });
  overlay.innerText = "Property of BarkNBondK9Solutions,LLC";
  document.body.appendChild(overlay);

  function showOverlay() {
    overlay.style.visibility = 'visible';
    body.classList.add('blur-page');
    body.style.pointerEvents = 'none';
  }

  function hideOverlay() {
    overlay.style.visibility = 'hidden';
    body.classList.remove('blur-page');
    body.style.pointerEvents = 'auto';
  }

  // Disable right-click globally
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable text selection via event (extra precaution)
  document.addEventListener('selectstart', e => e.preventDefault());

  // Disable copy, cut, paste, dragstart events
  ['copy', 'cut', 'paste', 'dragstart'].forEach(evt =>
    document.addEventListener(evt, e => {
      e.preventDefault();
      if (evt === 'copy') alert('Copying is disabled on this site.');
    })
  );

  // Block key combos including print and devtools shortcuts
  document.addEventListener('keydown', e => {
    const blockedKeys = ['c', 'x', 'v', 'p', 's', 'a', 'u'];
    if ((e.ctrlKey || e.metaKey) && blockedKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase()))
    ) {
      e.preventDefault();
      showOverlay();
    }
  });

  // Blur and overlay on tab/window blur or visibility hidden
  window.addEventListener('blur', showOverlay);
  window.addEventListener('focus', hideOverlay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) showOverlay();
    else hideOverlay();
  });

  // Prevent multitouch gestures (pinch zoom)
  document.addEventListener('touchstart', e => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });
  document.addEventListener('gesturestart', e => e.preventDefault());

// Disable touchstart on all images, including dynamically added
function blockTouchOnImages() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('touchstart', e => e.preventDefault());
  });
}
blockTouchOnImages();
new MutationObserver(blockTouchOnImages).observe(document.body, { childList: true, subtree: true });

document.addEventListener("contextmenu", function(e) {
  if (e.target.tagName === "IMG") {
      e.preventDefault();
  }
});
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("touchstart", e => {
    e.preventDefault();
  });
});  

})();
