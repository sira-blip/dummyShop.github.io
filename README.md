# DummyShop

Une application e-commerce développée avec **Next.js,React,TypeScript et TailwindCSS**.
Elle permet aux utilisateurs de parcourir des produits, gérer le panier local, passer des commandes et visualiser des métriques en gardant un design responsive et une expérience utilisateur fluide.

## Démarage

### cloner le repository

```bash
git clone <url-repository>
cd dummyShop
```

### configurer les variables d'environement

```bash
cp .env.example .env

```

### Installer les dépendances

```bash
npm i
```

### Lancer l'application

```bash
npm run dev

```

## Fonctionnalités

### Gestion des Produits

- Affichage des produits depuis l'api DummyJSON.
- Recherche avec debounce pour le filtrage instantanné.
- Filtrage par catégorie
- Pagination.
- Gestion des états quand aucun produit trouvé et au cas d'erreur.

### Panier

- Ajouter des produits au panier.
- Affichage dynamique de nombre d'articles et du prix total.
- Sidebar du panier rétractable.
- Checkout stocké dans localStorage.

### Commandes

- Affichage des commandes depuis l'api DummyJSON.
- Affichage des commandes locales stocké dans localStorage.
- Filtrage des commande locales selon la durée 7 jours,30 jours, ou toutes.
- Cartes de commande détaillées avec produit,quantité,prix et prix total.
- Les commandes locales et celle de l'api sont affichées séparément pour une meilleure organisation.

### Dashboard de métriques

- KPI pour les commandes locales effectuées et le revenue.
- chart qui represente le revenue des commande locales dans les 7 derniers jours en utilisant Rechart.

### Navigation

- **NavBar responsive:**
  - Desktop: lien visibles en ligne.
  - Mobile:liens dans un menu dropdown.
- Icone du panier qui affiche le nombres des articles ajoutés.

### Testes avec React testing Library

- Deux Testes unitaires pour:
  - tester le bouton ajouter au panier (AddToCardButton)
  - testet le composant qui affiche les commande locales( OrderCardLocal )
- Un test d'integration pour vérifier le fonctionnement de ProductsCard + AddToCardButton + CartProvider(et useCart le context qui gère le panier).

### Authentification

- Le composant Guard redirige vers /login si non authentifié.
- Façade simple pour la vérification de token en utilisant sessionStorage.

## Le stack technique

- Framework : Next.js
- Langage : TypeScript
- UI : tailwindCSS ,Lucide Icons
- State Management : React Context (CartContext)
- Data Fetching : React query
- Tests : React Testing Library,Jest
