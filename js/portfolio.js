const dossier = "/media/gall_brendan/";

// Une ligne par photo : le nom du fichier, sa description (alt) et sa légende (facultative)
const photos = [
  { fichier: "img_01.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_02.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_03.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_04.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_07.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_08.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_09.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_10.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_11.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
  { fichier: "img_12.jpeg", alt: "Tatouage réalisé par Brenn", legende: "" },
];

const galerie = document.getElementById("galerie");
const dlg = document.getElementById("visionneuse");
const grand = dlg.querySelector("img");

galerie.innerHTML = photos
  .map(
    (p) => `
  <figure>
    <button type="button" class="vignette" data-grand="${dossier}grand/${p.fichier}">
      <img src="${dossier}mini/${p.fichier}" alt="${p.alt}" loading="lazy" />
    </button>
    ${p.legende ? `<figcaption>${p.legende}</figcaption>` : ""}
  </figure>`,
  )
  .join("");

// un seul écouteur pour toute la galerie
galerie.addEventListener("click", (e) => {
  const bouton = e.target.closest(".vignette");
  if (!bouton) return;
  grand.src = bouton.dataset.grand;
  grand.alt = bouton.querySelector("img").alt;
  dlg.showModal();
});

// un clic en dehors de la photo (ou sur la croix) ferme la visionneuse
dlg.addEventListener("click", (e) => {
  if (e.target !== grand) dlg.close();
});
