# Aplicación que consume el API de pokemon

Esta aplicación hace uso de la librería express de NodeJS, y aplica el patrón de diseño MVC para resolver la problemática planteada.

## Qué necesito para que funcione
1. NodeJS
2. Navegador de internet

## Cómo hacer que funcione
1. Descarga el repositorio en tu computadora
2. Accede a la carpeta desde una línea de comandos
3. Ejecuta el comando *npm start*

## Enpoints utilizados
Para poder acceder a la aplicación debes usar los siguientes endpoints.

> /api/pokemons para peticiones GET 
>
> /api/pokemon para peticiones POST

## Ejemplos de peticiones
GET 
>  <http://localhost:3977/api/pokemons?limit=5&page=3&search=cha> 
>
> <http://localhost:3977/api/pokemons?limit=5&page=3> 
>
> <http://localhost:3977/api/pokemons>