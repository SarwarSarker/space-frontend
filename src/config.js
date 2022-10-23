export const LinkedInApi = {
  clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
  redirectUrl: "http://localhost:3000/",
  oauthUrl:
    "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
  scope: "r_liteprofile%20r_emailaddress",
  state: "123456",
};

export const NodeServer = {
  baseURL: "http://localhost:3001",
  getUserCredentials: "/getUserCredentials",
};
