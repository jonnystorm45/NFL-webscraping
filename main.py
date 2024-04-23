
var axios = require('axios');
var cheerio = require('cheerio');

// Function to fetch HTML content from the NFL Draft website
function fetchHTML(url) {
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching the page:', error);
        });
}

// Function to scrape NFL Draft information from the HTML content
function scrapeNFLDraftInfo() {
    var url = 'https://www.nfl.com/draft/tracker/picks';
    fetchHTML(url)
        .then(html => {
            if (html) {
                var $ = cheerio.load(html);

                // Example: Scraping player names
                var playerNames = [];
                $('.nfl-o-cta__player-name').each(function(index, element) {
                    playerNames.push($(element).text().trim());
                });

                // Example: Scraping player positions
                var playerPositions = [];
                $('.nfl-o-cta__player-pos').each(function(index, element) {
                    playerPositions.push($(element).text().trim());
                });

                // Example: Scraping player colleges
                var playerColleges = [];
                $('.nfl-o-cta__player-college').each(function(index, element) {
                    playerColleges.push($(element).text().trim());
                });

                // Print the scraped information
                console.log("Player Names:", playerNames);
                console.log("Player Positions:", playerPositions);
                console.log("Player Colleges:", playerColleges);
            }
        });
}

// Call the scrapeNFLDraftInfo function to start scraping
scrapeNFLDraftInfo();
