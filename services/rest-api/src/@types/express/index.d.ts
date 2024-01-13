// import { AuthenticatedUserPayload } from "../../common/payloads/authenticated-user.payload";

import { User } from "../../auth/auth.type";

export { };
declare global {
  namespace Express {
    interface Request {
      user?: User;
      admin?: boolean;
    }
  }
}