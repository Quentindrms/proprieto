# Proprieto

Proprieto est une application web de gestion de patrimoine immobilier. Elle permet à un propriétaire de centraliser le suivi de ses biens, de ses contrats de location, de ses locataires, de ses prestataires ainsi que l'ensemble de ses flux financiers (revenus et dépenses) liés à son parc immobilier.

Ce projet a été réalisé dans le cadre de la soutenance du titre professionnel **Concepteur Développeur d'Applications (CDA)**.

---

## Fonctionnalités

- **Gestion des biens immobiliers** — ajout, modification et archivage des propriétés avec leur type, leur prix d'achat et leur date d'acquisition
- **Gestion des contrats** — création et suivi des baux associant un bien à un locataire, avec leurs dates de début et de fin
- **Répertoire** — annuaire des locataires et des prestataires avec leurs coordonnées
- **Finances** — suivi des revenus (loyers, etc.) et des dépenses (travaux, charges, etc.) catégorisés par bien
- **Authentification** — inscription, connexion, réinitialisation de mot de passe et envoi d'un email de bienvenue à la création du compte

---

## Stack technique

### Frontend

| Technologie | Rôle |
|---|---|
| [SolidJS](https://www.solidjs.com/) | Framework UI réactif |
| [Vike](https://vike.dev/) | Métaframework SSR basé sur Vite |
| [Telefunc](https://telefunc.com/) | Appels de fonctions serveur typés (RPC) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Style utilitaire |
| [Zod](https://zod.dev/) | Validation des schémas côté client |
| [Vitest](https://vitest.dev/) | Tests unitaires |

### Backend

| Technologie | Rôle |
|---|---|
| [NestJS](https://nestjs.com/) | Framework API REST |
| [Prisma](https://www.prisma.io/) | ORM et migrations de base de données |
| [PostgreSQL](https://www.postgresql.org/) | Base de données relationnelle |
| [Argon2](https://github.com/nicowillis/argon2) | Hachage des mots de passe |
| [JOSE](https://github.com/panva/jose) | Génération et vérification des JWT |
| [Nodemailer](https://nodemailer.com/) + [React Email](https://react.email/) | Envoi d'emails transactionnels |
| [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) | Tests unitaires et d'intégration |

### Infrastructure

| Technologie | Rôle |
|---|---|
| [Docker](https://www.docker.com/) / Docker Compose | Conteneurisation de l'ensemble des services |
| [Mailpit](https://mailpit.axllent.org/) | Serveur SMTP local pour le développement |
| [Adminer](https://www.adminer.org/) | Interface d'administration de la base de données |
| [Biome](https://biomejs.dev/) | Linting et formatage du code |

---

## Architecture

Le projet est organisé en monorepo et se compose de deux services principaux :

```
proprieto/
├── services/
│   ├── frontend/       # Application SolidJS / Vike
│   └── backend/        # API NestJS
├── docker/
│   ├── compose.dev.yml
│   ├── compose.test.yml
│   └── compose.prod.yml
├── database/
└── Makefile
```

Le frontend et le backend s'exécutent dans des conteneurs Docker distincts et communiquent via un réseau interne Docker. En production, un reverse proxy est positionné devant les deux services.

---

## Prérequis

- [Docker](https://www.docker.com/) et Docker Compose
- [Make](https://www.gnu.org/software/make/)

---

## Installation et démarrage

### Variables d'environnement

Avant de démarrer l'application, il convient de créer les fichiers d'environnement à partir du fichier d'exemple fourni :

```bash
cp .env.example .env.development
cp .env.example .env.test
```

Renseigner ensuite les valeurs adaptées à votre environnement dans chacun des fichiers.

### Développement

```bash
# Construire les images Docker
make dev-build

# Démarrer l'environnement de développement
make dev-start
```

L'interface utilisateur est accessible sur `http://localhost:3000` et l'API sur `http://localhost:4000`.  
L'interface Adminer est disponible sur `http://localhost:8080` et Mailpit sur `http://localhost:8025`.

### Tests

Les tests s'exécutent dans un environnement Docker dédié afin de s'assurer que ceux-ci se déroulent en conditions réelles sur leur environnement d'exécution.

```bash
# Construire les images de test
make test-build

# Lancer l'ensemble du plan de tests
make test-start
```

### Production

```bash
make prod-build
make prod-start
```

---

## Tests

Les environnements frontend et API étant distincts, deux plans de tests ont été mis en place indépendamment.

### Frontend — Vitest

Les tests du frontend portent sur les hooks qui constituent la couche métier côté client. Chaque hook est testé de manière isolée grâce à des mocks des dépendances externes, ce qui permet de valider le comportement attendu sans effectuer de vrais appels réseau.

Les fichiers de tests se trouvent dans `services/frontend/test/`.

### Backend — Jest & Supertest

Les tests de l'API couvrent les contrôleurs et les services de chaque module (authentification, biens immobiliers, contrats, finances, répertoire). Les tests d'intégration utilisent Supertest pour envoyer de vraies requêtes HTTP à l'application NestJS instanciée en mémoire.

Les fichiers de tests se trouvent dans `services/backend/src/**/*.spec.ts` et `services/backend/test/`.

---

## Modules de l'API

| Module | Endpoint de base | Description |
|---|---|---|
| Auth | `/auth` | Inscription, connexion, vérification JWT, réinitialisation de mot de passe |
| Properties | `/property` | Gestion des biens immobiliers |
| Contracts | `/contract` | Gestion des contrats de location |
| Incomes | `/income` | Gestion des revenus |
| Outcomes | `/outcome` | Gestion des dépenses |
| Clients | `/client` | Gestion des locataires |
| Providers | `/provider` | Gestion des prestataires |

---

## Auteur

**Quentin Derimais** — Projet de soutenance CDA
