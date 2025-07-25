// YouTube Player variables
let player;
let isPlayerReady = false;

// DOM elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseMessage = document.getElementById('responseMessage');
const buttonsContainer = document.getElementById('buttonsContainer');
const musicToggle = document.getElementById('musicToggle');
const heartsContainer = document.getElementById('heartsContainer');

// Floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💕';
    
    // Random positioning and timing
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 1500);

// Initialize floating hearts
for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 300);
}

// YouTube API ready callback
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: 'kzLxzJxYaoY',
        playerVars: {
            autoplay: 0, // autoplay di-nonaktif dulu
            loop: 1,
            playlist: 'kzLxzJxYaoY',
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;

    // Mute supaya bisa autoplay saat user klik
    player.mute();

    // Update tombol visual
    updateMusicButton();
}


function onPlayerStateChange(event) {
    updateMusicButton();
}

function onPlayerError(event) {
    console.log('YouTube player error:', event.data);
    // Fallback: hide music player or show error message
    document.querySelector('.music-player').style.display = 'none';
}

function updateMusicButton() {
    if (!isPlayerReady) return;
    
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        musicToggle.classList.add('playing');
    } else {
        musicToggle.classList.remove('playing');
    }
}

// Music toggle functionality
musicToggle.addEventListener('click', () => {
    if (!isPlayerReady) return;

    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
        player.unMute(); // pastikan unmute saat play
    }
});

// Button click handlers
yesBtn.addEventListener('click', () => {
    buttonsContainer.classList.add('fade-out');
    setTimeout(() => {
        responseMessage.innerHTML = 'Aku juga sayang kamu ❤️';
        responseMessage.classList.add('show', 'celebrate');
        createCelebrationHearts();

        if (isPlayerReady) {
            player.playVideo();
            player.unMute(); // unmute saat user klik Yes
        }
    }, 300);
});

// Tombol NO
noBtn.addEventListener('click', () => {
    buttonsContainer.classList.add('fade-out');
    setTimeout(() => {
        responseMessage.innerHTML = "Gak apa-apa, aku tetap sayang kamu kok :')";
        responseMessage.classList.add('show');
        createGentleHearts();

        if (isPlayerReady) {
            player.playVideo();
            player.unMute(); // tetap mainkan musik
        }
    }, 300);
});

// Create celebration hearts for "Yes" response
function createCelebrationHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.color = '#ff6b9d';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            
            // Animation
            heart.style.animation = 'celebrateHeart 2s ease-out forwards';
            
            document.body.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// Create gentle hearts for "No" response
function createGentleHearts() {
    const hearts = ['💙', '💜', '🤍', '💛'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            heart.style.color = '#74b9ff';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            
            // Gentle animation
            heart.style.animation = 'gentleHeart 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 200);
    }
}

// Add celebration animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrateHeart {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes gentleHeart {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        50% {
            transform: scale(1) translateY(-20px);
            opacity: 1;
        }
        100% {
            transform: scale(0.5) translateY(-40px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle visibility change (for autoplay policies)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isPlayerReady) {
        // Try to resume music when tab becomes visible
        if (player.getPlayerState() === YT.PlayerState.PAUSED) {
            player.playVideo();
        }
    }
});

// Add some interactive elements
document.addEventListener('mousemove', (e) => {
    // Create subtle heart trail on mouse move (throttled)
    if (Math.random() < 0.1) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '12px';
        heart.style.color = 'rgba(255, 107, 157, 0.6)';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = 'fadeUpOut 1s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }
});

// Add fade up animation
const mouseMoveStyle = document.createElement('style');
mouseMoveStyle.textContent = `
    @keyframes fadeUpOut {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mouseMoveStyle);

// Preload and error handling for YouTube API
window.addEventListener('load', () => {
    // Fallback if YouTube API fails to load
    setTimeout(() => {
        if (typeof YT === 'undefined' || !YT.Player) {
            console.log('YouTube API failed to load');
            document.querySelector('.music-player .music-title').textContent = '🎵 Music unavailable';
            musicToggle.style.display = 'none';
        }
    }, 5000);
});

// Add page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
