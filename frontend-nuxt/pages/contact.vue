<template>
  <div class="contact-page">
    <NavBar/>

    <div class="bg">
      <img class="bg-logo" src="/Image/NIY-logos/niy-logo-3.png" alt="NIGHT is Y" />
    </div>

    <main class="content">
      <section class="veil-wrap">
        <div class="veil">
          <div class="inner">
            <div class="contacts">
              <section v-for="person in people" :key="person.name" class="person">
                <h2 class="person-fullname">{{ person.name }}</h2>
                <div v-for="(e, idx) in person.entries" :key="person.name + idx" class="entry">
                  <div class="role">{{ e.role }}</div>
                  <div class="name">{{ e.name }}</div>
                  <a class="email" :href="`mailto:${e.email}`">{{ e.email }}</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section class="below"></section>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import data from '~/data/contact.json'
import { onMounted } from 'vue'

type Entry = { role: string; name: string; email: string }
type Person = { name: string; entries: Entry[] }
const people = (data.people as Person[])

useHead({ title: 'Contact | NIGHT is Y' })

onMounted(() => {
  const logo = document.querySelector('.bg-logo')
  if (logo) {
    setTimeout(() => {
      logo.classList.add('visible')
    }, 1200) // Optional: increase delay for a slower start
  }
})
</script>

<style scoped>
/* ---------------------------------------------------
   Layout variables
--------------------------------------------------- */
.contact-page {
  --nav-h: 88px;
  --veil-hold: 120vh;
  --veil-alpha: 0.90;
  --veil-color: 89, 55, 146;            /* #593792 */
  --gap: 48px;                          /* space between columns */
  --logo-size: clamp(220px, 30vmin, 380px);   /* MUST match bg logo size */
  --col-min: 420px;                     /* min width per text column */
  --col-max: 560px;                     /* max width per text column */
  background: #000;
  min-height: 100vh;
}

/* ---------------------------------------------------
   Fixed background (never moves) + perfectly centered logo
--------------------------------------------------- */
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: #000;
  display: grid;
  place-items: center;              /* PERFECT vertical + horizontal center */
}

.bg-logo {
  width: var(--logo-size);
  max-width: 90vw;
  height: auto;
  object-fit: contain;
  opacity: 0;
  transition: opacity 8s cubic-bezier(0.4, 0, 0.2, 1); /* Very slow fade-in */
}

.bg-logo.visible {
  opacity: 1;
}

/* ---------------------------------------------------
   Scroll stack
--------------------------------------------------- */
.content {
  position: relative;
  z-index: 1;
}

.veil-wrap { height: calc(100vh + var(--veil-hold)); }

/* Veil covers NAV + viewport on load */
.veil {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 200;
  background: rgba(var(--veil-color), var(--veil-alpha));
  color: #fff;
  display: grid;
  place-items: center;
  padding: 32px 24px;
  overflow: hidden;
}

/* ---------------------------------------------------
   Inner layout & type
--------------------------------------------------- */
.inner {
  /* Make the inner width exactly wide enough for:
     left column + spacer (logo) + right column + gaps */
  max-width: calc(var(--col-max) + var(--logo-size) + var(--col-max) + (2 * var(--gap)));
  width: 100%;
  margin: 0 auto;
  font-family: "proxima-nova", sans-serif;
}

/* THREE-COLUMN GRID:
   [left contacts] [center spacer = logo width] [right contacts]  */
.contacts {
  display: grid;
  grid-template-columns:
    minmax(280px, 380px)   /* Left column is now closer to the logo */
    var(--logo-size)
    minmax(280px, 380px);  /* Right column stays as is */
  column-gap: var(--gap);
  align-items: start;
  justify-content: center;
}

/* Place the two people in left and right columns explicitly */
.person:nth-child(1) { grid-column: 1; }
.person:nth-child(2) { grid-column: 3; }

/* Person name — keep your 32/40 spec */
.person-fullname,
.person-name {
  margin: 0 0 10px 0;
  font-size: 22px;
  line-height: 28px;
}

/* One entry = exactly 3 lines (role / name / email) */
.entry {
  margin: 0 0 24px 0;
}

.role,
.name,
.email {
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.08px;
  text-transform: uppercase;
  font-weight: 400;
  color: #fff;

  /* Show the full line — no truncation or ellipsis */
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
}

.email {
  display: inline-block;
  text-decoration: underline;
  word-break: normal;
}

/* Tail after veil releases */
.below {
  height: 60vh;
  background: transparent;
}

/* ------------------ Responsive ------------------ */
@media (max-width: 1200px) {
  /* As space tightens, allow columns to flex a bit smaller */
  .contact-page { --col-min: 340px; --col-max: 480px; --gap: 36px; }
}

@media (max-width: 900px) {
  /* Stack into one column on mobile; logo above content remains centered */
  .contacts {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 24px;
  }
  .person:nth-child(1),
  .person:nth-child(2) { grid-column: 1; }

  /* Let role/name/email wrap normally on small screens */
  .role,
  .name,
  .email { white-space: normal; }
}

.person {
  padding-left: 64px;           /* Shift text to the right by two tab widths */
  transform: translateY(-16px); /* Shift up by about half a tab */
}
</style>
