# Ticketing app (ON HOLD)

Bulding microservices with the database per service pattern and the following technologies: express.js, TypeScript, MongoDB, Redis, Next.js, Docker, Kubernetes, NATS, Jest and Skaffold.

# Folder Detail

| Folder       | Detail                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| auth         | Service to handle signup/signin/signout                                       |
| client       | The client app (Next.js)                                                      |
| common       | The commmon service that used in every service and it's uploaded to npmjs.com |
| infra        | Kubernetes infrastucture for this application                                 |
| skaffold.yaml | Skaffold configuration for this project                                      |
## Installation of ingress nginx
https://kubernetes.github.io/ingress-nginx/deploy/

## Skaffold (local dev: Windows)

Install Skaffold Dev Tool: `choco install skaffold`

From root project directory: run `skaffold dev`

---

## CI/CD: Github Actions

All CI/CD is handled via Github Actions

# Creating a secret environment

```cmd
kubectl create secret generic jwt-secret --from-literal=JWT_KEY={Anything you want}
```
