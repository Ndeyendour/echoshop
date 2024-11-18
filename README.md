# My Botanical Store

## Présentation du projet
My Botanical Store est une boutique en ligne dédiée aux passionnés de plantes et de jardinage. Le site propose une large gamme de produits allant des plantes d'intérieur et d'extérieur aux accessoires de jardinage, pots, outils et autres articles décoratifs. Grâce à une interface simple et intuitive, les utilisateurs peuvent facilement naviguer, consulter des produits détaillés, ajouter des articles à leur panier, et finaliser leurs achats en toute sécurité. Le site inclut des fonctionnalités de gestion de panier, de contact direct avec le support client, ainsi que des options de recherche et de filtrage pour une expérience d'achat fluide et agréable.

## Fonctionnalités

### 1. Page d'Accueil

**page d'accueil** La page d'accueil de My Botanical Store présente un design attractif mettant en avant des plantes d'intérieur et des offres spéciales. Elle inclut un slider avec des promotions, des sections sur les services (livraison gratuite, carte cadeau, support 24/7), et des produits en avant comme les nouveautés et meilleures ventes. Les utilisateurs peuvent facilement ajouter des articles à leur panier ou à leurs favoris, consulter des témoignages clients, et s'inscrire à la newsletter. Les produits sont organisés par catégories et chaque article propose des détails interactifs pour une meilleure expérience d'achat.



