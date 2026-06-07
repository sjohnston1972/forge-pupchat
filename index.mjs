export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/home") {
      return new Response(PAGE, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return new Response("404 - Page not found (the dog ate it)", { status: 404 });
  },
};

const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
<meta name="theme-color" content="#3b5998">
<title>Dogbook - Welcome</title>
<style>
  * { box-sizing: border-box; -webkit-tap-highlight-color: rgba(59,89,152,0.15); }
  body {
    margin: 0;
    background: #d8dfea;
    font-family: "Lucida Grande", Tahoma, Verdana, Arial, sans-serif;
    font-size: 12px;
    color: #1c1e21;
    -webkit-text-size-adjust: 100%;
  }
  a { color: #3b5998; text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* Top blue bar */
  .topbar {
    background: #3b5998;
    border-bottom: 1px solid #133783;
    min-height: 42px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: -1px;
    font-family: "Klavika", "Lucida Grande", Tahoma, sans-serif;
    padding-right: 16px;
    flex-shrink: 0;
  }
  .logo span { color: #aebbdc; }
  .topnav { display: flex; gap: 2px; }
  .topnav a {
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    padding: 6px 9px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .topnav a:hover { background: #45619d; text-decoration: none; }
  .topsearch { margin-left: auto; display: flex; align-items: center; gap: 8px; }
  .topsearch input {
    border: 1px solid #19315b;
    padding: 5px 6px;
    font-size: 12px;
    width: 140px;
  }
  .topsearch .me { color: #fff; font-weight: bold; }
  .topsearch .tlink { color:#fff; }

  /* Layout */
  .wrap { max-width: 940px; margin: 0 auto; padding: 12px; display: flex; gap: 12px; align-items: flex-start; }
  .left { width: 200px; flex-shrink: 0; }
  .center { flex: 1; min-width: 0; }
  .right { width: 200px; flex-shrink: 0; }

  /* Profile card */
  .card {
    background: #fff;
    border: 1px solid #b3b3b3;
    margin-bottom: 12px;
  }
  .card-h {
    background: #6d84b4;
    color: #fff;
    font-weight: bold;
    padding: 6px 8px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-h a { color: #d8dfea; font-weight: normal; }
  .card-b { padding: 8px; }

  .pfp {
    width: 100%;
    display: block;
    border: 1px solid #ccc;
    background: #eee;
  }
  .pname { font-size: 16px; font-weight: bold; color: #333; margin: 6px 0 2px; }
  .pmeta { color: #666; margin-bottom: 8px; line-height: 1.6; }
  .pmeta b { color: #333; }

  .sidemenu { list-style: none; margin: 0; padding: 0; }
  .sidemenu li { border-bottom: 1px solid #eee; }
  .sidemenu li:last-child { border-bottom: none; }
  .sidemenu a { display: block; padding: 9px 8px; }

  /* Status box */
  .statusbox textarea {
    width: 100%;
    border: 1px solid #bdc7d8;
    padding: 8px;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    min-height: 46px;
  }
  .statusrow { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; gap: 8px; }
  .btn {
    background: #5b74a8;
    border: 1px solid #29447e;
    border-top-color: #6e84af;
    color: #fff;
    font-weight: bold;
    font-size: 13px;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 2px;
  }
  .btn:hover { background: #4f6aa3; }
  .hint { color:#999; }

  /* Feed posts */
  .post { display: flex; gap: 8px; padding: 12px 8px; border-bottom: 1px solid #eee; }
  .post:last-child { border-bottom: none; }
  .post .avatar { width: 44px; height: 44px; border: 1px solid #ccc; flex-shrink: 0; background:#eee; }
  .post .body { flex: 1; min-width: 0; }
  .post .who { font-weight: bold; }
  .post .text { margin: 2px 0; line-height: 1.5; }
  .post .actions { color: #999; font-size: 12px; margin-top: 4px; }
  .post .actions a { color: #3b5998; padding: 4px 0; display: inline-block; }
  .post .time { color: #999; }

  .feedfilter { padding: 6px 8px; border-bottom: 2px solid #3b5998; background:#f7f7f7; display:flex; gap:4px; overflow-x:auto; }
  .feedfilter a { font-weight: bold; padding: 6px 10px; white-space: nowrap; }
  .feedfilter a.active { background:#3b5998; color:#fff; border-radius:2px; }

  /* Right column ads / suggestions */
  .ad { padding: 8px; border-bottom: 1px solid #eee; line-height:1.5; }
  .ad b { color:#333; }
  .pug-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; }
  .pug-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; border:1px solid #ccc; }

  .footer { text-align: center; color: #6d84b4; padding: 14px; font-size: 11px; line-height:1.6; }

  .likes { background:#f2f4f9; border:1px solid #d8dfea; padding:5px 7px; margin-top:5px; border-radius:2px; color:#666; line-height:1.6; }

  /* Mobile bottom tab bar - hidden on desktop */
  .mobilebar { display: none; }

  @media (max-width: 720px) {
    body { font-size: 13px; padding-bottom: 56px; }
    .wrap {
      flex-direction: column;
      padding: 8px;
      gap: 8px;
    }
    .left, .right, .center { width: 100%; }
    /* Feed first, then profile info, then ads */
    .center { order: 1; }
    .left { order: 2; }
    .right { order: 3; }

    /* Top bar: hide text nav (we use bottom bar), keep search */
    .topbar { padding: 0 10px; }
    .topnav { display: none; }
    .logo { font-size: 24px; padding-right: 10px; }
    .topsearch input { width: 100%; flex: 1; padding: 7px 8px; font-size: 14px; }
    .topsearch .tlink { display: none; }
    .topsearch .me { display: none; }
    .topsearch { gap: 6px; }

    .card { margin-bottom: 8px; }

    /* Make profile card horizontal on mobile to save space */
    .profilecard .card-b { display: flex; align-items: center; gap: 12px; text-align: left !important; }
    .profilecard .pfp { width: 84px; height: 84px; flex-shrink: 0; }
    .profilecard .pname { margin: 0 0 2px; font-size: 18px; }

    .post .avatar { width: 48px; height: 48px; }
    .post .text { font-size: 14px; }

    /* Mobile bottom navigation */
    .mobilebar {
      display: flex;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 56px;
      background: #3b5998;
      border-top: 1px solid #133783;
      z-index: 200;
    }
    .mobilebar a {
      flex: 1;
      color: #cdd5e8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      gap: 2px;
    }
    .mobilebar a .ico { font-size: 20px; }
    .mobilebar a.active { color: #fff; }
  }

  @media (max-width: 380px) {
    .logo { font-size: 20px; }
  }
</style>
</head>
<body>

<div class="topbar">
  <div class="logo">dog<span>book</span></div>
  <div class="topnav">
    <a href="#">Home</a>
    <a href="#">Profile</a>
    <a href="#">Friends</a>
    <a href="#">Sniffs</a>
  </div>
  <div class="topsearch">
    <span class="me">Rex Goodboy</span>
    <a href="#" class="tlink">Settings</a>
    <a href="#" class="tlink">Logout</a>
    <input placeholder="Search dogs...">
  </div>
</div>

<div class="wrap">

  <!-- LEFT -->
  <div class="left">
    <div class="card profilecard">
      <div class="card-b" style="text-align:center;">
        <img class="pfp" alt="Rex" src="data:image/svg+xml;utf8,${encodeURIComponent(dogSvg('#8B5E3C','Rex'))}">
        <div>
          <div class="pname">Rex Goodboy</div>
          <div class="hint">&quot;Such treat. Very fetch.&quot;</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-h">Profile</div>
      <ul class="sidemenu">
        <li><a href="#">🦴 Wall</a></li>
        <li><a href="#">📷 Photos <span class="hint">(247)</span></a></li>
        <li><a href="#">🎾 Toys <span class="hint">(31)</span></a></li>
        <li><a href="#">🐾 Pack <span class="hint">(89)</span></a></li>
        <li><a href="#">🦴 Buried Items <span class="hint">(12)</span></a></li>
      </ul>
    </div>

    <div class="card">
      <div class="card-h">Information</div>
      <div class="card-b pmeta">
        <b>Breed:</b> Golden Retriever<br>
        <b>Age:</b> 4 (28 in dog years)<br>
        <b>Relationship:</b> It's complicated with the mailman<br>
        <b>Hometown:</b> The Backyard<br>
        <b>Favorite treat:</b> All of them
      </div>
    </div>
  </div>

  <!-- CENTER -->
  <div class="center">
    <div class="card">
      <div class="card-h">What's on your snout, Rex?</div>
      <div class="card-b statusbox">
        <textarea id="statusInput" placeholder="Bark something..."></textarea>
        <div class="statusrow">
          <span class="hint">😋 Sniffing the breeze</span>
          <button class="btn" onclick="postStatus()">Share</button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="feedfilter">
        <a href="#" class="active">News Feed</a>
        <a href="#">Top Sniffs</a>
        <a href="#">Most Recent</a>
      </div>
      <div id="feed"></div>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="right">
    <div class="card">
      <div class="card-h">Sponsored</div>
      <div class="ad">
        <b>Infinite Tennis Balls</b><br>
        <span class="hint">They never stop coming. The dream is real. Click to drool.</span>
      </div>
      <div class="ad">
        <b>Squirrel Dating</b><br>
        <span class="hint">Meet squirrels in YOUR yard. Warning: they always get away.</span>
      </div>
    </div>

    <div class="card">
      <div class="card-h">Pack Suggestions <a href="#">see all</a></div>
      <div class="card-b">
        <div class="pug-grid" id="suggest"></div>
      </div>
    </div>

    <div class="card">
      <div class="card-h">Upcoming Events</div>
      <div class="card-b pmeta">
        🦴 <b>Dinner Time</b><br><span class="hint">Today at 6:00 PM</span><br><br>
        🚶 <b>The Walk</b><br><span class="hint">Tomorrow, maybe, if you behave</span><br><br>
        🛁 <b>Bath</b> 😱<br><span class="hint">Sunday — pretend you're asleep</span>
      </div>
    </div>
  </div>

</div>

<div class="footer">
  Dogbook © 2009 &middot; A WoofWide Web Company &middot; About &middot; Advertising &middot; Terms &middot; Help<br>
  Dogbook is free and always will be (we accept payment in treats).
</div>

<!-- Mobile bottom tab bar -->
<div class="mobilebar">
  <a href="#" class="active" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;"><span class="ico">🏠</span>Home</a>
  <a href="#"><span class="ico">🐶</span>Profile</a>
  <a href="#"><span class="ico">🐾</span>Pack</a>
  <a href="#" onclick="focusStatus();return false;"><span class="ico">✏️</span>Post</a>
  <a href="#"><span class="ico">🔔</span>Sniffs</a>
</div>

<script>
const colors = ['#8B5E3C','#4A4A4A','#C9A66B','#2E2E2E','#A0522D','#D2B48C','#5C4033','#6B6B6B'];
const friends = [
  {name:'Bella Pawsworth', breed:'Poodle'},
  {name:'Max Barkley', breed:'German Shepherd'},
  {name:'Luna Fluffington', breed:'Husky'},
  {name:'Duke Sniffowski', breed:'Beagle'},
  {name:'Daisy Wagsalot', breed:'Corgi'},
  {name:'Cooper Drools', breed:'Bulldog'},
  {name:'Bailey Fetchmore', breed:'Labrador'},
  {name:'Rocky Chewbone', breed:'Boxer'},
  {name:'Penny Zoomies', breed:'Dachshund'}
];

function dogAvatar(name, i) {
  const c = colors[i % colors.length];
  const initial = name[0];
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44">' +
    '<rect width="44" height="44" fill="' + c + '"/>' +
    '<circle cx="22" cy="17" r="10" fill="rgba(255,255,255,0.85)"/>' +
    '<ellipse cx="10" cy="11" rx="5" ry="8" fill="' + c + '"/>' +
    '<ellipse cx="34" cy="11" rx="5" ry="8" fill="' + c + '"/>' +
    '<circle cx="22" cy="20" r="2.5" fill="#333"/>' +
    '<text x="22" y="40" font-size="9" fill="#fff" text-anchor="middle" font-family="Arial">' + initial + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const initialPosts = [
  {who:'Bella Pawsworth', text:'Saw a squirrel today. Did NOT catch it. Will try again tomorrow. 🐿️', time:'about an hour ago', likes:14, comments:['Max Barkley: classic squirrel','Duke Sniffowski: stay strong queen']},
  {who:'Max Barkley', text:'UPDATE: the vacuum cleaner is still my mortal enemy. Defended the living room valiantly. 🧹😤', time:'2 hours ago', likes:31, comments:['Rocky Chewbone: that thing is pure evil']},
  {who:'Luna Fluffington', text:'AWOOOOOOOOO. That is all.', time:'3 hours ago', likes:22, comments:['Cooper Drools: AWOOO back at ya','Penny Zoomies: i felt that']},
  {who:'Daisy Wagsalot', text:'My human said "who\\'s a good girl?" and honestly... it was me. It was me the whole time. 🥹', time:'5 hours ago', likes:48, comments:[]},
  {who:'Duke Sniffowski', text:'Followed a smell for 45 minutes. No regrets. The smell? Unknown. Worth it? Absolutely.', time:'6 hours ago', likes:19, comments:['Bailey Fetchmore: a true detective']},
  {who:'Cooper Drools', text:'is now friends with The Couch, The Other Couch, and That One Warm Sunbeam.', time:'8 hours ago', likes:11, comments:[]},
];

let posts = initialPosts.slice();

function render() {
  const feed = document.getElementById('feed');
  feed.innerHTML = posts.map((p, idx) => {
    const fi = friends.findIndex(f => f.name === p.who);
    const av = dogAvatar(p.who, fi >= 0 ? fi : idx);
    const comments = (p.comments||[]).map(c => '<div class="hint" style="margin-top:3px;">💬 ' + esc(c) + '</div>').join('');
    return '<div class="post">' +
      '<img class="avatar" src="' + av + '">' +
      '<div class="body">' +
        '<span class="who">' + esc(p.who) + '</span> ' +
        '<span class="text">' + esc(p.text) + '</span>' +
        '<div class="likes">👍 <span id="likes-'+idx+'">' + p.likes + '</span> dogs sniffed this' + (comments ? comments : '') + '</div>' +
        '<div class="actions"><span class="time">' + p.time + '</span> &middot; ' +
        '<a href="#" onclick="like('+idx+');return false;">Paw Five</a> &middot; ' +
        '<a href="#" onclick="bark('+idx+');return false;">Bark</a></div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function esc(s){ return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function like(idx){
  posts[idx].likes++;
  document.getElementById('likes-'+idx).textContent = posts[idx].likes;
}
function bark(idx){
  alert('🐶 You barked at ' + posts[idx].who + '! WOOF WOOF!');
}

function postStatus(){
  const inp = document.getElementById('statusInput');
  const val = inp.value.trim();
  if(!val) return;
  posts.unshift({who:'Rex Goodboy', text:val, time:'just now', likes:0, comments:[]});
  inp.value='';
  render();
}

function focusStatus(){
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(()=>{ document.getElementById('statusInput').focus(); }, 300);
}

function renderSuggest(){
  const s = document.getElementById('suggest');
  s.innerHTML = friends.slice(0,9).map((f,i) =>
    '<div><img src="' + dogAvatar(f.name, i) + '" title="' + f.name + '"></div>'
  ).join('');
}

render();
renderSuggest();
</script>
</body>
</html>`;

function dogSvg(color, name) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">' +
    '<rect width="180" height="180" fill="' + color + '"/>' +
    '<ellipse cx="45" cy="55" rx="22" ry="38" fill="' + color + '" stroke="rgba(0,0,0,0.2)"/>' +
    '<ellipse cx="135" cy="55" rx="22" ry="38" fill="' + color + '" stroke="rgba(0,0,0,0.2)"/>' +
    '<circle cx="90" cy="85" r="48" fill="rgba(255,255,255,0.9)"/>' +
    '<circle cx="72" cy="78" r="7" fill="#333"/>' +
    '<circle cx="108" cy="78" r="7" fill="#333"/>' +
    '<ellipse cx="90" cy="100" rx="11" ry="8" fill="#333"/>' +
    '<path d="M90 108 Q78 120 68 112 M90 108 Q102 120 112 112" stroke="#333" stroke-width="3" fill="none"/>' +
    '<text x="90" y="160" font-size="20" fill="#fff" text-anchor="middle" font-family="Arial" font-weight="bold">' + name + '</text>' +
    '</svg>';
}
