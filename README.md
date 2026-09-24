# Portfolio — Nour-Elhouda Sarakhi

Site statique, sans compilation. Entrée : `index.html`.

## Organisation des projets

Développement → Design → Data & BI. Housal, RZ Concept et EcoKephyra ouvrent la sélection ; chaque site possède une page de présentation et un lien public fourni par la propriétaire.

- Housal : https://housalstudio.vercel.app/
- RZ Concept : https://rz-concept-website.vercel.app/
- EcoKephyra : https://www.tamraghtscooter.com/

Les illustrations des trois cartes web sont des compositions typographiques, pas des captures des sites. Les projets sans démo publique proposent leur image réelle quand disponible. Aucun bouton ne prétend ouvrir un code source ou un Behance non fourni.

## Contact

Le formulaire prépare un email dans la messagerie du visiteur via `mailto:`. Il ne dispose pas d’un serveur d’envoi et n’affiche pas de fausse confirmation d’envoi. L’adresse de contact est aussi accessible directement.

## Vérification

Exécuter `node verify.cjs` depuis le dossier du site. Le contrôle couvre les fichiers locaux, ancres, syntaxe JavaScript, ordre des catégories, changements rapides de filtre et préparation du mail.

Les trois sites publics ont répondu HTTP 200 lors du contrôle. Les rapports Power BI peuvent demander une connexion et des autorisations ; leur accès privé n’a pas été validé. La vérification visuelle complète sur navigateur reste à faire.
