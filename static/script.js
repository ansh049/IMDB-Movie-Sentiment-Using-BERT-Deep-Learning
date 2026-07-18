/* ============================================================
   AI Movie Review Sentiment Analyzer — Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Elements ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const reviewForm = document.getElementById('reviewForm');
    const reviewBox = document.getElementById('review');
    const countEl = document.getElementById('count');
    const voiceBtn = document.getElementById('voiceBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exampleBtns = document.querySelectorAll('.example');
    const randomBtn = document.getElementById('randomExample');
    const loader = document.getElementById('loader');
    const toast = document.getElementById('toast');
    const historyList = document.getElementById('historyList');
    const wordCountEl = document.getElementById('wordCount');
    const charCountEl = document.getElementById('charCount');
    const readingTimeEl = document.getElementById('readingTime');
    const resultCard = document.querySelector('.result-card');

    const HISTORY_KEY = 'sentimentHistory';
    const THEME_KEY = 'sentimentTheme';

    /* ---------- Typing Hero Text ---------- */
    const typingPhrases = [
        'Powered by Transformers & PyTorch',
        'Paste a review, get instant sentiment',
        'Positive or Negative — find out in seconds',
        'Understand what your audience really thinks'
    ];
    const typingEl = document.getElementById('typing-text');
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
        const current = typingPhrases[phraseIndex];

        if (!deleting) {
            charIndex++;
            typingEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(typeLoop, 1400);
                return;
            }
        } else {
            charIndex--;
            typingEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            }
        }
        setTimeout(typeLoop, deleting ? 35 : 60);
    }
    typeLoop();

    /* ---------- Theme Toggle ---------- */
    function applyTheme(theme) {
        document.body.classList.toggle('light', theme === 'light');
        themeToggle.innerHTML = theme === 'light'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light');
        const newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    });

    /* ---------- Character Count ---------- */
    function updateCount() {
        countEl.textContent = reviewBox.value.length;
    }
    reviewBox.addEventListener('input', updateCount);
    updateCount();

    /* ---------- Clear Button ---------- */
    clearBtn.addEventListener('click', () => {
        reviewBox.value = '';
        updateCount();
        reviewBox.focus();
    });

    /* ---------- Copy Button ---------- */
    copyBtn.addEventListener('click', async () => {
        if (!reviewBox.value.trim()) return;
        try {
            await navigator.clipboard.writeText(reviewBox.value);
            showToast('Review Copied!');
        } catch (err) {
            showToast('Copy failed');
        }
    });

    /* ---------- Voice Input ---------- */
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognizing = false;
    let recognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.addEventListener('result', (e) => {
            const transcript = Array.from(e.results)
                .map(r => r[0].transcript)
                .join(' ');
            reviewBox.value += (reviewBox.value ? ' ' : '') + transcript;
            updateCount();
        });

        recognition.addEventListener('end', () => {
            recognizing = false;
            voiceBtn.classList.remove('active');
        });

        recognition.addEventListener('error', () => {
            recognizing = false;
            voiceBtn.classList.remove('active');
            showToast('Voice input error');
        });
    }

    voiceBtn.addEventListener('click', () => {
        if (!SpeechRecognition) {
            showToast('Voice input not supported');
            return;
        }
        if (recognizing) {
            recognition.stop();
            recognizing = false;
            voiceBtn.classList.remove('active');
            return;
        }
        recognition.start();
        recognizing = true;
        voiceBtn.classList.add('active');
    });

    /* ---------- Example Reviews ---------- */
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            reviewBox.value = btn.dataset.review;
            updateCount();
            reviewBox.focus();
        });
    });

    const randomReviews = [
        "The cinematography was stunning and the story kept me hooked till the very end.",
        "I fell asleep halfway through, it was so slow and boring.",
        "A masterpiece! The performances were incredible and the score was hauntingly beautiful.",
        "Terrible writing and wooden acting ruined what could have been a great concept.",
        "Genuinely one of the best films I've seen this year, highly recommend it.",
        "The plot made no sense and the pacing was all over the place.",
        "Heartwarming, funny, and beautifully shot — a must watch for the whole family.",
        "I want my two hours back, this was a complete waste of time."
    ];

    randomBtn.addEventListener('click', () => {
        const pick = randomReviews[Math.floor(Math.random() * randomReviews.length)];
        reviewBox.value = pick;
        updateCount();
        reviewBox.focus();
    });

    /* ---------- Form Submit / Loader ---------- */
    reviewForm.addEventListener('submit', (e) => {
        if (!reviewBox.value.trim()) {
            e.preventDefault();
            showToast('Please write a review first');
            return;
        }
        loader.classList.add('show');
    });

    /* ---------- Toast ---------- */
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }

    /* ---------- Result Card Stats + Confetti + History ---------- */
    if (resultCard) {
        const text = reviewBox.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        const readingSecs = Math.max(1, Math.round((words / 200) * 60));

        if (wordCountEl) wordCountEl.textContent = words;
        if (charCountEl) charCountEl.textContent = chars;
        if (readingTimeEl) readingTimeEl.textContent = readingSecs < 60
            ? `${readingSecs}s`
            : `${Math.round(readingSecs / 60)}m`;

        const sentimentHeading = resultCard.querySelector('h2');
        const sentiment = sentimentHeading ? sentimentHeading.textContent.trim() : '';

        if (sentiment === 'Positive' && typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }

        if (text) {
            saveToHistory(text, sentiment);
        }
    }

    /* ---------- History ---------- */
    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        } catch (err) {
            return [];
        }
    }

    function saveToHistory(text, sentiment) {
        const history = getHistory();
        history.unshift({ text, sentiment, time: Date.now() });
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
    }

    function renderHistory() {
        const history = getHistory();
        historyList.innerHTML = '';

        if (!history.length) {
            const li = document.createElement('li');
            li.className = 'empty';
            li.textContent = 'No reviews analyzed yet.';
            historyList.appendChild(li);
            return;
        }

        history.forEach(item => {
            const li = document.createElement('li');

            const span = document.createElement('span');
            span.className = 'review-text';
            span.textContent = item.text;

            const tag = document.createElement('span');
            tag.className = `tag ${item.sentiment}`;
            tag.textContent = item.sentiment;

            li.appendChild(span);
            li.appendChild(tag);
            historyList.appendChild(li);
        });
    }

    renderHistory();

});