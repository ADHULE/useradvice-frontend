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

## ├── authApi.js # Authentification classique (login, register, password)

## ├── oauthApi.js # Social login (Google, GitHub, Facebook)

## ├── userApi.js # Utilisateur (profil, informations)

## ├── adviceApi.js # Advices CRUD (Create / Read / Update / Delete)

## └── index.js # Export global de toutes les API

## 1. useAxios.js

Rôle :

Crée une instance Axios réutilisable

Ajoute automatiquement le token dans le header

Gère les erreurs globales (ex: 401)

## 2. authApi.js

Endpoints principaux :
| Fonction | Endpoint | Description |
| ------------------------ | ----------------------- | ---------------------------- |
| `register(data)` | POST `/inscription` | Inscription utilisateur |
| `activateAccount(data)` | POST `/activation` | Activation du compte |
| `login(email, password)` | POST `/login` | Connexion utilisateur |
| `refreshToken()` | POST `/refresh-token` | Rafraîchir le token JWT |
| `changePassword(data)` | POST `/change-password` | Changer mot de passe |
| `forgotPassword(email)` | POST `/forgot-password` | Mot de passe oublié |
| `newPassword(data)` | POST `/new-password` | Définir nouveau mot de passe |
| `logout()` | POST `/logout` | Déconnexion |

## 3. oauthApi.js

Endpoints Social login :
| Fonction | Endpoint | Description |
| -------------------------------- | --------------------- | ---------------------------- |
| `loginWithGoogle(token)` | POST `/auth/google` | Connexion via Google OAuth |
| `loginWithGithub(code)` | POST `/auth/github` | Connexion via GitHub OAuth |
| `loginWithFacebook(accessToken)` | POST `/auth/facebook` | Connexion via Facebook OAuth |

## 4. userApi.js

Endpoints utilisateur :

| Fonction  | Endpoint  | Description                             |
| --------- | --------- | --------------------------------------- |
| `getMe()` | GET `/me` | Récupère le profil utilisateur connecté |

À adapter si ton backend a un autre endpoint pour le profil.

## 5. adviceApi.js

Endpoints Advice :

| Fonction                 | Endpoint                      | Description                |
| ------------------------ | ----------------------------- | -------------------------- |
| `getAllAdvices()`        | GET `/advices/all`            | Récupérer tous les advices |
| `getAdviceById(id)`      | GET `/advices/{id}`           | Récupérer un advice par id |
| `createAdvice(data)`     | POST `/advices`               | Créer un nouvel advice     |
| `updateAdvice(id, data)` | PUT `/advices/update/{id}`    | Mettre à jour un advice    |
| `deleteAdvice(id)`       | DELETE `/advices/delete/{id}` | Supprimer un advice        |

## 6. index.js

index.js simplifie l’import des fonctions API.

Permet d’avoir un point central unique pour toutes les fonctions API.

Réduit la duplication et rend le code plus propre, lisible et maintenable.

Dans les pages ou composants, tu importes directement ce dont tu as besoin depuis "../api".
