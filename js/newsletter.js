// Le script de Brevo envoie le formulaire sans passer par la validation du navigateur :
// on bloque nous-mêmes l'envoi tant que la case de consentement n'est pas cochée.
const caseConsentement = document.getElementById("consentement");
const erreurConsentement = document.getElementById("erreur-consentement");

function verifierConsentement(e) {
  if (caseConsentement.checked) {
    erreurConsentement.hidden = true;
    return;
  }
  e.preventDefault();
  e.stopImmediatePropagation(); // le script de Brevo ne voit jamais ce clic
  erreurConsentement.hidden = false;
  caseConsentement.focus();
}

// phase de capture : on passe avant les écouteurs de Brevo
document.addEventListener(
  "click",
  (e) => {
    if (e.target.closest(".sib-form-block__button")) verifierConsentement(e);
  },
  true,
);
document.addEventListener(
  "submit",
  (e) => {
    if (e.target.id === "sib-form") verifierConsentement(e);
  },
  true,
);

caseConsentement.addEventListener("change", () => {
  if (caseConsentement.checked) erreurConsentement.hidden = true;
});
