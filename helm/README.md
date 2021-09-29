# Build and push image

## Login docker registry

docker login rg.fr-par.scw.cloud/cobalt -u nologin -p $SCW_SECRET_KEY

## Docker build

docker build cobalt-front-end:latest .

## Tag images

docker tag cobalt-front-end:latest rg.fr-par.scw.cloud/cobalt/cobalt-front-end:latest

## Push images

docker push rg.fr-par.scw.cloud/cobalt/cobalt-front-end:latest

# Helm Deploy

## Update dependency

helm dependency update ./helm

## Deploy

helm install cobalt-front-end ./helm --namespace=default -f ./helm/values.dev.yaml

## Upgrade

helm upgrade cobalt-front-end ./helm --namespace=default -f ./helm/values.dev.yaml
