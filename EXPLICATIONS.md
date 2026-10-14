# EXPLICATIONS.md

## Commits

| Commit | Branche(s) | Rôle |
|---|---|---|
| `67aeb4f` | tag `depart-cc` | Base commune (site de départ) |
| `3a274f6` | `premiere` | Branche A — `style.css` |
| `0fdec02` | `deuxieme` | Branche B — `app.js` |
| `0a33e0b` | `main` | Fusion A + B (« aa », 2 parents) |
| `528081e` | `hotflix` | Correctif (« card ») |
| `ce2df97` | `main`, `quatre` | 4e branche — `app.js` (version finale) |

## Commandes Git

### Clone / base
| Commande | Où | Ce que ça fait | But |
|---|---|---|---|
| `git clone <url>` | local | Copie le dépôt + historique | Récupérer le site |
| `git log --oneline` | `main` | Liste les commits | Repérer `67aeb4f` |
| `git tag` | depart-cc | Liste les tags | Confirmer `depart-cc` |

### Branche A — `premiere`
| Commande | Où | Ce que ça fait | But |
|---|---|---|---|
| `git switch main` | → `main` (`67aeb4f`) | Va sur la base | Partir de la base |
| `git switch -c premiere` | depuis `67aeb4f` | Crée + bascule sur `premiere` | Isoler A |
| *(édite `style.css`)* | fichier | Modifie le style | Travail A |
| `git add style.css` | index | Prépare la modif | — |
| `git commit -m "style.css"` | `premiere` | Crée `3a274f6` | Enregistrer A |
| `git push -u origin premiere` | → GitHub | Publie `origine/premiere` | Publier A |

### Branche B — `deuxieme`
| Commande | Où | Ce que ça fait | But |
|---|---|---|---|
| `git switch main` | → `main` (`67aeb4f`) | Revient sur la base | Même base que A |
| `git switch -c deuxieme` | depuis `67aeb4f` | Crée + bascule sur `deuxieme` | Isoler B |
| *(édite `app.js`)* | fichier | Modifie le script | Travail B |
| `git add app.js` | index | Prépare la modif | — |
| `git commit -m "app.js"` | `deuxieme` | Crée `0fdec02` | Enregistrer B |
| `git push -u origin deuxieme` | → GitHub | Publie `origine/deuxieme` | Publier B |

### Fusion A + B
| Commande | Où | Ce que ça fait | But |
|---|---|---|---|
| `git switch main` | → `main` (`67aeb4f`) | Va sur la cible | Préparer fusion |
| `git merge premiere` | `main` | Fast-forward → `main` = `3a274f6` | Intégrer A |
| `git merge deuxieme` | `main` | Branches divergées → crée la fusion `0a33e0b` | Intégrer B |
| `git push origin main` | → GitHub | Publie `origine/main` | Publier fusion |

### Hotfix — `hotflix`
| Commande | Où | Ce que ça fait | But |
|---|---|---|---|
| `git switch -c hotflix` | depuis `main` (`0a33e0b`) | Crée la branche correctif | Corriger à part |
| *(corrige — lisibilité carte)* | fichier(s) | Corrige le défaut | Objet du hotfix |
| `git add .` | index | Prépare | — |
| `git commit -m "card"` | `hotflix` | Crée `528081e` | Enregistrer correctif |
| `git push -u origin hotflix` | → GitHub | Publie `origine/hotflix` | Publier |
| `git switch main` + `git merge hotflix` | `main` | Fast-forward → `main` = `528081e` | Intégrer correctif |
| `git push origin main` | → GitHub | Publie `main` | Mettre à jour |

### 4e branche — `quatre`
| Commande | Où | Ce que ça fait | But |
|---|---|---|---|
| `git switch -c quatre` | depuis `main` (`528081e`) | Crée la 4e branche | Travail isolé |
| *(édite `app.js`)* | fichier | Modifie le script | Travail |
| `git add app.js` + `git commit -m "app.js"` | `quatre` | Crée `ce2df97` | Enregistrer |
| `git push -u origin quatre` | → GitHub | Publie `origine/quatre` | Publier |
| `git switch main` + `git merge quatre` | `main` | Fast-forward → `main` = `ce2df97` | Intégrer |
| `git push origin main` | → GitHub | Publie `main` final | Version finale en ligne |

### Vérification
| Commande | But |
|---|---|
| `git merge-base premiere deuxieme` | Base commune A/B → attendu `67aeb4f` |
| `git merge-base main hotflix` | D'où `hotflix` part → attendu `0a33e0b` |
| `git merge-base main quatre` | D'où `quatre` part → attendu `528081e` |
| `git cat-file -p 0a33e0b` | Voir les 2 parents de la fusion |

## Tests — `main` `ce2df97`

| Étape / version testée | Action | Résultat attendu | Résultat constaté |
|---|---|---|---|
| 1. `main` `ce2df97` | Ouvrir / actualiser la page | Compteur à 0, confirmation masquée | correcte |
| 2. `main` `ce2df97` | Première réservation | Compteur à 1, confirmation lisible avec nom de l'atelier + une place | correcte |
| 3. `main` `ce2df97` | Trois réservations au total | Compteur et confirmation : trois places | correcte |
| 4. `main` `ce2df97` | Recommencer | Compteur à 0, confirmation masquée | correcte |
| 5. `main` `ce2df97` | Réserver après remise à zéro | Compteur à 1, confirmation de nouveau visible | correcte |
| 6. `main` `ce2df97` @ 390 px | Afficher en largeur 390 px | Textes/boutons lisibles, aucun défilement horizontal | correcte |

## Observations hotfix

| Moment | Commit testé | Observation |
|---|---|---|
| Après hotfix | `528081e` | tout vas bien |
| Avant hotfix | `0a33e0b` | tout vas bien |

## 3 questions

| Question | Réponse |
|---|---|
| Base commune de A et B | `67aeb4f` (tag `depart-cc`) — vérifié par `git merge-base premiere deuxieme`  |
| Créations depuis `main` | `hotflix` depuis `0a33e0b` ; `quatre` depuis `528081e` |
| Fusion ≠ fonctionne | A touche `style.css`, B touche `app.js` → pas de conflit, fusion OK, mais rendu possiblement illisible à 390 px → d'où le hotfix. Git fusionne le texte, ne teste pas l'affichage. |
| Après un commit local | `git push origin <branche>` pour publier sur GitHub. Ex. `ce2df97`, vérifié sur GitHub onglet Commits |