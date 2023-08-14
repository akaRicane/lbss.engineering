/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_VERSION: "0.2.4",
    ENGINE_API_LOGIN_URL_DEV: 'https://lbss-cloud-connect.auth.eu-west-3.amazoncognito.com/login?response_type=token&client_id=4uv2bnr29gnt02idnpd46h9hpf&redirect_uri=http://localhost:3000/callback',
    ENGINE_API_LOGIN_URL_PROD: 'https://lbss-cloud-connect.auth.eu-west-3.amazoncognito.com/login?response_type=token&client_id=4uv2bnr29gnt02idnpd46h9hpf&redirect_uri=https://lbss.engineering/callback',
    ENGINE_API_URL: 'https://lujgfln4y7.execute-api.eu-west-3.amazonaws.com/dev'
  },
  publicRuntimeConfig: {
    // Add your configuration options here
    staticFolder: '/static', // This assumes your HTML files are served from the "/static" folder
  },
}

module.exports = nextConfig
