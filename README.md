# Portfolio — Nour-Elhouda Sarakhi

Site statique, sans compilation. Entrée : `index.html`.

## Organisation des projets

Profil visé : développeuse web & mobile. Ordre de la page : intro → accueil → à propos → expériences → stack → projet phare ExportAuto (`exportauto.html`) → projets web & mobile (filtre Tous / Web / Mobile) → data → design → contact.

Sites publics, chacun avec sa page de présentation :

- Housal : https://housalstudio.vercel.app/
- RZ Concept : https://rz-concept-website.vercel.app/
- EcoKephyra : https://www.tamraghtscooter.com/

Les cartes web utilisent de vraies captures des sites (`images/thumbs/`). Les miniatures sont des JPEG allégés ; les originaux restent dans `images/`. Aucun bouton ne prétend ouvrir un code source ou un Behance non fourni.

Pour régler l'intro sans qu'elle disparaisse : ouvrir `index.html?intro=hold`.

## Contact

Le formulaire prépare un email dans la messagerie du visiteur via `mailto:`. Il ne dispose pas d’un serveur d’envoi et n’affiche pas de fausse confirmation d’envoi. L’adresse de contact est aussi accessible directement.

## Vérification

Exécuter `node verify.cjs` depuis le dossier du site. Le contrôle couvre les fichiers locaux, ancres, syntaxe JavaScript, présence des projets et des sites publics, compteurs des filtres et préparation du mail.

Les trois sites publics ont répondu HTTP 200 lors du contrôle. Les rapports Power BI peuvent demander une connexion et des autorisations ; leur accès privé n’a pas été validé. La vérification visuelle complète sur navigateur reste à faire.

Dar Limon : logo de profil et cinq visuels importés de la page Instagram fournie, le 25 septembre 2026. Images locales pour éviter les liens CDN expirants. Quatre publications et un aperçu global sont présentés, avec liens vers les publications sources. Carte de visite mentionnée parmi les livrables selon la propriétaire ; fichier original non fourni.
