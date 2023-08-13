/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ENGINE_API_LOGIN_URL: 'https://lbss-cloud-connect.auth.eu-west-3.amazoncognito.com/login?response_type=token&client_id=4uv2bnr29gnt02idnpd46h9hpf&redirect_uri=http://localhost:3000/callback'
  }
}

module.exports = nextConfig
