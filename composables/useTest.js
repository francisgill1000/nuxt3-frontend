
const config = useRuntimeConfig();

export default function() {
    return {
        baseUrl: config.public.baseUrl
    };
}