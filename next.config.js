/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["www.mos.ru", "icdn.lenta.ru"],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/1",
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