![image alt](https://github.com/Ndeyendour/echoshop/blob/62a24aa44db00a6270ed3f433d9a817315737fb5/my-botanical-store-frontend/public/images/ac.PNG)
### 2. Liste des Produits (ProductList)

Sur la **page des produits**, les utilisateurs peuvent :

- **Affichage des produits** : Les produits sont récupérés depuis une API et sont affichés dans une grille avec leur nom, image et prix.
- **Filtrage par catégorie** : Les utilisateurs peuvent filtrer les produits par catégorie. 
- **Filtrage par prix** : Les utilisateurs peuvent spécifier un prix minimum et un prix maximum pour filtrer les produits par gamme de prix.
- **Recherche par nom de produit** : Un champ de recherche permet aux utilisateurs de trouver un produit par son nom.
- **Affichage des résultats filtrés** : Les produits qui correspondent aux critères de recherche sont dynamiquement filtrés et affichés.

  
![image alt](https://github.com/Ndeyendour/echoshop/blob/62a24aa44db00a6270ed3f433d9a817315737fb5/my-botanical-store-frontend/public/images/produit.PNG)

### 3. Panier (Cart)

La **page du panier** permet aux utilisateurs de :

- **Affichage des produits dans le panier** : Les utilisateurs peuvent consulter les produits qu'ils ont ajoutés à leur panier. Chaque produit affiche son nom, son image, son prix, sa quantité et son total pour chaque produit.
- **Modification de la quantité** : Les utilisateurs peuvent ajuster la quantité de chaque produit dans le panier avec des boutons "+" et "-". Le total est recalculé dynamiquement.
- **Suppression d'articles** : Un bouton "×" permet de retirer un produit du panier.
- **Calcul du total** : Le total du panier est calculé en fonction de la quantité et du prix de chaque produit.
- **Redirection vers le checkout** : Un bouton permet de rediriger l'utilisateur vers la page de paiement (checkout).

Voici un aperçu de la fonctionnalité du panier :
- **Ajout au panier** : Depuis la page des produits, l'utilisateur peut ajouter un produit au panier en cliquant sur un bouton.
- **Gestion de la quantité** : L'utilisateur peut augmenter ou diminuer la quantité d'un produit directement dans le panier.
- **Suppression d'articles** : Chaque produit dans le panier possède une option pour le supprimer du panier.
- **Vue détaillée du panier** : Un récapitulatif du panier, y compris le nom des produits, leur prix, la quantité et le prix total, est affiché.

![image alt](https://github.com/Ndeyendour/echoshop/blob/62a24aa44db00a6270ed3f433d9a817315737fb5/my-botanical-store-frontend/public/images/panier.PNG)

### 4. Favoris

- **Ajout/Retrait des favoris** : Les utilisateurs peuvent ajouter des produits à leurs favoris en cliquant sur une icône cœur. L'état des favoris est stocké et mis à jour dynamiquement.



  
### 5. Détails du produit

- **Vue détaillée du produit** : En cliquant sur l'icône de l'œil, une fenêtre modale s'ouvre, affichant les détails du produit, y compris l'image, la description et le prix.
- **Produits similaires** : En bas de la fenêtre modale, une liste de produits similaires (dans la même catégorie) est affichée pour aider l'utilisateur à découvrir d'autres produits.


![image alt](https://github.com/Ndeyendour/echoshop/blob/62a24aa44db00a6270ed3f433d9a817315737fb5/my-botanical-store-frontend/public/images/Dde.PNG)


---
### 7. Page de Contact

La **page de contact** permet aux utilisateurs de soumettre des questions ou des commentaires via un formulaire. Cette page comprend :

- **Affichage des informations de contact** : L'adresse physique, les numéros de téléphone et les adresses email de l'entreprise sont affichés pour permettre aux utilisateurs de nous contacter directement.
- **Formulaire de contact** : Un formulaire simple permet à l'utilisateur de saisir son nom, son email, son numéro de téléphone, et un message. Le formulaire vérifie la validité des champs (email, téléphone, message).
  - **Validation des champs** : Le formulaire vérifie que tous les champs sont correctement remplis et que le message est suffisamment long.
  - **Gestion des erreurs** : Si un champ est mal rempli, une erreur s'affiche sous le champ correspondant.
  - **Confirmation de soumission** : Si le formulaire est valide, un message de succès s'affiche après la soumission.


![image alt](https://github.com/Ndeyendour/echoshop/blob/62a24aa44db00a6270ed3f433d9a817315737fb5/my-botanical-store-frontend/public/images/Capture.PNG)

---

## Installation

**Prérequis**: Avant de commencer, assurez-vous d'avoir installé **Node.js** et **npm** ou **Yarn** sur votre machine.

1. Clonez le dépôt sur votre machine locale : git clone https://github.com/Ndeyendour/echoshop.git



2. Accédez au répertoire du projet : cd nom-du-depot

3. Installez les dépendances : *npm* *install* ou *yarn* *install*

4. Lancez l'application : *npm* *start* ou *yarn* *start*
---
## Tests
Des tests peuvent être effectués en utilisant l'outil de test intégré à React. Pour lancer les tests, exécutez la commande suivante : *npm test*

---
 ## Lien vers le projet déployé
Découvrez EcoShop en ligne : [https://cute-dango-e31219.netlify.app/](https://cute-dango-e31219.netlify.app/)

## Mise à jour du portfolio
Le portfolio en ligne a été mis à jour avec les dernières réalisations, y compris EcoShop. Vous pouvez consulter le projet et d'autres exemples sur [https://ndeyendour.github.io/prtfolio/#project](https://ndeyendour.github.io/prtfolio/#project) 

---
 ## Conception et prototypage dans figma
Découvrez EcoShop sur figma : [echoShop dans figma](https://www.figma.com/design/VBbEK2eOyipe9bwWKPvRnX/Untitled?t=O92XX7zKLXai6ldd-0)


---
## Documentation de l'API des Produits

Cette API permet de gérer les produits dans votre application, avec des opérations telles que la récupération, l'ajout, la mise à jour, la suppression, ainsi que la recherche et le filtrage des produits par différents critères.

## 1. Récupérer tous les produits
- **Méthode** : GET
- **URL** : `/products`
- **Description** : Récupère la liste de tous les produits disponibles dans la base de données.

## 2. Ajouter un nouveau produit
- **Méthode** : POST
- **URL** : `/products`
- **Description** : Ajoute un nouveau produit avec des informations comme le nom, la description, le prix, la catégorie, etc.

## 3. Mettre à jour un produit
- **Méthode** : PUT
- **URL** : `/products/:id`
- **Description** : Met à jour un produit existant en fonction de son identifiant.

## 4. Récupérer un produit par ID
- **Méthode** : GET
- **URL** : `/products/:id`
- **Description** : Récupère un produit spécifique à partir de son identifiant unique.

## 5. Supprimer un produit
- **Méthode** : DELETE
- **URL** : `/products/:id`
- **Description** : Supprime un produit de la base de données en utilisant son identifiant.

## 6. Rechercher des produits par nom
- **Méthode** : GET
- **URL** : `/products/search`
- **Description** : Recherche des produits en fonction de leur nom.

## 7. Filtrer des produits par prix
- **Méthode** : GET
- **URL** : `/products/filter`
- **Description** : Filtre les produits selon une plage de prix spécifiée.

## 8. Filtrer des produits par catégorie et/ou nom
- **Méthode** : GET
- **URL** : `/categories`
- **Description** : Filtre les produits par leur catégorie et/ou leur nom.

## Gestion des erreurs
Les erreurs suivantes peuvent être renvoyées par l'API :

- **400 Bad Request** : Lorsque la requête est mal formée ou que des paramètres sont manquants.
- **404 Not Found** : Lorsque l'élément (produit) recherché n'est pas trouvé.
- **500 Internal Server Error** : Lorsque le serveur rencontre une erreur inattendue (souvent liée à la base de données ou à une mauvaise configuration).




 
---
 ## Technologies utilisées

Ce projet utilise les technologies suivantes :

- **React** 
- **Axios** 
- **React Modal**
- **React-Bootstrap** 
- **React Context API** 
- **rc-slider**
- **Node js**
- **Express**
- **Mongodb**
