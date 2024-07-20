import { auth } from "express-oauth2-jwt-bearer";

const checkToken = auth({
  audience: "dmenclave1",
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

export default checkToken;
