<template>
  <div class="contact-page">
    <NavBar/>

    <div class="bg">
      <video class="bg-video" autoplay muted loop playsinline>
        <source :src="data.backgroundVideo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
import { onMounted } from 'vue'
import { useAsyncData, useHead } from '#imports'

import NavBar from '@/components/NavBar.vue'
import data from '~/data/contact.json'
import { sanityClient } from '~/utils/sanityClient'
import { CONTACT_QUERY } from '~/lib/queries/contact'

type Entry = {
  role: string
  name: string
  email: string
}

type Person = {
  name: string
  entries: Entry[]
}

const { data: contact } = await useAsyncData('contact', () =>
  sanityClient().fetch(CONTACT_QUERY)
)

// Contacts come from Sanity
const people = (contact.value?.people || []) as Person[]

// Background video stays locked in JSON
const backgroundVideo = data.backgroundVideo

useHead({ title: 'Contact | Night Is Y' })

onMounted(() => {
  const video = document.querySelector('.bg-video') as HTMLVideoElement | null
  if (video) {
    video.playbackRate = 0.5
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
  --veil-color: 0, 0, 0;  /* black background */   /* #593792 */
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
  display: grid;
  place-items: center;
  background: #000;
  overflow: hidden;
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

.bg-video {
  width: 45vw;
  height: 45vh;
  max-width: 700px;
  max-height: 400px;
  object-fit: cover;
  opacity: 0.6;
  transition: opacity 2s ease;
  display: block;
  margin: 0 auto;
  /* Slow down playback */
  animation: none;
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
  height: calc(100vh - 40px); /* leave 40px gap at bottom */
  z-index: 200;
  background: rgba(40, 40, 48, 0.35); /* dark grey, slightly transparent */
  color: #fff;
  display: grid;
  place-items: center;
  padding: 32px 24px;
  overflow: hidden;
  box-shadow: 0 -4px 10px rgba(0,0,0,0.3); /* subtle edge shadow */
}

.below {
  height: 40px; /* same as gap above */
  background: transparent;
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
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
}

/* Overrides */
.role,
.name { font-style: italic; }

.email {
  font-style: normal;
  text-decoration: underline;
  display: inline-block;
  word-break: normal;
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

/* ---------- Large Laptops & Small Desktops (≤1440px) ---------- */
@media (max-width: 1440px) {
  .contact-page {
    --col-min: 380px;
    --col-max: 520px;
    --gap: 40px;
  }

  .contacts {
    grid-template-columns:
      minmax(260px, 340px)
      var(--logo-size)
      minmax(260px, 340px);
  }

  .person-fullname,
  .person-name {
    font-size: 20px;
  }

  .role,
  .name,
  .email {
    font-size: 15px;
  }

  .bg-video {
    width: 50vw;
    height: auto;
    max-width: 600px;
  }
}

/* ---------- Tablets Landscape & Small Laptops (≤1024px) ---------- */
@media (max-width: 1024px) {
  .contact-page {
    --col-min: 320px;
    --col-max: 420px;
    --gap: 32px;
  }

  .contacts {
    grid-template-columns:
      minmax(240px, 320px)
      var(--logo-size)
      minmax(240px, 320px);
  }

  .person {
    padding-left: 48px;
  }

  .person-fullname,
  .person-name {
    font-size: 18px;
  }

  .role,
  .name,
  .email {
    font-size: 14px;
  }

  .bg-video {
    width: 60vw;
    height: auto;
    max-width: 500px;
  }
}

/* ---------- Small Phones (≤430px) ---------- */
@media (max-width: 430px) {
  .contact-page {
    --gap: 20px;
    --logo-size: 200px;
  }

  .contacts {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }

  .person-fullname,
  .person-name {
    font-size: 16px;
    line-height: 22px;
  }

  .role,
  .name,
  .email {
    font-size: 13px;
    line-height: 20px;
  }

  .bg-video {
    width: 80vw;
    height: auto;
    max-width: 360px;
  }
}


/* ---------------- 1440px and below ---------------- */
@media (max-width: 1440px) {
  .person-fullname,
  .person-name {
    font-size: clamp(18px, 1.5vw, 20px);
    line-height: 1.3;
  }

  .role,
  .name,
  .email {
    font-size: clamp(13.5px, 1.1vw, 15px);
    line-height: 1.4;
  }
}

/* ---------------- 1024px (Tablets Landscape / Small Laptops) ---------------- */
@media (max-width: 1024px) {
  .person-fullname,
  .person-name {
    font-size: clamp(16px, 1.4vw, 18px);
    line-height: 1.35;
  }

  .role,
  .name,
  .email {
    font-size: clamp(13px, 1.1vw, 14px);
    line-height: 1.35;
  }

  .person {
    padding-left: 48px;
  }
}

/* ---------------- 768px (Tablets Portrait) ---------------- */
@media (max-width: 768px) {
  .person-fullname,
  .person-name {
    font-size: clamp(15px, 1.4vw, 17px);
    line-height: 1.35;
  }

  .role,
  .name,
  .email {
    font-size: clamp(12.5px, 1.1vw, 13.5px);
    line-height: 1.35;
  }

  .person {
    padding-left: 32px;
  }
}

/* ---------------- 600px (Large Phones) ---------------- */
@media (max-width: 600px) {
  .person-fullname,
  .person-name {
    font-size: 15px;
    line-height: 20px;
  }

  .role,
  .name,
  .email {
    font-size: 13px;
    line-height: 18px;
  }

  .person {
    padding-left: 24px;
  }
}

/* ---------------- 430px (Small Phones) ---------------- */
@media (max-width: 430px) {
  .person-fullname,
  .person-name {
    font-size: 14px;
    line-height: 20px;
  }

  .role,
  .name,
  .email {
    font-size: 12.5px;
    line-height: 18px;
  }

  .contacts {
    row-gap: 16px;
  }

  .person {
    padding-left: 16px;
    transform: translateY(0);
  }
}

/* ---------------- 360px (Extra Small Phones) ---------------- */
@media (max-width: 360px) {
  .person-fullname,
  .person-name {
    font-size: 13.5px;
    line-height: 18px;
  }

  .role,
  .name,
  .email {
    font-size: 12px;
    line-height: 17px;
  }
}
</style>