-- DEPENDENCES --

NodeJs
NPM
Docker

-- DATABASE --

sudo docker run --name Solida-tabase -e POSTGRES_PASSWORD=PelaHorda -d postgres

-- SETUP --

cd ./Solida-API
cp .env.example .env
sudo docker inspect Solida-tabase
# copy the "IPAddress" inside "NetworkSettings" and paste into .env
npm install 
npm run database

-- RUN --

sudo docker start Solida-tabase
npm run dev






