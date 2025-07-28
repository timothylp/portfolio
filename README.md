# Portfolio Personnel

Ce projet est un portfolio personnel développé avec [Next.js](https://nextjs.org) et TypeScript. Il présente mon parcours professionnel, mes projets et permet aux visiteurs de me contacter.

## 🚀 Fonctionnalités

- **Design moderne** avec support du thème sombre/clair
- **Contenu dynamique** via MDX pour une gestion facile du contenu
- **Performance optimisée** avec Next.js 15 et Turbopack
- **Responsive design** adapté à tous les écrans
- **Formulaire de contact** avec validation et protection anti-spam
- **SEO optimisé** avec métadonnées et sitemap

## 🛠️ Technologies utilisées

- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **UI Components** : Radix UI, Lucide React
- **Content** : MDX pour le contenu dynamique
- **Email** : Resend pour l'envoi d'emails
- **Linting** : Biome pour la qualité du code

## 🏃‍♂️ Démarrage rapide

1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd portfolio
   ```

2. **Installer les dépendances**
   ```bash
   bun install
   # ou
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   bun dev
   # ou
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   Naviguez vers [http://localhost:3000](http://localhost:3000)

## 📝 Scripts disponibles

- `bun dev` - Lance le serveur de développement avec Turbopack
- `bun build` - Compile l'application pour la production
- `bun start` - Lance le serveur de production
- `bun typecheck` - Vérifie les types
- `bun check` - Formate le code avec Ultracite

## 📁 Structure du projet

```
portfolio/
├── app/                 # Pages Next.js (App Router)
├── components/          # Composants React réutilisables
├── content/            # Contenu MDX
├── hooks/              # Hooks React personnalisés
├── lib/                # Utilitaires et configurations
└── public/             # Assets statiques
```

## 🎨 Personnalisation

Le contenu principal est géré via des fichiers MDX dans le dossier `content/` :
- `introduction.mdx` - Présentation personnelle
- `legal.mdx` - Mentions légales
- `privacy.mdx` - Politique de confidentialité