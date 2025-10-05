gcloud builds submit --tag "gcr.io/ecstasy-ventures/ecstasy-ventures" . --project="ecstasy-ventures"


gcloud run deploy "ecstasy-ventures" \
  --image="gcr.io/ecstasy-ventures/ecstasy-ventures" \
  --platform=managed \
  --region="us-east1" \
  --allow-unauthenticated \
  --project="ecstasy-ventures"