export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://frameratr-dev-alb-1434013349.us-east-2.elb.amazonaws.com"
    : "http://localhost:3000";
