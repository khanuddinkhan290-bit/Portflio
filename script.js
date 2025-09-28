// Populate footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Basic reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('inview'); e.target.classList.remove('fade') } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// Projects modal data
const projects = {
    1: { title: 'Shoply — E‑commerce', desc: 'Full e‑commerce experience with cart flows, micro-animations and checkout optimisations.', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400&auto=format&fit=crop' },
    2: { title: 'DocuCare — Health App', desc: 'A patient-focused app with quick appointment flows and accessible UI.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop' },
    3: { title: 'Dashlytics — Dashboard', desc: 'Data-heavy dashboard with custom charts, responsive tables and design system.', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop' }
}
function openProject(id) {
    const p = projects[id];
    document.getElementById('modalContent').innerHTML = `<h2 style="margin-top:0">${p.title}</h2><p style="color:var(--muted)">${p.desc}</p><img src="${p.img}" style="width:100%;border-radius:8px;margin-top:12px"/>`;
    document.getElementById('modal').style.display = 'flex';
}
function closeModal() { document.getElementById('modal').style.display = 'none' }

// Simple testimonials carousel
const slides = document.getElementById('slides'); let idx = 0;
function updateSlides() { slides.style.transform = `translateX(${-idx * (340 + 18)}px)` }
function slideNext() { idx = Math.min(idx + 1, slides.children.length - 1); updateSlides() }
function slidePrev() { idx = Math.max(0, idx - 1); updateSlides() }

// Contact form local handling (no backend) — uses mailto fallback
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(e.target); const name = data.get('name'), email = data.get('email'), msg = data.get('message');
    // Try to open mail client
    const subject = encodeURIComponent('Project inquiry from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    const mailto = `khanuddinkhan290@gmail.com=${subject}&body=${body}`;
    // best-effort: open mail client, then show message
    window.location.href = mailto;
    document.getElementById('formMsg').textContent = 'Opened your mail client. If nothing happened, copy & paste this text to email.';
});

// Mobile: simple overlay menu
function openMobile() {
    const el = document.createElement('div'); el.style.position = 'fixed'; el.style.inset = 0; el.style.background = 'rgba(2,6,23,0.85)'; el.style.zIndex = 999; el.innerHTML = `
        <div style="padding:30px;color:#fff"> <div style='display:flex;justify-content:space-between;align-items:center'><div style='font-weight:700;font-size:18px'>YourName</div><button onclick="this.parentElement.parentElement.remove()">✕</button></div>
        <nav style='margin-top:20px;display:flex;flex-direction:column;gap:12px'>
          <a href="#home" style='color:#fff;text-decoration:none' onclick="event.target.closest('div').remove()">Home</a>
          <a href="#projects" style='color:#fff;text-decoration:none' onclick="event.target.closest('div').remove()">Projects</a>
          <a href="#about" style='color:#fff;text-decoration:none' onclick="event.target.closest('div').remove()">About</a>
          <a href="#clients" style='color:#fff;text-decoration:none' onclick="event.target.closest('div').remove()">Clients</a>
          <a href="#works" style='color:#fff;text-decoration:none' onclick="event.target.closest('div').remove()">Works</a>
          <a href="#contact" style='color:#fff;text-decoration:none' onclick="event.target.closest('div').remove()">Contact</a>
        </nav></div>`;
    document.body.appendChild(el);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => { e.preventDefault(); const id = a.getAttribute('href'); document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); })
})

// keyboard accessibility for modal
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal() } });