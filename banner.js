document.addEventListener("DOMContentLoaded", function() {

  const settings = {
    testMode: true, // true = simulate weather alerts, false = live data
    emergencyActive: false, // set to true to activate emergency banner
    messages: [
      { type: "emergency", text: "⚠️ IMPORTANT NOTICE ⚠️\n\nDue to severe weather conditions, our operations are temporarily suspended. The safety and well-being of our clients, team members, and community remain our top priority. We will remain closed both during the hazardous conditions and throughout the recovery process that follows.\n\nWe will provide updates as soon as it is safe to reopen and resume regular services. In the meantime, we encourage everyone to take all necessary precautions and stay safe.\n\nThank you for your patience, understanding, and continued support.", color: "#b91c1c" },
      { type: "away", text: "We’re on vacation! 🍁🎃 from October 25 to November 2, 2025. We’ll be back and ready to assist you on November 3rd!", color: "#0f172a", textColor: "#ffffff", startDateTime: "2025-10-01T00:00:00-04:00", endDateTime: "2025-11-02T23:59:59-04:00" },
      { type: "promo", text: "🎉 Special Offer: 10% Off! 🎉\nText BARK1561 to (833) 658-4388 to receive 10% off!", color: "#0f172a", textColor: "#ffffff", startDateTime: "2025-08-22T00:00:00-04:00", endDateTime: "2025-08-31T23:59:59-04:00" },
      { type: "promo", text: "🍎 Fall Training Special! Strengthen obedience & manners before the busy holiday season. Book now for priority scheduling!", color: "#d97706", textColor: "#ffffff", startDateTime: "2025-10-15T00:00:00-04:00", endDateTime: "2025-10-30T23:59:59-04:00" },
      { type: "promo", text: "❄️ Winter Training Boost! Keep your pup’s mind active indoors with focused obedience sessions. Limited spots available!", color: "#1976D2", textColor: "#ffffff", startDateTime: "2025-12-01T00:00:00-05:00", endDateTime: "2025-12-31T23:59:59-05:00" },
      { type: "promo", text: "🌸 Spring Into Training! Warmer days mean more adventures—make sure your pup listens when it matters most.", color: "#4CAF50", textColor: "#ffffff", startDateTime: "2026-03-01T00:00:00-05:00", endDateTime: "2026-03-31T23:59:59-04:00" },
      { type: "promo", text: "☀️ Summer Skills! From leash manners to off-leash recall, get your dog ready for travel, BBQs, and outdoor fun.", color: "#FF9800", textColor: "#ffffff", startDateTime: "2026-06-01T00:00:00-04:00", endDateTime: "2026-06-30T23:59:59-04:00" },
      { type: "donation", text: "🇺🇸 September Give-Back in Honor of 9/11 🇺🇸\n\nWe will donate 5% of all training package enrollments to Tunnel to Towers Foundation.", color: "linear-gradient(90deg, #000000, #4F4F4F)", textColor: "#ffffff", startDateTime: "2026-09-01T00:00:00-04:00", endDateTime: "2026-09-10T23:59:59-04:00" },
      { type: "donation", text: "🇺🇸 September Give-Back in Honor of 9/11 🇺🇸\n\nWe will donate 5% of all training package enrollments to Tunnel to Towers Foundation.", color: "linear-gradient(90deg, #000000, #4F4F4F)", textColor: "#ffffff", startDateTime: "2026-09-12T00:00:00-04:00", endDateTime: "2026-09-30T23:59:59-04:00" }
    ]
  };
  const customWeatherMessages = {
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
    textColor: "#ffffff" 
  }
};

  const clearWeatherMessages = [
    "🌤️ Paws up! The skies are clear—perfect time for zoomies and training fun! ",
    "🌞 Sunny skies! Great day for practicing recall, leash manners, or outdoor tricks. ",
    "🐩 Clear weather alert! Use this paw-some day for obedience drills or fun games. ",
    "🌤️ Training time! Perfect opportunity for short training sessions outdoors mental exercises. ",
    "☀️ Skies are clear! Work on sit, stay, and paw skills with your furry friend today. ",
    "🐾 Blue skies ahead! A paw-fect chance for outdoor play and structured training. ",
    "🌈 Sunshine vibes! Great moment to mix training drills with some fun fetch. ",
    "🐕 Clear day! Perfect time to reinforce commands and bond with your pup. ",
    "🌞 Bright skies today! Use it for leash walking practice or recall games. ",
    "🐶 Happy tails wag in this weather! Try confidence-building exercises outside. ",
    "🌤️ Ideal conditions for a training refresher—short, fun, and rewarding! ",
    "☀️ Sunshine alert! Keep training light and playful while enjoying the fresh air. ",
    "🐕‍🦺 Great weather for teamwork—practice focus and attention exercises outdoors. ",
    "🌞 A sunny day to celebrate progress! Mix training with play for a balanced session. "

  ];

const nightWeatherMessages = [
  "🌙 Good evening, pups! A peaceful night is great for relaxed indoor obedience practice.",
  "⭐ Under the stars! Wind down with gentle focus games and calming activities.",
  "🌌 Nighttime calm! Try quiet nosework or confidence-boosting exercises before bed.",
  "🌙 Evening time! The perfect moment for slow leash walks and bonding together.",
  "🛏️ Bedtime prep: keep training short, calm, and rewarding before sleep.",
  "✨ A quiet night calls for soft commands and easy recall practice indoors.",
  "🌠 Starry skies set the mood for relaxed cuddle sessions and light training.",
  "🌙 Slow down the day with leash manners practice on a short evening stroll.",
  "🌌 Night is ideal for puzzle feeders or gentle enrichment before bedtime.",
  "🛏️ Practice a calm ‘settle’ command to help pups ease into a restful night.",
  "⭐ End the day with soothing massage or gentle brushing for bonding time.",
  "🌙 Evening quiet time: review simple cues like ‘sit’ and ‘stay’ with rewards.",
  "🌠 Use calm scent games to relax the mind and prepare for bedtime.",
  "✨ Keep it cozy—soft training, low voices, and lots of praise before sleep."
];

const holidayMessages = {
  "Halloween": [
    "🎃 Happy Howl-o-ween! May your pup be the cutest pumpkin on the block.",
    "👻 Dogs don’t believe in ghosts… unless it’s the vacuum cleaner. 🐾",
    "🦇 Fang-tastic news: your dog has already claimed all the treats. Sorry kids!",
    "🕸️ Web of lies: your dog swore they wouldn’t steal candy…",
    "🍬 Reminder: your pup will 100% sniff out the candy stash before the kids do.",
    "🧛 Your dog doesn’t sparkle like Twilight, but they do zoomie like midnight vampires.",
    "🧟 Don’t fear zombies — fear the squeaky toy at 3AM.",
    "🌙 If your dog howls at the moon tonight, just join in. It’s polite.",
    "🎭 Dogs in costumes: 10/10 adorable, 0/10 dignity.",
    "💀 Skeleton fact: your dog still thinks the mailman is scarier.",
    "🎃 Spooky season is here — your dog already auditioned to be the Headless Chewman."
  ],
  "Thanksgiving": [
    "🦃 Gobble til you wobble — your dog’s been practicing all year.",
    "🥧 Dogs can’t have pie, but they will absolutely judge you while you eat it.",
    "🍂 If your dog could talk, their Thanksgiving speech would just be: ‘food, now.’",
    "🍗 Turkey carving soundtrack = one very intense drool orchestra.",
    "🛋️ Couch patrol: your dog is thankful for leftovers (they’re sure they’re getting some).",
    "🥦 The dog says: keep your green beans, pass the gravy.",
    "🙌 Don’t forget to list your dog when saying what you’re thankful for (they’re listening).",
    "🦴 Turkey leg? Nah, your dog wants the whole bird.",
    "🕯️ Thanksgiving vibes: family chaos, food smells, and a dog under the table.",
    "🦃 Breaking news: the dog won the wishbone. They wished for more turkey.",
    "🍽️ Black Friday plan? Your dog’s hitting the leftovers aisle first."
  ],
  "Christmas": [
    "🎄 O Christmas Tree… O chew toy just waiting to happen.",
    "🎁 Your dog thinks every gift is for them. They’re not wrong.",
    "⛄ Snow? Your dog calls it zoomie fuel.",
    "✨ Naughty list? Your dog ate it. Can’t prove anything now.",
    "🍪 Santa’s cookies? Consider them rebranded as dog biscuits.",
    "🦌 Reindeer games? Nah, it’s just fetch with antlers.",
    "🎶 Bark the herald angels sing (loudly, at 2AM).",
    "📸 Matching holiday pajamas? Your dog did not sign up for this.",
    "❄️ Let it snow… but not on the fresh groom, please.",
    "🎅 Santa Paws is real. He’s just covered in fur and already on your couch.",
    "🎀 Breaking ornaments? Nope — just your dog’s new holiday tradition."
  ],
  "ChristmasEve": [
    "🎄 Santa’s almost here! Your dog is on toy surveillance.",
    "🦌 Reindeer inspection: passed with zoomies.",
    "🍪 Cookies for Santa? Dog approves… mostly eats them.",
    "🎁 Wrapping paper chaos: tail wag included.",
    "🐶 Secret elf missions: chew socks, hide treats.",
    "✨ Holiday magic: sniff, nap, repeat.",
    "📸 Photo-ready? Only if there’s bacon involved.",
    "💫 Tree inspection: branch climbing optional.",
    "🥂 Pup toast: Merry Christmas Eve, with extra tail wags.",
    "🎉 Countdown to treats begins… now!"
  ],
  "NewYear": [
    "✨ New year, same dog, bigger zoomies.",
    "🥂 Midnight kisses? Your dog is drooling on your face anyway.",
    "🎆 Boom-booms in the sky? Your dog votes NOPE.",
    "📅 Resolution #1: steal socks. Resolution #2: repeat.",
    "🎉 Your dog’s only goal for 2025: more belly rubs.",
    "🍾 Champagne showers? Nah, your dog prefers slobber showers.",
    "⏰ New year, new bark schedule — starting at 6AM sharp.",
    "💫 Your dog says forget ‘new year, new me’ — they’re already perfect.",
    "🎊 Party hat? More like chew toy with elastic.",
    "🥳 Pupdate: the dog crashed the countdown party… literally onto the snacks.",
    "📣 New Year’s motto according to your dog: eat more, bark louder, nap harder."
  ],
  "NewYearsEve": [
    "🎉 Ready or not, zoomies at midnight!",
    "🥂 Pup toast: sniff, drool, repeat.",
    "🎆 Fireworks incoming… couch is officially claimed.",
    "📅 Resolution prep: chew all new toys.",
    "🕛 Midnight paw-kisses for everyone.",
    "🍾 Dog-approved snacks only.",
    "⏰ New nap spots discovered at 12:01AM.",
    "💫 Pup says: 'Same me, just shinier.'",
    "🎊 Party hat or chew toy? Chew toy wins.",
    "🥳 Confetti attack! Your dog’s tail is a cannon.",
    "📣 Motto: wag, snack, nap, repeat!"
  ],
  "ValentinesDay": [
    "❤️ Roses are red, violets are blue, your dog just ate your Valentine’s shoe.",
    "💘 Your dog’s love language: belly rubs and snacks.",
    "🍫 Chocolates? Nope. Pup prefers peanut butter forever.",
    "🐾 True love = nose boops and slobbery kisses.",
    "💌 Cupid called, he said your dog stole all the arrows (and the treats).",
    "🌹 Forget flowers, give your dog a squeaky toy bouquet.",
    "💝 Who needs a Valentine when you have a dog that follows you to the bathroom?",
    "💕 Your dog’s heart belongs to… whoever has the food.",
    "🥂 Romantic dinner? Expect a third wheel under the table.",
    "🐶 Love is patient, love is kind… unless you’re late with dinner.",
    "💖 Cupid’s real form? Definitely covered in fur and shedding on your couch."
  ],
  "StPatricksDay": [
    "🍀 Luck of the Irish? More like luck of the doggo.",
    "💚 Your dog’s already wearing green — it’s called grass stains.",
    "🍺 Green beer for you, green slobber for everyone else.",
    "🌈 Found gold at the end of the rainbow: it was your dog’s hidden toy stash.",
    "🎩 Leprechaun spotted! Oh wait, just your pup in a tiny hat.",
    "🐾 No pinching — dog fur counts as green outfit.",
    "🍀 Your dog is the four-leaf clover you actually needed.",
    "😂 Legend says a leprechaun granted your pup infinite zoomies.",
    "🥔 Potatoes are Irish, but your dog already stole the mashed ones.",
    "🍻 Irish jig? More like tail-wag dance-off.",
    "🌈 Rainbow chaser? Nope, just your dog chasing their own tail."
  ],
  "Easter": [
    "🐰 Your dog saw the Easter Bunny and challenged it to a zoomie race.",
    "🥚 Easter eggs? Your pup’s more into egg-shaped tennis balls.",
    "🍫 Reminder: chocolate is for you, not the floofy one staring at you.",
    "🌸 Spring flowers: beautiful, but also apparently chewable.",
    "🐣 Your dog thinks every egg hunt should include treats for them too.",
    "🐾 The real Easter basket = your dog’s toy box.",
    "💐 Cute photoshoot? Your dog is already eating the props.",
    "🎀 Peeps? Your pup says marshmallows don’t squeak — 0/10.",
    "🐇 Every bunny needs some-bunny… your dog chooses you.",
    "🌼 Dogs don’t care about egg hunts, but they’ll sniff out every single snack.",
    "🥕 Bunny snacks? Your dog’s stealing the carrots instead."
  ],
  "FourthOfJuly": [
    "🎆 Boom-booms in the sky! Your dog just noped under the couch.",
    "🇺🇸 Stars, stripes, and zoomies.",
    "🍔 Your dog considers BBQ smoke the best perfume.",
    "🧨 Fireworks? No thanks. Hot dogs? Yes, please.",
    "🎇 Forget sparklers — your dog is the brightest spark around.",
    "🌭 4th of July rule: one hot dog for you, three begging stares from them.",
    "🦅 Bald eagle? Nah, just your dog with their ears flapping in the wind.",
    "🍉 Watermelon? Your pup’s already drooling for it.",
    "🎉 Independence Day = your dog declaring independence from baths.",
    "🛶 Lake trip? Your dog’s cannonball entry is now a national holiday.",
    "🧢 Red, white, and chewed — your dog already stole the picnic hat."
  ],
  "MothersDay": [
    "💐 Happy Mother’s Day! Your dog thinks you’re pawsitively amazing.",
    "🐾 Best mom ever? According to your dog, yes… snacks required for verification.",
    "🌸 Your dog’s gift: unconditional love and occasional slobbery kisses.",
    "🦴 Mom’s secret? Your dog already ate the bouquet.",
    "❤️ Pawprints on your heart, paw prints on the carpet — all love.",
    "🍪 Treat mom right, or your dog will enforce justice.",
    "🐶 Dogs don’t buy flowers, but they’ll sit and stare at you dramatically.",
    "🥰 Who needs chocolate when you have a snuggly pup?",
    "🌷 Your dog’s card: ‘I woof you, mom!’",
    "💖 Mom’s day off? Your dog thinks it’s cuddle time all day.",
    "🐕 Special delivery: your dog’s heart (and drool) exclusively for you."
  ],
  "FathersDay": [
    "🛠️ Happy Father’s Day! Your dog knows dad = treat dispenser.",
    "🐾 Dad’s special skill: opening snack bags silently… your dog notices everything.",
    "⚡ Your dog’s gift to dad: constant supervision and tail wags.",
    "🍔 BBQ master? Your dog claims first taste rights.",
    "🎩 Dad’s chair? Your dog already claimed it.",
    "😂 Dad jokes are better with a pup audience — laughs guaranteed.",
    "🥎 Play catch, not chores — your dog insists.",
    "🐶 Dad’s socks: apparently chew-proof… challenge accepted.",
    "💙 Dogs + dads = unconditional love and slobbery high-fives.",
    "🍕 Pizza for dad, drool for dog — it’s a fair trade.",
    "🦴 Father’s Day verdict: best day ever, according to your dog."
  ],
  "MemorialDay": [
    "🇺🇸 Honor, remember, and give belly rubs to pups.",
    "🐾 Your dog salutes every barbecue, every nap, every human hero.",
    "🍔 Memorial snacks? Your dog thinks they deserve extra hot dogs.",
    "🎆 Fireworks? Couch safety first — pup style.",
    "💙 Red, white, blue, and wagging tails everywhere.",
    "🥳 Tail-wagging ceremony: your dog’s way of celebrating.",
    "🐶 Your dog says: respect + treats = perfect Memorial Day.",
    "🌭 No grilling without dog supervision — mandatory.",
    "🧢 Uncle Sam called: your dog already claimed the picnic blanket.",
    "🎖️ Paws up for heroes (and zoomies).",
    "🍉 Summer officially starts when your dog steals the watermelon."
  ],
  "LaborDay": [
    "💪 Happy Labor Day! Your dog labors by supervising your BBQ skills.",
    "🐾 Dog’s work schedule: nap, bark, snack, repeat.",
    "🍔 Grill master? Your dog is chief taste-tester.",
    "😎 Relaxation level: maximum, according to your dog.",
    "🎉 Tail-wagging competitions start at 10AM sharp.",
    "🛋️ Couch officially closed for pup nap shifts.",
    "🐶 Labor Day parade? Your dog leads with zoomies and drool.",
    "🥤 Cool drinks for you, drool for dog.",
    "🌞 Sunbathing expert? Your dog claims that title.",
    "🦴 BBQ ribs? Only for you… maybe your dog sneaks one.",
    "🍦 Ice cream? Your dog deserves a taste test first."
  ],
  "MartinLutherKingJrDay": [
    "✊ Dream big! Your dog dreams of endless treats.",
    "🐾 MLK said, ‘I have a dream.’ Your dog has a nap plan.",
    "💭 Treat equality for all pups!",
    "🦴 Justice is served… preferably with bacon.",
    "📚 Storytime? Your dog listens… with one ear and a tail wag.",
    "🌟 Marching towards the couch, one zoomie at a time.",
    "🐶 Pawprints on history (and your living room carpet).",
    "❤️ Love, respect, and belly rubs for everyone.",
    "🎉 Celebration mode: wag, fetch, nap, repeat.",
    "🍪 Treats for all! Your dog approves this message."
  ],
  "GroundhogDay": [
    "🐾 Shadow spotted! More zoomies incoming?",
    "🌤️ Six more weeks of naps… or chaos.",
    "🥱 Your dog predicts: breakfast first, then sniffing.",
    "🐶 Paw-gression report: the shadow didn’t scare them at all.",
    "🔮 Dog says: 'Forecast = treats with a chance of belly rubs.'",
    "☀️ Sunshine or clouds, your dog still steals the spotlight.",
    "🐾 Tail wagging prediction: high probability of mischief.",
    "🕵️‍♂️ Groundhog or squeaky toy? Your pup investigates both.",
    "😂 Shadow fear level: 0. Zoomies level: 100.",
    "🥓 Bacon forecast? Your dog approves."
  ],
  "PresidentsDay": [
    "🇺🇸 Executive paws in session!",
    "🐾 Commander-in-chews reporting for belly rub duty.",
    "🗳️ Vote for more treats, tail wags mandatory.",
    "📜 Doggo diplomacy: share toys, steal snacks.",
    "🏛️ Oval couch? Your dog already claimed it.",
    "🥎 Policy update: fetch is national priority.",
    "🐶 Puppers in charge — executive zoomies approved.",
    "💼 Barking cabinet: treats for every pup.",
    "🎩 Presidential nap? Officially sanctioned.",
    "🍔 BBQ diplomacy: your dog negotiates first bite."
  ],
  "AprilFoolsDay": [
    "😂 Gotcha! Your dog hid the slippers again.",
    "🐾 Prank level: expert. Zoomies level: max.",
    "🥚 Who put the squeaky toy in the fridge? Oh right, your dog.",
    "🎭 Fool me once? Your dog will do it twice.",
    "🦴 Treat deception: secretly ate your snack.",
    "😎 Doggo jokes incoming… they always win.",
    "🐶 Expect surprise zoomies at random intervals.",
    "💨 Sneaky paw strikes everywhere.",
    "🎉 April Fools? More like all month for your pup.",
    "🧩 Puzzle time! Your dog already solved it… and stole the toy."
  ]
};

const specialEventMessages = {
  "LunaBirthday": [
    "🎉 Happy Birthday Luna! Extra treats and tail wags today.",
    "🎂 Dog-friendly cake and zoomies included!",
    "🐾 Luna’s day: all toys, all cuddles, all love!",
    "🥳 Birthday vibes: sniff tests passed, happiness approved.",
    "🎁 Pup parade: Luna leads with style and fur flair!"
  ],
  "LyllaBirthday": [
    "🎉 Happy Birthday Lylla! All the belly rubs you deserve.",
    "🎂 Cake (dog-friendly!) and zoomies included.",
    "🐾 Lylla’s special day: toys, cuddles, and extra love!",
    "🥳 Birthday vibes: sniff tests passed, happiness approved.",
    "🎁 Pup parade: Lylla leads with flair and style!"
  ],
  "Remembrance Day 9/11": [
    "🕯️ Today, we remember and honor those we lost.",
    "🇺🇸 A moment of silence for heroes and lives forever in our hearts.",
    "💙 Reflecting on courage, unity, and the world standing together.",
    "🕊️ Let us pause and remember, with gratitude and respect.",
    "🌟 Honoring the memory of those affected — today and always."
  ]
};

  const container = document.getElementById("banner-container");
  const activeWeatherTypes = new Map();

  function createBanner(id) {
    const div = document.createElement("div");
    div.className = "announcement-banner";
    div.id = id;
    const p = document.createElement("p");
    p.id = id + "-text";
    div.appendChild(p);
    container.appendChild(div);
    return div;
  }

  function getTextColor(bgColor) {
  let r=0, g=0, b=0;

  if(bgColor.startsWith("linear-gradient")) {
    // Extract hex colors from the gradient string
    const hexMatches = bgColor.match(/#([0-9a-fA-F]{6})/g);
    if(hexMatches && hexMatches.length > 0){
      hexMatches.forEach(hex => {
        r += parseInt(hex.substr(1,2),16);
        g += parseInt(hex.substr(3,2),16);
        b += parseInt(hex.substr(5,2),16);
      });
      r = Math.round(r / hexMatches.length);
      g = Math.round(g / hexMatches.length);
      b = Math.round(b / hexMatches.length);
    }
  } else {
    r = parseInt(bgColor.substr(1,2),16);
    g = parseInt(bgColor.substr(3,2),16);
    b = parseInt(bgColor.substr(5,2),16);
  }

  const luminance = (0.299*r + 0.587*g + 0.114*b);
  return luminance < 140 ? "#FFFFFF" : "#000000";
}

  // --- Emergency Banner ---
  if(settings.emergencyActive) {
    const emMsg = settings.messages.find(m=>m.type==="emergency");
    if(emMsg) {
      document.querySelectorAll(".announcement-banner").forEach(b=>b.remove());
      const emergencyBanner = createBanner("emergency-banner");
      emergencyBanner.style.background = emMsg.color;
      emergencyBanner.querySelector("p").style.color = emMsg.textColor || "#fff";
      emergencyBanner.querySelector("p").innerHTML = emMsg.text;
      emergencyBanner.style.display = "block";
      window.skipCycleBanners = true;
      window.skipWeatherAlerts = true;
    }
  }

  // --- Cycle Banners ---
  const cycleMessages = settings.messages.filter(m=>m.type!=="emergency").filter(msg=>{
    if(settings.testMode) return true;
    if(msg.startDateTime && msg.endDateTime){
      const now = new Date();
      return now >= new Date(msg.startDateTime) && now <= new Date(msg.endDateTime);
    }
    return true;
  });

  const cycleBanner = createBanner("cycle-banner");
  let index = 0;
  function cycle() {
    if(window.skipCycleBanners) return;
    if(cycleMessages.length===0) return;
    const msg = cycleMessages[index];
    cycleBanner.style.background = msg.color;
    cycleBanner.querySelector("p").style.color = msg.textColor || "#fff";
    cycleBanner.querySelector("p").innerHTML = msg.text;
    cycleBanner.style.display = "block";
    index = (index + 1) % cycleMessages.length;
    adjustContentPadding();
  }
  cycle();
  setInterval(cycle, 30000);
  cycleBanner.addEventListener("click", cycle);
  
  let sunriseEST = null;
let sunsetEST = null;

async function fetchSunTimes() {
  try {
    const res = await fetch("https://api.sunrise-sunset.org/json?lat=25.7617&lng=-80.1918&formatted=0");
    const data = await res.json();

    if (data.status === "OK") {
      sunriseEST = new Date(new Date(data.results.sunrise).toLocaleString("en-US", { timeZone: "America/New_York" }));
      sunsetEST  = new Date(new Date(data.results.sunset).toLocaleString("en-US", { timeZone: "America/New_York" }));
      console.log("Miami Sunrise EST:", sunriseEST.toLocaleTimeString());
      console.log("Miami Sunset EST:", sunsetEST.toLocaleTimeString());
    }
  } catch (err) {
    console.error("Sunrise/Sunset fetch error:", err);
  }
}
function isDaytimeEST() {
  if (!sunriseEST || !sunsetEST) {
    const now = new Date();
    const estNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const hours = estNow.getHours();
    return hours >= 7 && hours < 19; // fallback if API fails
  }

  const nowEST = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  return nowEST >= sunriseEST && nowEST < sunsetEST;
}
// Fetch on page load & refresh daily
fetchSunTimes();
setInterval(fetchSunTimes, 24 * 60 * 60 * 1000);  


// --- Weather Alerts ---
async function fetchWeatherAlerts() {
  if (window.skipWeatherAlerts) return;

  if (settings.testMode) {
    const simulatedAlerts = Object.keys(customWeatherMessages);
    const currentTypes = new Map();

    simulatedAlerts.forEach(type => {
      // Simulate county name(s) for test mode
      const simulatedCounty = ["Miami-Dade", "Broward", "Monroe"]; 
      if (!currentTypes.has(type)) currentTypes.set(type, new Set());
      currentTypes.get(type).add(`${type}::${simulatedCounty}`);
    });

    activeWeatherTypes.clear();
    currentTypes.forEach((ids, type) => activeWeatherTypes.set(type, ids));

    // Store simulated alerts for test mode display
    window.weatherAlertData = simulatedAlerts.map(type => ({
      id: type,
      properties: { areaDesc: "Miami-Dade" }
    }));

    startWeatherRotation();
    adjustContentPadding();
  } else {
    try {
      const res = await fetch("https://api.weather.gov/alerts/active?area=FL");
      const data = await res.json();

      const validEvents = Object.keys(customWeatherMessages);
      const allowedSeverities = ["Unknown","Minor", "Moderate", "Severe", "Extreme"];
      const counties = ["Miami-Dade", "Broward", "Monroe"]; // -------- add counties here --------
      const currentTypes = new Map();

      const alerts = data.features.filter(f => {
        const p = f.properties;

        // check if alert affects one of your counties
        const affectsCounty = counties.some(c => p.areaDesc.includes(c));

        return (
          p.status === "Actual" &&
          p.messageType === "Alert" &&
          allowedSeverities.includes(p.severity) &&
          validEvents.some(v => p.event.toLowerCase().includes(v.toLowerCase())) &&
          affectsCounty // include county filter
        );
      });

      alerts.forEach(a => {
        const eventKey = validEvents.find(k =>
          a.properties.event.toLowerCase().includes(k)
        );
        if (!currentTypes.has(eventKey)) currentTypes.set(eventKey, new Set());
        currentTypes.get(eventKey).add(a.id);
      });

      activeWeatherTypes.clear();
      currentTypes.forEach((ids, type) => activeWeatherTypes.set(type, ids));

      // Save alerts data for county display
      window.weatherAlertData = data.features;

      startWeatherRotation();
      adjustContentPadding();
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  }
}

// --- Rotate Weather Alerts ---
let weatherIndex = 0;
let clearIndex = 0;
let weatherBanner = null;
let weatherInterval = null;

function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  if(month >= 3 && month <= 5) return "Spring";   // Mar-May
  if(month >= 6 && month <= 8) return "Summer";   // Jun-Aug
  if(month >= 9 && month <= 11) return "Fall";    // Sep-Nov
  return "Winter";                                // Dec-Feb
}

// Seasonal gradients for clear weather
const seasonalGradients = [
  { season: "Spring", gradient: "linear-gradient(90deg, #76C893, #DCEDC1)" }, 
  { season: "Summer", gradient: "linear-gradient(90deg, #FF7043, #FFD54F)" }, 
  { season: "Fall",   gradient: "linear-gradient(90deg, #FF9800, #D32F2F)" }, 
  { season: "Winter", gradient: "linear-gradient(90deg, #42A5F5, #1976D2)" } 
];

const holidayGradients = [
  {
    name: "LaborDay",
    startDate: "2025-09-01",
    endDate: "2025-09-01",
    gradient: "linear-gradient(90deg, #FF6347, #FFA500)", 
    textColor: "#FFFFFF"
  },
  {
    name: "Halloween",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    gradient: "linear-gradient(90deg, #FF7F50, #FF4500)", 
    textColor: "#FFFFFF"
  },
  {
    name: "Thanksgiving",
    startDate: "2025-11-27",
    endDate: "2025-11-27",
    gradient: "linear-gradient(90deg, #D2691E, #FFB347)", 
    textColor: "#FFFFFF"
  },
  {
    name: "ChristmasEve",
    startDate: "2025-12-24",
    endDate: "2025-12-24",
    gradient: "linear-gradient(90deg, #B22222, #FF6347)", 
    textColor: "#FFFFFF"
  },
  {
    name: "Christmas",
    startDate: "2025-12-25",
    endDate: "2025-12-26",
    gradient: "linear-gradient(90deg, #B22222, #228B22)", 
    textColor: "#FFFFFF"
  },
  {
    name: "NewYearsEve",
    startDate: "2025-12-31",
    endDate: "2025-12-31",
    gradient: "linear-gradient(90deg, #FFD700, #FFFFFF)", 
    textColor: "#000000"
  },
  {
    name: "NewYear",
    startDate: "2026-01-01",
    endDate: "2026-01-01",
    gradient: "linear-gradient(90deg, #FFD700, #FFFFFF)", 
    textColor: "#000000"
  },
  {
    name: "MartinLutherKingJrDay",
    startDate: "2026-01-19",
    endDate: "2026-01-19",
    gradient: "linear-gradient(90deg, #800080, #DA70D6)", 
    textColor: "#FFFFFF"
  },
  {
    name: "GroundhogDay",
    startDate: "2026-02-02",
    endDate: "2026-02-02",
    gradient: "linear-gradient(90deg, #A0522D, #DEB887)", 
    textColor: "#FFFFFF"
  },
  {
    name: "ValentinesDay",
    startDate: "2026-02-14",
    endDate: "2026-02-14",
    gradient: "linear-gradient(90deg, #FF1493, #FFC0CB)", 
    textColor: "#FFFFFF"
  },
  {
    name: "PresidentsDay",
    startDate: "2026-02-16",
    endDate: "2026-02-16",
    gradient: "linear-gradient(90deg, #000080 0%, #87CEFA 100%)", 
    textColor: "#FFFFFF"
  },
  {
    name: "StPatricksDay",
    startDate: "2026-03-17",
    endDate: "2026-03-17",
    gradient: "linear-gradient(90deg, #006400, #7CFC00)", 
    textColor: "#FFFFFF"
  },
  {
    name: "AprilFoolsDay",
    startDate: "2026-04-01",
    endDate: "2026-04-01",
    gradient: "linear-gradient(90deg, #FFA500, #FFFF00)", 
    textColor: "#000000"
  },
  {
    name: "Easter",
    startDate: "2026-04-05",
    endDate: "2026-04-05",
    gradient: "linear-gradient(90deg, #FFDAB9, #FFB6C1)", 
    textColor: "#000000"
  },
  {
    name: "MothersDay",
    startDate: "2026-05-10",
    endDate: "2026-05-10",
    gradient: "linear-gradient(90deg, #FF69B4, #FFB6C1)", 
    textColor: "#FFFFFF"
  },
  {
    name: "MemorialDay",
    startDate: "2026-05-25",
    endDate: "2026-05-25",
    gradient: "linear-gradient(90deg, #FF0000 0%, #FF0000 25%, #C0C0C0 30%, #000080 35%, #000080 100%)",
    textColor: "#FFFFFF"
  },
  {
    name: "FathersDay",
    startDate: "2026-06-21",
    endDate: "2026-06-21",
    gradient: "linear-gradient(90deg, #1E90FF, #00BFFF)", 
    textColor: "#FFFFFF"
  },
  {
    name: "FourthOfJuly",
    startDate: "2026-07-04",
    endDate: "2026-07-04",
    gradient: "linear-gradient(90deg, #00008B, #FF0000, #FFFFFF)", 
    textColor: "#FFFFFF"
  }
];

const specialEventGradients = [
   {
    name: "LunaBirthday",
    startDate: "2026-04-02",
    endDate: "2026-04-02",
    gradient: "linear-gradient(90deg, #ADD8E6, #FFC0CB)", // soft blue + pink
    textColor: "#000000"
  },
  {
    name: "LyllaBirthday",
    startDate: "2026-06-05",
    endDate: "2026-06-05",
    gradient: "linear-gradient(90deg, #800080, #DA70D6)", // purple gradient
    textColor: "#ffffff"
  },
  {
 name: "Remembrance Day 9/11",
    startDate: "2025-09-11",
    endDate: "2025-09-11",
    gradient: "linear-gradient(90deg, #000000, #4F4F4F)", // Black to dark gray
    textColor: "#ffffff"
  }
];

function getHolidayGradient() {
  const now = new Date();
  const estNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  return holidayGradients.find(h => {
    const start = new Date(new Date(h.startDate + "T00:00:00").toLocaleString("en-US", { timeZone: "America/New_York" }));
    const end   = new Date(new Date(h.endDate   + "T23:59:59").toLocaleString("en-US", { timeZone: "America/New_York" }));
    return estNow >= start && estNow <= end;
  });
}

// Helper to check if today is a special event
function getSpecialEventGradient() {
  const now = new Date();
  const estNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  return specialEventGradients.find(e => {
    const start = new Date(new Date(e.startDate + "T00:00:00").toLocaleString("en-US", { timeZone: "America/New_York" }));
    const end   = new Date(new Date(e.endDate   + "T23:59:59").toLocaleString("en-US", { timeZone: "America/New_York" }));
    return estNow >= start && estNow <= end;
  }) || null;
}

function formatCounties(counties) {
  if (counties.length === 0) return "";
  if (counties.length === 1) return counties[0];
  return counties.slice(0, -1).join(", ") + " and " + counties[counties.length - 1];
}

function startWeatherRotation() {
  if (weatherInterval) clearInterval(weatherInterval);

  if (!weatherBanner) {
    weatherBanner = createBanner("weather-rotating-banner");
    weatherBanner.classList.add("weather-live-banner");
    container.insertBefore(weatherBanner, cycleBanner);
  }

  const types = Array.from(activeWeatherTypes.keys());

  function showWeather() {
    // --- 1. Check for special event first ---
    const special = getSpecialEventGradient();
    if (special) {
      // Remove any existing click listeners
      const newBanner = weatherBanner.cloneNode(true);
      weatherBanner.replaceWith(newBanner);
      weatherBanner = newBanner;

      const background = special.gradient;
      const textColor = special.textColor || "#ffffff";
      const pool = specialEventMessages[special.name] || ["🎉 Special Event!"];
      const randomMsg = pool[Math.floor(Math.random() * pool.length)];

      weatherBanner.querySelector("p").innerHTML = randomMsg;
      weatherBanner.style.background = background;
      weatherBanner.querySelector("p").style.color = textColor;
      weatherBanner.style.display = "block";
      adjustContentPadding();
      return; // Stop here, don’t show weather or holiday
    }

    // --- 2. No special event, check for holiday or seasonal ---
    if (types.length === 0) {
      let background, textColor, randomMsg;

      const holiday = getHolidayGradient();
      if (holiday) {
        background = holiday.gradient;
        textColor = holiday.textColor || "#ffffff";
        const pool = holidayMessages[holiday.name] || ["🎉 Happy Holiday!"];
        randomMsg = pool[Math.floor(Math.random() * pool.length)];
      } else {
        const season = seasonalGradients.find(s => s.season === getCurrentSeason());
        background = season.gradient;
        textColor = getTextColor(background);
        const pool = isDaytimeEST() ? clearWeatherMessages : nightWeatherMessages;
        randomMsg = pool[Math.floor(Math.random() * pool.length)];
      }

      // Remove click listener for holidays/seasonal messages if you want
      const newBanner = weatherBanner.cloneNode(true);
      weatherBanner.replaceWith(newBanner);
      weatherBanner = newBanner;

      weatherBanner.querySelector("p").innerHTML = randomMsg;
      weatherBanner.style.background = background;
      weatherBanner.querySelector("p").style.color = textColor;
      weatherBanner.style.display = "block";
      adjustContentPadding();
      return;
    }

    // --- 3. Show actual weather alerts ---
    const type = types[weatherIndex];
    const msgData = customWeatherMessages[type];

    const alertIds = Array.from(activeWeatherTypes.get(type) || []);
    const alertsForType = alertIds.map(id => {
      if (settings.testMode && id.includes("::")) {
        const [realId, county] = id.split("::");
        return { id: realId, properties: { areaDesc: county } };
      }
      return window.weatherAlertData.find(f => f.id === id);
    }).filter(Boolean);

    const countiesFilter = ["Miami-Dade", "Broward", "Monroe"];
    const countiesList = [...new Set(
      alertsForType.flatMap(a =>
        countiesFilter.filter(c => a.properties.areaDesc.includes(c))
      )
    )];
    const countiesAffected = formatCounties(countiesList);

    weatherBanner.querySelector("p").innerHTML =
      `${msgData.text}<span style="display:block; margin-top: 10px;">🚨 Advisory for: ${countiesAffected} 🚨</span>`;
    weatherBanner.style.background = msgData.color;
    weatherBanner.querySelector("p").style.color = getTextColor(msgData.color);
    weatherBanner.style.display = "block";
    adjustContentPadding();
    weatherIndex = (weatherIndex + 1) % types.length;

    // Attach click listener only for actual weather alerts
    const newBanner = weatherBanner.cloneNode(true);
    weatherBanner.replaceWith(newBanner);
    weatherBanner = newBanner;
    weatherBanner.addEventListener("click", showWeather);
  }

  showWeather();
  weatherInterval = setInterval(showWeather, 30000);
  weatherBanner.addEventListener("click", showWeather);
}

fetchWeatherAlerts();
setInterval(fetchWeatherAlerts, settings.testMode ? 10000 : 300000);

function adjustContentPadding() {
  const totalHeight = Array.from(document.querySelectorAll(".announcement-banner"))
    .reduce((sum,b)=>sum+b.offsetHeight,0);
  const content = document.querySelector("#page-content") || document.body;
  content.style.paddingTop = totalHeight + "px";
}
});

