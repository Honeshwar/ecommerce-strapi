# Deployment
it not need any cloudinary, postgres, because it store internally(500db entries) enough
- it take .env file in root also no need to add from dashboard of cloud.strapi.com

## Issue: 
token of stripe not able to pass in headers, throw error by stripe
solution: delete old deployment and instead of adding env from dashboard i add .env file at root of project and its work

pass- TEST123@h
testing stripe card number: 4242 4242 4242 4242