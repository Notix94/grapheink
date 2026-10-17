const form = document.querySelector(".zone-formulaire form");
const resultat = document.getElementById("resultat");
const bouton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.querySelector("textarea[name=h-captcha-response]")?.value) {
    resultat.className = "resultat resultat-erreur";
    resultat.textContent = "Valide d'abord le captcha avant d'envoyer.";
    return;
  }
  bouton.disabled = true;
  bouton.textContent = "Envoi en cours...";
  resultat.textContent = "";

  try {
    const reponse = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    const data = await reponse.json();
    if (!data.success) throw new Error(data.message);

    form.hidden = true;
    resultat.className = "resultat resultat-ok";
    resultat.textContent =
      "Merci, ta demande est bien envoyée. Je reviens vers toi rapidement.";
  } catch (erreur) {
    if (window.hcaptcha) hcaptcha.reset();
    bouton.disabled = false;
    bouton.textContent = "Envoyer ma demande";
    resultat.className = "resultat resultat-erreur";
    resultat.textContent =
      "L'envoi a échoué. Réessaie, ou écris directement à graphiteinktattoo@gmail.com.";
  }
});
