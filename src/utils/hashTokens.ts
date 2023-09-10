import crypto from "crypto";

export const hashToken = (token: any) =>
  crypto.createHash("sha512").update(token).digest("hex");
