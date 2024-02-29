/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ciaochow.plusnarrative.biz',
                port: '',
                pathname: '**',
            },
        ],
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    output: 'standalone'
};

export default nextConfig;
