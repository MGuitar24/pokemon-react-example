#!/bin/bash
if [[ "$OSTYPE" == "darwin20.0" ]]; then
docker build -t docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev .

docker push docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev

ssh -t $DOCKER_SERVER 'set +e && sudo docker pull docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev && sudo docker stop pokemon-react-example && sudo docker rm pokemon-react-example && sudo docker run -d -p 80:80/tcp --name pokemon-react-example docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev'
fi

if [[ "$OSTYPE" == "linux-gnu" ]]; then
sudo docker build -t docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev .

sudo docker push docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev

ssh -t $DOCKER_SERVER 'set +e && sudo docker pull docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev && sudo docker stop pokemon-react-example && sudo docker rm pokemon-react-example && sudo docker run -d -p 80:80/tcp --name pokemon-react-example docker.pkg.github.com/mguitar24/pokemon-react-example/pokemon-react-example:dev'
fi