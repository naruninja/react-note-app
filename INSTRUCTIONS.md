# Instrukce

Připravte jednoduchou JS (ES6,7 nebo TypeScript) aplikaci s použitím FE frameworku dle svého výběru (React, Angular2+, AngularJS, , Vue, Stencil, Svelte, WebComponents…) tak, aby se dala po naklonování repository a s nainstalovaným node.js nainstalovat a spustit.

Předpřipravený server BSC s REST API, které bude aplikace používat:

Root URL: `http://private-9aad-note10.apiary-mock.com/` (případně použijte REST api podle uvážení: `https://www.firebase.com/` , `http://jsonplaceholder.typicode.com/`, nebo vlastní řešení)

Metody:

```
GET /notes

GET /notes/{id}

POST /notes

PUT /notes/{id}

DELETE /notes/{id}
```

## Funkční požadavky:

Po instalaci a spuštění se po zadání localhost:9000 objeví stránka se seznamem s poznámkami.

Je možné zobrazit detail, editovat, smazat a vytvořit novou poznámku. (Apiary Mock bude vracet stále stejná data, předmětem úkolu je volat správné metody)

Router, (pokud použijete React a Redux pak react-redux-router)

V aplikaci bude možné měnit EN/CZ jazyk (místo CZ může být RU, DE..)…

## Nefunkční požadavky:

GUI dle vlastního návrhu, použití Bootstrapu/Material/Bulma a alespon jedno z: css-modules/styled-components/LESS/SCSS/Stylus/…

Kód by měl být ES6+ JS nebo TS s použi\*\*tím novějších API jako Promise, Array HOF, async/await, použití generatorové funkce (CO.js, redux-saga) je plus

Instalace závislostí a build pomocí webpack, rollup.

Alespoň jeden základní Unit test (Jest, Jasmin, Mocha, Chai…).

Kód vyvíjejte do github/bitbucket veřejného repository, v souboru README.md popište instrukce pro instalaci a spuštění aplikace a testu, a pošlete URL emailem.
