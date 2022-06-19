const buildHeaders = (customHeaders) => {
    customHeaders = customHeaders ? customHeaders : {};
    return {
        ...customHeaders,
        accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
        'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36`,
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': 1,
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'cache-control': 'max-age=0',
        'sec-ch-ua': `"Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"`,
        'sec-ch-ua-mobile': '?0',
        'accept-language': 'en,en-US;q=0.9,en-CA;q=0.8,en-GB;q=0.7'
    };
}

module.exports = {buildHeaders};