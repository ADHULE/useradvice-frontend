### Hooks — Custom React Hooks Collection

Ce dossier regroupe une série de custom hooks React réutilisables, conçus pour améliorer l’organisation, la maintenabilité et la productivité dans le développement front-end.

Chaque hook gère une logique spécifique (authentification, stockage, thèmes, requêtes HTTP, formulaires, pagination, WebSocket, etc.).

### Liste des Hooks & Rôles

### useAuth.js

Gère toute la logique d’authentification :

Connexion / déconnexion

Stockage et lecture du token

Récupération de l’utilisateur connecté

Protection des routes
C’est le hook central pour tout ce qui touche à la session utilisateur.

### useAxios.js

Fournit une instance Axios déjà configurée :

Base URL

Headers automatiques

Ajout du token au header

Gestion des intercepteurs (erreurs, refresh token…)
Permet d’éviter de répéter les mêmes paramètres dans chaque requête.

### useFetch.js

Simplifie les appels API HTTP :

loading, error, data

Auto-fetch ou fetch manuel

Support GET, POST, PUT…
Idéal pour récupérer des données depuis un composant.

### useLocalStorage.js

Un wrapper pratique autour de localStorage :

Lecture / écriture simplifiées

Synchronisation automatique avec React state
Utile pour stocker préférences, tokens, langue, thème…

## useTheme.js

Gère le mode visuel de l’application :

light / dark

Stockage dans localStorage

Applique les classes sur le body

Support du thème auto-système
Parfait pour un Dark Mode propre et persistant.

## useDebounce.js

Empêche l’exécution trop rapide d’une fonction :

Idéal pour les champs de recherche

Optimise les performances
Exemple : attendre 300 ms après que l’utilisateur arrête d’écrire.

## useForm.js

Un hook puissant pour la gestion des formulaires :

Gestion des valeurs

Gestion des erreurs

handleChange, handleSubmit

Validation personnalisée
Remplace des librairies lourdes si tu veux une solution légère.

## useWebSocket.js

Simplifie la gestion des WebSockets :

Connexion automatique

Reconnexion

Envoi / réception de messages
Indispensable pour chat, notifications live, dashboards, IoT…

## useKeyboard.js

Écoute et réagit à des touches clavier :

Appuyer sur Escape pour fermer une modal

Navigation clavier
Très utile pour l’accessibilité et les interactions avancées.

## usePagination.js

Gère toute la logique d’une pagination front-end :

Page actuelle

Navigation (next, prev, goto)

Découpage automatique des données
Utilisable pour listes, tables, pages d’admin…
