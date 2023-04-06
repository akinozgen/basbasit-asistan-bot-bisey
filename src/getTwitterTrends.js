import axios from 'axios';

export async function getTwitterTrends() {
    const requestHeaders = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'tr-TR,tr',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'referer': 'https://www.google.com/',
        'sec-ch-ua': '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'cross-site',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    };

    let trends = [];

    const response = await axios.get('https://trends24.in/turkey/', { headers: requestHeaders });
    const trendsHtml = response.data;

    // Selector: <ol class=trend-card__list>ANYTHING</ol>
    const trendsList = trendsHtml.match(/<ol class=trend-card__list>(.|\n)*?<\/ol>/g)[0];
    // Selector: <li><a href="LINK">TREND_WORD</a><br><span class=tweet-count>NUMBER</span></li>
    const trendsListItems = trendsList.match(/<li>(.|\n)*?<\/li>/g);
    trendsListItems.forEach(trendListItem => {
        const trendWord = trendListItem.match(/<a href="(.|\n)*?">(.|\n)*?<\/a>/g)[0].match(/>.*</g)[0].replace(/</g, '').replace(/>/g, '');
        trends.push(trendWord);
    });

    // clear # from the beginning of the string.
    // skip if the string is empty or contains only whitespace.
    // skip if string has arabic letters or emojis
    trends = trends.map(trend => trend.replace(/^#/, '')).filter(trend => trend.trim() !== '' && !trend.match(/[^\x00-\x7F]/g) && !trend.match(/[\u0600-\u06FF]/g));

    return trends;
}