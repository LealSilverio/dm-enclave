export interface User {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  auth0Id: string;
  email: string;
  type: "player" | "dm";
}
