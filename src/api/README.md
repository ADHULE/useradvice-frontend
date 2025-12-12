### API — Services front-end React

Le dossier /api centralise tous les appels API vers le back-end Spring Boot.
Toutes les requêtes passent par useAxios.js, qui gère :

Base URL

Headers (Content-Type, Authorization)

Interceptors pour token et erreurs globales

Cette organisation rend les appels réutilisables, maintenables et cohérents.

## /api

## │

## ├── useAxios.js # Configuration Axios centrale

## ├── oauthApi.js # Social login (Google, GitHub, Facebook)

## ├── userApi.js # Utilisateur (authentification, profil, informations)

## ├── adviceApi.js # Advices CRUD (Create / Read / Update / Delete)

## └── index.js # Export global de toutes les API

## 1. useAxios.js

Rôle :

Crée une instance Axios réutilisable

Ajoute automatiquement le token dans le header

Gère les erreurs globales (ex: 401)

## 2. oauthApi.js

Endpoints Social login :
| Fonction | Endpoint | Description |
| -------------------------------- | --------------------- | ---------------------------- |
| `loginWithGoogle(token)` | POST `/auth/google` | Connexion via Google OAuth |
| `loginWithGithub(code)` | POST `/auth/github` | Connexion via GitHub OAuth |
| `loginWithFacebook(accessToken)` | POST `/auth/facebook` | Connexion via Facebook OAuth |

## 3. userApi.js

Endpoints utilisateur :

| Fonction               | Endpoint                | Description                             |
| ---------------------- | ----------------------- | --------------------------------------- |
| `getMe()`              | GET `/me`               | Récupère le profil utilisateur connecté |
| `updateMe(data)`       | PUT `/me`               | Met à jour le profil utilisateur        |
| `deleteMe()`           | DELETE `/me`            | Supprime le compte utilisateur          |
| `login(credentials)`   | POST `/login`           | Connexion utilisateur                   |
| `register(data)`       | POST `/inscription`     | Inscription utilisateur                 |
| `activate(data)`       | POST `/activation`      | Activation du compte                    |
| `logout()`             | POST `/logout`          | Déconnexion                             |
| `refreshToken()`       | POST `/refresh-token`   | Rafraîchir le token JWT                 |
| `changePassword(data)` | POST `/change-password` | Changer mot de passe                    |
| `newPassword(data)`    | POST `/new-password`    | Nouveau mot de passe                    |
| `createReview(data)`   | POST `/avis`            | Créer un avis/review                    |
| `getMyReviews()`       | GET `/avis/me`          | Récupérer mes avis                      |

| `getAllUsers()` | GET `/users` | Récupérer tous les utilisateurs (admin) |

## 4. adviceApi.js

Endpoints Advice :

| Fonction                 | Endpoint                | Description                |
| ------------------------ | ----------------------- | -------------------------- |
| `getAllAdvices()`        | GET `/advices/admin`    | Récupérer tous les advices |
| `getMyAdvices()`         | GET `/advices/me`       | Récupérer mes advices      |
| `getAdviceById(id)`      | GET `/advices/${id}`    | Récupérer un advice par id |
| `createAdvice(data)`     | POST `/advices`         | Créer un nouvel advice     |
| `updateAdvice(id, data)` | PUT `/advices/${id}`    | Mettre à jour un advice    |
| `deleteAdvice(id)`       | DELETE `/advices/${id}` | Supprimer un advice        |

## 5. index.js

index.js simplifie l’import des fonctions API.

Permet d’avoir un point central unique pour toutes les fonctions API.

Réduit la duplication et rend le code plus propre, lisible et maintenable.

Dans les pages ou composants, tu importes directement ce dont tu as besoin depuis "../api".
