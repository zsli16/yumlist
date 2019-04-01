# Yumlist - Legacy Project

## Friction & Solutions

1. 'postgres' role specified in 'config.json' as configured username.
   1. Two ways of solving it:
      1. Create role 'postgres' in PSQL.
      2. Modify 'config.json' to point to localhost username.
2. Sequelize was not creating the table structure on startup. Manual creation of tables and relations required.
   1. Trataba de incrementar ids custom de tipo text, y entonces SQL buscaba un serial
   2. Sync no habilitado en el index
3. Falta rol postgres en la base de datos
   1. Dos opciones: o crear rol en base de datos, o modificar config.json para que username sea LOCALUSERNAME (elegida esta última)
4. Variables URL apuntan al valor del PC del developer previo específico
   1. Sustituir localhost/sue-macbook-pro por nueva variable
5. Necesidad de habilitar file sharing para poder testear (copiar url del local en nueva variable)
   1. Developer debe habilitar file sharing y copiar su url-local en la variable exposedUrl

## Developer Setup Guide

1. asegurarse que las bases de datos referenciadas en el config.json existen
   1. jest busca la base de datos de test automaticamente, así que asegurarse de que existe el config.json y tiene una base de datos de test. luego, hacer el chequeo de env = process.env.NODE_ENV || "development"890º 
2. Instalar Jest es solo para backend, react-scripts busca solo tests dentro del SRC -> si se quiere usar enzyme con react-scripts, hay que generar un fichero setupTests en el src con el configure, el adaptar y jest-enzyme

## Legacy Project Plan

1. (fix, design) (DONE) Responsive design, several visual bugs
2. (add, design) (DONE) Main logo routes to create
3. (add, design) Out-of-modal click to close
4. (add, stability) Testing Backend
5. (add, stability) Testing Frontend 
6. (add, feature) Add location en create, y utilizarla en las queries
7. (fix, feature) Fix search (a veces se queda pillado incluso cuando la text-box está vacía, mostrando un resultado anterior)
8. (fix, feature) API change to Google Places (unreliable yelp behaviour)
9. (add, feature) User db table + User creation(si no existe user, al añadir el creador a la tabla o al añadir mi nombre en una shared list) + User relation to lists + User remembering through cookies + User dashboard shows lists

PARA COMPONENTES CONECTADOS SI SE QUIERE TESTEAR UNIT TESTING, EXPORTAR TANTO EL TRONCHO CONECTADO (QUE ES EL COMPONENTE QUE SE AÑADIRÁ EN LOS RENDERS DE MANERA NORMAL)

COMO LA CLASE EN SI, QUE ES LO QUE SE IMPORTARÁ EN EL UNIT TEST PARA PODER SER SHALLOW-RENDERED



THIS PROPS HISTORY ES PASADO AUTO A LOS COMPOENNES DE CADA ROUTE POR EL ROUTER, Y SI QUEREMOS PASARLO A LOS HIJOS, EN PROPS



# ARROW FUNCTION DEBERIA SER SOLO PARA METODOS Y LAS REFERENCIAS DEBERIAN SER SIEMPRE THIS.METHOD SIN NA MAS, PERO SI SE QUIERE COMPROBAR DENTRO DE UN SPY, PARA QUE LA SUITE DETECTE LA CALL, HAY QUE ENVOLVER LA REFERENCIA EN UNA ARROW FUNCTION

MIRAR EL MOCKSTORE PARA NO TENER QUE VOLVERSE LOCOS AL TESTEAR REDUX

