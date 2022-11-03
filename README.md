# AutosTec Backend

Esta aplicación fue generada usando [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) con el [layout por defecto del proyecto inicial](https://loopback.io/doc/en/lb4/Loopback-application-layout.html), como parte del proyecto final del ciclo 4 del programa **Misión TIC 2022**

## Instalar Dependencias

Por defecto, las dependencias fueron istaladas cuando esta aplicación fue generada.
Cuando las dependencias hayan cambiado en el `package.json`, ejecute el siguiente comando:

```sh
npm install
```

Para instalar únicamente las dependencias resueltas en el `package-lock.json`:

```sh
npm ci
```

## Correr la aplicación

```sh
npm start
```

También puede ejecutar `node .` para saltarse el paso de construcción.

Abra http://127.0.0.1:3000 en su navegador.

## Reconstruir el proyecto

Para construir el proyecto de forma incremental:

```sh
npm run build
```

Para forzar una construcción completa limpiando los artefactos de la caché:

```sh
npm run rebuild
```

## Corregir problemas de estilo y formato del código

```sh
npm run lint
```

Para solucionar automáticamente estos problemas:

```sh
npm run lint:fix
```

## Otros comandos útiles

- `npm run migrate`: Migrar los esquemas de la base de datos para los modelos
- `npm run openapi-spec`: Genera la especificación OpenAPI en un archivo
- `npm run docker:build`: Construye una imagen Docker para esta aplicación
- `npm run docker:run`: Ejecuta esta aplicación dentro de un contenedor Docker

## Pruebas

```sh
npm test
```

## ¿Qué Sigue?

Por favor, consulta la [documentación de LoopBack 4](https://loopback.io/doc/en/lb4/) para
entender cómo puedes seguir añadiendo funciones a esta aplicación.

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
