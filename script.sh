folders=(controllers models services routes middlewares)

mkdir server && cd server/

npm init -y

npm i express cors dotenv mongoose jsonwebtoken bcryptjs --save
npm install nodemon eslint-config-trybe-backend --save-dev

echo "Dependencias instaladas"

touch .env .gitignore .eslintrc.json

echo "Arquivos basicos criados"

echo "node_modules" >> .gitignore
echo ".env" >> .gitignore

echo "Variaveis de ambiente setadas"

echo "PORT=4000" >> .env

echo '{
  "extends": "trybe-fundamentals"
}' >> .eslintrc.json

if ! command -v ntl &> /dev/null
then
echo "ntl nao encontrado, instalando..."    
    sudo npm i -g ntl
fi

echo "ntl instalado"

if ! command -v jq &> /dev/null
then
    echo "jq nao encontrado, instalando..."
    brew install jq
    # or sudo apt-get install jq
fi

echo "jq instalado"

if ! command -v multer &> /dev/null
then
    echo "multer nao encontrado, instalando..."
    sudo npm i multer
fi

echo "multer instalado"

jq '.scripts += {start: "node src/index.js", dev: "nodemon src/index.js"}' package.json > tmp.$$.json && mv tmp.$$.json package.json

echo "Scripts adicionados"

mkdir src && cd src/

touch index.js

for item in "${folders[@]}"
do
    mkdir $item && cd $item/
    touch auth.$item.js
    cd ..
done

echo "Estrutura de pastas criada"