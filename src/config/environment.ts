export const api_url = "http://localhost:3200"

export enum user_url {
  CREATE_USER = "/auth/signup",
  LOGIN_USER = "/auth/login",
  CHECK_JWT_TOKEN_STATUS = "/auth/status",
  CREATE_COMMENT = "/comments",
  FETCH_COMMENTS = "/comments",
  DELETE_COMMENT = "/comments/"
}
