# Price-alert-services
github: https://github.com/manhcuong3092/Price-alert-services
---
### Condition
Installed nodejs
## Run Locally

Clone the project

```bash
  git clone https://github.com/manhcuong3092/Price-alert-services
```

Go to the project directory

```bash
  cd Price-alert-services

```

Install dependencies

```bash
  sh init.sh
```

#### Run each service, open new cmd for each one
First, create .env file base on .env.example file (change email, password) for each service

Run coin service

```bash
  cd coin-service
  npm run start
```

Run notice service

```bash
  cd notice-service
  npm run start
```
Run alert service

```bash
  cd alert-service
  npm run start
```

Run price alert service

```bash
  cd price-alert-service
  npm run start
```

## Open task service Price alert

Open browser, go to

```bash
  http://localhost:5000
```
