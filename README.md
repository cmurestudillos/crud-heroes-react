<p align="center">
  <a href="https://www.buymeacoffee.com/cmur"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=cmur&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>
</p>

# React.js - Crud
Ejemplo de CRUD de héroes realizado en React 19, consumiendo la API REST de [`crud-heroes-backend`](../crud-heroes-backend) (Node/Express/Mongoose).

**Demo:** https://crud-heroes-react.vercel.app

## Instalar dependencias
Este proyecto usa **pnpm** como único gestor de paquetes. Ejecutar en terminal: `pnpm install`.

## Variables de entorno
- `.env` — `VITE_API_URL=http://localhost:6000/api` (desarrollo, puerto real de `crud-heroes-backend`)
- `.env.production` — `VITE_API_URL=https://crud-heroes-service.vercel.app/api`

## Iniciar proyecto
Ejecutar en terminal el comando `pnpm dev` e introducir en el navegador `http://localhost:3000/` (puerto fijado en `vite.config.js`).

## Compilar para producción
`pnpm run build` (salida en `dist/`).

## Lint y formato
- `pnpm run lint` — ESLint (flat config, `eslint-plugin-react` + `react-hooks` + `react-refresh`)
- `pnpm run format` — comprueba el formato con Prettier

## Ayuda
Para mas informacion, 
- [Documentacion React](https://reactjs.org/).
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Este proyecto fue migrado a React 19 + pnpm en 2026-07-08.
