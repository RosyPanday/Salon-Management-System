# frontend

 run instruction: 
 1. install package using npm install
 2. npm run dev
 3. add the env
 VITE_BACKEND_URL 


 # backend
run instruction

1. install packages using npm install
2. migrate the database using the command
  npx sequelize-cli db:migrate
3.  add the envs
CORS_WHITE_LIST= 
PORT= 
CONNECTION_STRING= 
4.npx tsx src/server.ts

# usage
frontend:  react,ts,tanstack-query, tailwind css, react/hookform, zod validation
backend: express, node, sequelize ORM, supabase db, singleton database pattern, service and repository layer design pattern

# completed features

backend: full crud of salon service management as well as appointment management completed
frontend : api integration for salon service management, add ,edit, delete ,read salon services api completed

# unfinished/left

frontend: ongoing appointment create api integration, left the integrated read, update/patch api
