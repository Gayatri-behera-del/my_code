document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelectorAll('.skill-fill');
  const sections = document.querySelectorAll('section');

  // Skill bar animation
  const skillOptions = { root:null, rootMargin:'0px', threshold:0.5 };
  const fillSkill = (entry) => { if(entry.isIntersecting){ const bar = entry.target; const width = bar.getAttribute('data-width'); bar.style.width = width; } };
  const skillObserver = new IntersectionObserver((entries)=>{ entries.forEach(entry => fillSkill(entry)); }, skillOptions);
  skills.forEach(skill => skillObserver.observe(skill));

  // Section fade-in on scroll
  const sectionOptions = { root:null, rootMargin:'0px', threshold:0.1 };
  const showSection = (entry) => { if(entry.isIntersecting){ entry.target.classList.add('visible'); } };
  const sectionObserver = new IntersectionObserver((entries)=>{ entries.forEach(entry => showSection(entry)); }, sectionOptions);
  sections.forEach(section => sectionObserver.observe(section));
});
