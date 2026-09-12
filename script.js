// ============================================================
  // QUICK CUSTOMIZATION — edit these two lines
  // ============================================================
  document.getElementById('wife-name').textContent = "My Love"; // <-- her name
  // Edit the love note text directly in the HTML above, inside <div class="letter">

  // Floating hearts/sparkles in hero
  (function floaties(){
    const layer = document.getElementById('floaties');
    const symbols = ['♥','✦','🎈','✨'];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = reduced ? 0 : 16;
    for(let i=0;i<count;i++){
      const el = document.createElement('span');
      el.className = 'floaty';
      el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      el.style.left = Math.random()*100 + '%';
      el.style.animationDuration = (8 + Math.random()*10) + 's';
      el.style.animationDelay = (Math.random()*10) + 's';
      el.style.fontSize = (1 + Math.random()*1.3) + 'rem';
      layer.appendChild(el);
    }
  })();

  // Confetti burst
  function burstConfetti(x, y, count){
    const layer = document.getElementById('confetti-layer');
    const colors = ['#e7b65b','#f2a6b7','#c1465a','#fbf1e6','#8fd3c7'];
    for(let i=0;i<count;i++){
      const c = document.createElement('div');
      c.className = 'confetto';
      c.style.left = (x + (Math.random()*200-100)) + 'px';
      c.style.top = (y) + 'px';
      c.style.background = colors[Math.floor(Math.random()*colors.length)];
      c.style.animationDuration = (2 + Math.random()*1.5) + 's';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      layer.appendChild(c);
      setTimeout(()=>c.remove(), 4000);
    }
  }

  // Cake wish
  const wishBtn = document.getElementById('wishBtn');
  const cakeStage = document.getElementById('cakeStage');
  const wishText = document.getElementById('wishText');
  const wishOverlay = document.getElementById('wishOverlay');
  const wishModalClose = document.getElementById('wishModalClose');

  wishBtn.addEventListener('click', () => {
    cakeStage.classList.add('blown');
    wishText.classList.add('show');
    wishBtn.disabled = true;
    wishBtn.textContent = "Wish sent 🎉";
    const rect = cakeStage.getBoundingClientRect();
    burstConfetti(rect.left + rect.width/2, rect.top + window.scrollY, 60);

    // Show the birthday popup shortly after the candles go out
    setTimeout(() => {
      wishOverlay.classList.add('show');
    }, 500);
  });

  wishModalClose.addEventListener('click', () => {
    wishOverlay.classList.remove('show');
  });

  // Also close popup if clicking the dark backdrop
  wishOverlay.addEventListener('click', (e) => {
    if (e.target === wishOverlay){
      wishOverlay.classList.remove('show');
    }
  });

  // Envelope open
  const envelope = document.getElementById('envelope');
  const envelopeHint = document.getElementById('envelopeHint');
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
    envelopeHint.textContent = envelope.classList.contains('open')
      ? 'tap again to fold it back up'
      : 'tap the envelope to open it';
  });

  // Music toggle
  // const song = document.getElementById('bgSong');
  // const musicBtn = document.getElementById('music-toggle');
  // const musicNote = document.getElementById('music-note');
  // let noteTimeout;
  // musicBtn.addEventListener('click', async () => {
  //   if (song.paused){
  //     try{
  //       await song.play();
  //       musicBtn.classList.add('playing');
  //     }catch(err){
  //       musicNote.classList.add('show');
  //       clearTimeout(noteTimeout);
  //       noteTimeout = setTimeout(()=>musicNote.classList.remove('show'), 3500);
  //     }
  //   } else {
  //     song.pause();
  //     musicBtn.classList.remove('playing');
  //   }
  // });

  // Music — auto-play on entry, with a fallback for browsers that block it
const song = document.getElementById('bgSong');
const musicBtn = document.getElementById('music-toggle');
const musicNote = document.getElementById('music-note');
let noteTimeout;

function startSong(){
  song.play()
    .then(() => musicBtn.classList.add('playing'))
    .catch(() => {
      // Autoplay was blocked by the browser — start on the first tap/click anywhere
      const resume = () => {
        song.play().then(() => musicBtn.classList.add('playing')).catch(()=>{});
        document.removeEventListener('click', resume);
        document.removeEventListener('touchstart', resume);
      };
      document.addEventListener('click', resume, { once:true });
      document.addEventListener('touchstart', resume, { once:true });
    });
}
window.addEventListener('DOMContentLoaded', startSong);

musicBtn.addEventListener('click', async () => {
  if (song.paused){
    try{
      await song.play();
      musicBtn.classList.add('playing');
    }catch(err){
      musicNote.classList.add('show');
      clearTimeout(noteTimeout);
      noteTimeout = setTimeout(()=>musicNote.classList.remove('show'), 3500);
    }
  } else {
    song.pause();
    musicBtn.classList.remove('playing');
  }
});
