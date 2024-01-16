# Mashreq Monorepo

This is a monorepo containing source code for Mashreq apps (web, Android, and iOS).

App is built on top of React 18, and uses an NodeJS/ExpressJS based REST Api server to save and authenticate users.

CapacitorJS is used for building mobile apps (Android, iOS) with native api access (Camera, Geolocation, Haptics, Keyboard, etc...) by extending the source code from the primary web application, This approach offers low code and faster product development accross the board. *Write Once, Run everywhere!*

Each application (web, android, iOS) has it's own source code which can be edited separately if needed, but not recommended.

All apps support Dark mode based on device/system preference.

All apps supports 4 locales (Arabic, English, French, and Hindi) based on selected country.

RTL Layout can also be implemented for Arabic Locale but skipped for now intentionally.

**United States of America (English locale)** is default selection.


## Setup Instructions

### Source Code Folder Structure

- Web (UI) => ./apps/web

- Android => ./apps/web/android

- iOS => ./apps/web/ios

- Api Server => ./services/rest-api

### API Server

- 1: Clone the monorepo.
- 2: Navigate to root directory of the repo.
- 3: Run `npm install`
- 4: Start Rest API server in development mode using `npm run start:api`

**Build API:** `npm run build:api`

----

### Web Application

- 1: Clone the monorepo.
- 2: Navigate to root directory of the repo.
- 3: Run `npm install`
- 4: Start Web UI in development mode using `npm run start:web`.

**Build Web UI:** `npm run build:web`

**Test Web UI:** `npm run test:web`

---------

### Mobile Applications

*Note: 
You'll be needing Android Studio and Xcode Editor to work with mobile apps*


- 1: Clone the monorepo.
- 2: Navigate to root directory of the repo.
- 3: Run `npm install`
- 4: Build web UI `npm run build:web`
- 5: Navigate to `./apps/web`
- 6: Run `npx cap sync`
- 4: Open `android` or `ios` directory in the editor of your choice.
- 5: Build, Run, and Export mobile apps using respective options avalable on the editor.


Tips: You can also use following Ionic extension for VS Code If you don't want to switch editors while working on multiple apps. 
```
Name: Ionic
Id: Ionic.ionic
Description: Official extension for Ionic and Capacitor development
Version: 1.65.2
Publisher: Ionic
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ionic.ionic
```

### Technical Notes:

Api server stores newly created users in-memory using singleton instance of `MockDatabase` class, so all the users persist in the memory and can be used for authentication and display purpose as long as server is not restarted. 

On server restart, in-memory instance of `MockDatabase` class will be destoryed along with stored data. A new instance will be created and used to serve any new requests.

In order access api routes (protected/open) `x-api-key` header must be present along with the correct api key. For protected routes additional safety measure are in place such as validationg `Bearer` token received from `Authorization` header.


Environment variables can be used with Api Server `(.env file)` as well as Web UI `(.env.development, .env.production, and .env.test files)` for defining environment specific variables like session expiry, api key etc..

Postman collection and environment files are available inside `rest-api` folder for testing REST api.

# Screenshots

Dark Mode Web UI             |  Light Mode Web UI
:-------------------------:|:-------------------------:
![](./screenshots/Web//Dark%20Mode/screencapture-localhost-3000-2024-01-16-20_00_48.png)  |  ![](./screenshots//Web//Light%20Mode/screencapture-localhost-3000-2024-01-16-18_27_37.png)
![](./screenshots/Web//Dark%20Mode/screencapture-localhost-3000-2024-01-16-20_01_43.png)  |  ![](./screenshots/Web/Light%20Mode/screencapture-localhost-3000-2024-01-16-18_31_29.png)
![](./screenshots/Web/Dark%20Mode/screencapture-localhost-3000-signin-2024-01-16-20_01_13.png) | ![](./screenshots/Web/Light%20Mode/screencapture-localhost-3000-signin-2024-01-16-18_29_11.png)
![](./screenshots/Web/Dark%20Mode/screencapture-localhost-3000-signup-2024-01-16-20_01_01.png) | ![](./screenshots/Web/Light%20Mode/screencapture-localhost-3000-signup-2024-01-16-18_28_28.png)
![](./screenshots/Web/Dark%20Mode//screencapture-localhost-3000-users-2024-01-16-20_01_53.png) | ![](./screenshots/Web/Light%20Mode/screencapture-localhost-3000-users-2024-01-16-18_33_25.png) 


Dark Mode Responsive Web UI             |  Light Mode Responsive Web UI
:-------------------------:|:-------------------------:
![](./screenshots/Web/Dark%20Mode/Responsive/screencapture-localhost-3000-2024-01-16-20_02_10.png) | ![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-2024-01-16-18_35_23.png)
![](./screenshots/Web/Dark%20Mode/Responsive/screencapture-localhost-3000-2024-01-16-20_02_37.png) | ![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-2024-01-16-18_35_33.png)
![](./screenshots/Web/Dark%20Mode/Responsive/screencapture-localhost-3000-signup-2024-01-16-20_02_45.png) | ![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-signin-2024-01-16-18_36_13.png)

## Localization and Theme

Column 1        |    Colum 2
:-------------------------:|:-------------------------:
![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-ae-2024-01-16-18_37_48.png) | ![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-fr-2024-01-16-18_38_00.png)
![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-in-2024-01-16-18_38_33.png) | ![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-in-users-2024-01-16-18_39_48.png)
![](./screenshots/Web/Light%20Mode/Responsive/screencapture-localhost-3000-2024-01-16-18_35_23.png)

## Mobile Apps

Column 1        |    Colum 2
:-------------------------:|:-------------------------:
![](./screenshots/mobile/Screenshot%202024-01-17%20at%2012.18.20 AM.png) | ![](./screenshots/mobile/Screenshot%202024-01-17%20at%2012.19.11 AM.png)
![](./screenshots/mobile/Screenshot%202024-01-17%20at%2012.20.20 AM.png)