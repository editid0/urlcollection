const dns = require('dns').promises;
import urlMetadata from 'url-metadata';

export async function resolveHostname(hostname) {
    try {
        const addresses = await dns.resolve4(hostname);
        console.log(`Resolved IPs: ${addresses.join(', ')}`);
        return addresses;
    } catch (err) {
        console.error(`Failed to resolve hostname: ${err.message}`);
        return null;
    }
}

export function isPrivateIp(ip) {
    return (
        ip.startsWith('10.') ||
        ip.startsWith('192.168.') ||
        ip.startsWith('172.') && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31 ||
        ip === '127.0.0.1'
    );
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const meta = searchParams.get("meta");
    if (!url) {
        return new Response("URL is required", { status: 400 });
    }
    if (/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(url) === false) {
        return new Response("Invalid URL format", { status: 400 });
    }
    var hostname;
    try {
        hostname = new URL(url).hostname;
    } catch (error) {
        try {
            hostname = new URL(`http://${url}`).hostname;
        } catch (error) {
            return new Response("Invalid URL format", { status: 400 });
        }
    }
    const addresses = await resolveHostname(hostname);
    if (!addresses) {
        return new Response("Failed to resolve hostname", { status: 500 });
    }
    const privateIps = addresses.filter(isPrivateIp);
    if (privateIps.length > 0) {
        // i return invalid url format so that people dont know they found a private IP, or they might try to bypass this check
        return new Response("Invalid URL format", { status: 400 });
    }
    // only now, get meta data if meta is true
    if (meta === "true") {
        let nurl = url;
        if (!/^https?:\/\//i.test(nurl)) {
            nurl = `https://${nurl}`;
        }
        const metaData = await urlMetadata(nurl).catch(err => {
            console.error("Error fetching metadata:", err);
            return null;
        });
        if (!metaData) {
            return new Response("Failed to fetch metadata", { status: 500 });
        }
        return new Response(JSON.stringify({ ...metaData, valid: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ valid: true }), { status: 200 });
    }

}