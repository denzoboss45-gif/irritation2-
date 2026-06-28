# Irritation 🌙

एक dark, cinematic, emotional web-experience — rain, fog, fireflies, floating hearts और एक कहानी के लिए बनाया गया।

## 📁 Structure

```
Irritation/
│
├── index.html      → main page structure
├── style.css       → dark theme, glass cards, animations
├── script.js       → rain canvas, fireflies, hearts, music control
├── music.mp3        → background music (तुम्हें अपनी file डालनी है)
├── dog-memory.jpg   → dog वाली photo, story के बीच एक memory frame में
├── apple-memory.jpg → साथ खाना खाने वाली photo, अपनी जगह पर memory frame में
├── favicon.ico      → tab icon (अपना favicon डाल सकते हो, optional)
└── README.md
```

## ✏️ Story डालना

`index.html` खोलो और `<article class="glass-card story-card" id="story-content">` के अंदर placeholder paragraphs को हटाकर अपनी पूरी कहानी `<p>` tags में paste कर दो — **एक भी शब्द बदले बिना**।

```html
<article class="glass-card story-card" id="story-content">
  <p>तुम्हारी कहानी का पहला paragraph...</p>
  <p>दूसरा paragraph...</p>
</article>
```

## 🎵 Music जोड़ना

अपनी `music.mp3` file इस folder में डाल दो (same नाम से — `music.mp3`)। Code genuine autoplay की कोशिश करता है, लेकिन ध्यान रहे:

- **Browsers (Chrome, Safari, etc.) की अपनी policy है** — ज़्यादातर browsers बिना user interaction के sound-on autoplay को block कर देते हैं। ये किसी code limitation की वजह से नहीं, browser की security policy है।
- इस वजह से music ज़्यादातर pehli tap/click pe turant start ho jaayegi (पूरे page पर कहीं भी पहला tap काफी है) — ये Claude के control में नहीं
- ऊपर right corner में amplifier-style button है — bright glow + bouncing bars जब music चल रही हो, dim जब बंद हो
- User कभी भी manually pause/play कर सकता है — उसकी मर्ज़ी हमेशा final रहेगी

## 🖼️ Favicon

अपना `favicon.ico` इस folder में रख दो। न रखो तो भी page चलेगा, सिर्फ browser tab icon default रहेगा।

## 🌐 GitHub Pages पर डालना

1. इस पूरे folder को एक नए GitHub repo में push करो
2. Repo की **Settings → Pages** में जाओ
3. **Source** में `main` branch और `/ (root)` select करो
4. Save करो — कुछ मिनटों में तुम्हारी site `https://<username>.github.io/<repo-name>/` पर live होगी

## 📱 Mobile

पूरा design mobile-responsive है — font sizes, spacing, और animation counts छोटे screens पर automatically adjust होते हैं।

## ⚙️ Customize करना

- **Colors**: `style.css` के top में `:root` variables बदलो
- **Hearts/fireflies की संख्या**: `script.js` में `count` variables adjust करो
- **Ending lines**: `index.html` में `.ending-card` के अंदर text बदलो

---

*बनाया गया उन शब्दों के लिए, जो कभी कहे नहीं जा सके।* 💔
