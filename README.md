# 🌦️ SkyFetch

Una aplicación web del clima con inicio de sesión, favoritos personalizados y visualización atractiva con imágenes dinámicas según el clima actual.

## 🚀 Funcionalidades principales

- 🔍 **Búsqueda de ciudades** para consultar el clima actual.
- 🖼️ **Fondo dinámico** que cambia según la descripción del clima (nublado, soleado, lluvia...).
- ⭐ **Gestión de favoritos**: guarda tus ciudades preferidas y consulta su clima rápidamente.
- 👤 **Registro e inicio de sesión** de usuarios (almacenado en localStorage).
- 🏙️ Página individual de ciudad con imagen temática acorde al clima.
- 📱 Responsive: interfaz adaptada para móvil y escritorio.

## 🛠️ Tecnologías utilizadas

- **Frontend**: React, React Router, CSS
- **Backend (opcional)**: localStorage, con posibilidad de expandir a MongoDB + Express
- **API de clima**: [OpenWeatherMap](https://openweathermap.org/api)
- **Gestión de sesión**: localStorage (con opción futura de JWT)

## 📂 Estructura del proyecto

src/
├── components/
│ ├── Navbar.jsx
│ ├── Layout.jsx
│ └── WeatherCard.jsx
├── pages/
│ ├── Home.jsx
│ ├── City.jsx
│ ├── Favorites.jsx
│ ├── Login.jsx
│ └── Register.jsx
├── assets/ (imágenes por clima)
├── App.jsx
└── main.jsx

## 🖼️ Fondos según clima

El fondo cambia automáticamente en la home y city según el clima retornado por la API:

- ☀️ **Soleado**: fondo claro y despejado
- 🌧️ **Lluvia**: imagen lluviosa
- 🌫️ **Niebla**: fondo brumoso
- 🌨️ **Nieve**: paisaje nevado
- ☁️ **Nublado**: fondo gris
- ...entre otros

## 🔐 Autenticación

Actualmente, los usuarios se guardan en `localStorage` con nombre de usuario y contraseña. No se usa JWT todavía, pero es extensible para ello.

## 🧭 Cómo usar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/arakiztain/weather.git
   cd weather