//safety Control//
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

document.addEventListener("copy", function(e){
  e.preventDefault();
  alert("Copying is disabled on this site.");
});

document.addEventListener("keydown", function(e){
  if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
}

  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
  }
});

(function() {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',  
    height: `${window.innerHeight}px`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 9999,
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.05s ease' 
  });
  document.body.appendChild(overlay);

  function activateBlur() { overlay.style.opacity = '1'; }
  function deactivateBlur() { overlay.style.opacity = '0'; }

  function updateOverlaySize() {
    overlay.style.height = `${window.innerHeight}px`;
    overlay.style.width = `${window.innerWidth}px`;
  }
  window.addEventListener('resize', updateOverlaySize);
  window.addEventListener('orientationchange', updateOverlaySize);

  window.addEventListener('blur', () => {
    if (document.activeElement.tagName !== 'IFRAME') activateBlur();
  });

  window.addEventListener('focus', deactivateBlur);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) activateBlur();
    else deactivateBlur();
  });
})();

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const bannerContainer = document.getElementById('banner-container');
    if (!bannerContainer) {
      console.warn('No #banner-container found. Aborting header/footer setup.');
      return;
    }

    // ----------------------------
    // HEADER SETUP + NAV TOGGLE
    // ----------------------------
    const navHeader = document.createElement('nav');
    navHeader.className = 'header-nav';
    navHeader.innerHTML = `
      <div class="nav-header">
        <button class="nav-toggle" id="navToggle">&#9776;</button>
      </div>
      <ul class="nav-list" id="navList">
        <li><a href="https://barknbondk9solutions.com/">Home</a></li>
        <li><a href="https://barknbondk9solutions.com/learn-more-about-our-trust-based-approach-to-training">About</a></li>
        <li><a href="https://barknbondk9solutions.com/mobile-1-on-1-dog-training-services">Services</a></li>
        <li><a href="https://resources.barknbondk9solutions.com/">Resources</a></li>
        <li><a href="https://progress-portal.barknbondk9solutions.com/">PupTrack</a></li>
        <li><a href="https://team.barknbondk9solutions.com/">Team</a></li>
        <li><a href="https://contact.barknbondk9solutions.com/">Contact</a></li>
      </ul>
    `;
    bannerContainer.appendChild(navHeader);

    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    if (navToggle && navList) {
      navToggle.addEventListener('click', function () {
        navList.classList.toggle('active');
      });
    }

    // ----------------------------
    // FOOTER SETUP
    // ----------------------------
    let footerEl = document.getElementById('site-footer');
    if (!footerEl) {
      footerEl = document.createElement('footer');
      footerEl.id = 'site-footer';
      const currentYear = new Date().getFullYear();
      footerEl.innerHTML = `
        <div class="footer-legal" style="text-align:center; padding:20px; background:transparent; color:white; font-size:16px;">
          <p>
            &copy; ${currentYear} All rights reserved. BarkNBondK9Solutions, LLC<br>
            Licensed & Insured<br>
            <a href="https://barknbondk9solutions.com/terms-and-conditions" target="_blank">Terms & Conditions</a> |
            <a href="https://barknbondk9solutions.com/privacy-policy" target="_blank">Privacy Policy</a> |
            <a href="https://barknbondk9solutions.com/liability-waiver" target="_blank">Liability Waiver</a> |
            <a href="https://barknbondk9solutions.com/dog-training-faq" target="_blank">FAQ</a> |
            <a href="https://barknbondk9solutions.com/accessibility" target="_blank">Accessibility</a>
          </p>
        </div>
      `;
      document.body.appendChild(footerEl);
    }

    // ----------------------------
    // SHARED UTILS
    // ----------------------------
    function isVisible(el) {
      if (!el) return false;
      const cs = window.getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && el.offsetHeight > 0 && el.offsetWidth > 0;
    }

    const priorityMap = {
      'emergency-banner': 3,
      'cycle-banner': 2,
      'weather-rotating-banner': 1,
    };

    function getActiveBanner() {
      const all = Array.from(document.querySelectorAll('.announcement-banner'));
      const visible = all.filter(isVisible);
      if (visible.length === 0) return null;

      const byIdCheck = ['emergency-banner', 'cycle-banner', 'weather-rotating-banner'];
      for (const id of byIdCheck) {
        const el = visible.find(v => v.id === id);
        if (el) return el;
      }

      visible.sort((a, b) => {
        const pa = priorityMap[a.id] || 0;
        const pb = priorityMap[b.id] || 0;
        return pb - pa;
      });

      return visible[0] || null;
    }

    function getBannerBackground(banner) {
      if (!banner) return null;
      const cs = window.getComputedStyle(banner);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return cs.backgroundImage;
      if (cs.background && cs.background !== 'none') return cs.background;
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') return cs.backgroundColor;
      if (banner.style && banner.style.background) return banner.style.background;
      return null;
    }

    function getBannerTextColor(banner) {
      if (!banner) return '#ffffff';
      const p = banner.querySelector('p') || banner;
      const cs = window.getComputedStyle(p);
      return cs.color || '#ffffff';
    }

    // ----------------------------
    // HEADER SYNC
    // ----------------------------
    let lastHeaderBg = null;
    let lastHeaderColor = null;

    function findHeaderEl() {
      return document.getElementById('site-header') ||
        document.querySelector('.header-nav') ||
        document.querySelector('nav.header-nav') ||
        document.querySelector('nav');
    }

    function applyToHeader(bg, color) {
      const headerEl = findHeaderEl();
      if (!headerEl) return;
      headerEl.style.transition = 'background 250ms ease, color 250ms ease';
      headerEl.style.background = bg || 'rgba(0, 0, 0, 0)';
      headerEl.style.color = color || '#ffffff';

      const links = headerEl.querySelectorAll('a, .nav-list a, .nav-tabs a');
      links.forEach(a => {
        a.style.transition = 'color 250ms ease';
        a.style.color = color || '#ffffff';
      });
    }

    function syncHeader() {
      const active = getActiveBanner();
      if (active) {
        const bg = getBannerBackground(active);
        const color = getBannerTextColor(active);
        lastHeaderBg = bg;
        lastHeaderColor = color;
        applyToHeader(bg, color);
      } else if (lastHeaderBg && lastHeaderColor) {
        applyToHeader(lastHeaderBg, lastHeaderColor);
      }
    }

    // ----------------------------
    // FOOTER SYNC
    // ----------------------------
    let lastFooterBg = null;
    let lastFooterColor = null;

    function applyToFooter(bg, color) {
      footerEl.style.transition = 'background 250ms ease, color 250ms ease';
      footerEl.style.background = bg || 'rgba(0, 0, 0, 0)';
      footerEl.style.color = color || '#ffffff';

      const links = footerEl.querySelectorAll('a');
      links.forEach(a => {
        a.style.transition = 'color 250ms ease';
        a.style.color = color || '#ffffff';
      });
    }

    function syncFooter() {
      const active = getActiveBanner();
      if (active) {
        const bg = getBannerBackground(active);
        const color = getBannerTextColor(active);
        lastFooterBg = bg;
        lastFooterColor = color;
        applyToFooter(bg, color);
      } else if (lastFooterBg && lastFooterColor) {
        applyToFooter(lastFooterBg, lastFooterColor);
      }
    }

    // ----------------------------
    // OBSERVERS & FALLBACK SYNC
    // ----------------------------
    const observer = new MutationObserver(() => {
      syncHeader();
      syncFooter();
    });

    observer.observe(bannerContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    document.addEventListener('transitionend', () => {
      syncHeader();
      syncFooter();
    });

    const fallbackInterval = setInterval(() => {
      syncHeader();
      syncFooter();
    }, 1000);

    setTimeout(() => clearInterval(fallbackInterval), 60000); // Stop after 1 minute

    // Initial sync
    syncHeader();
    syncFooter();
  });
})();
