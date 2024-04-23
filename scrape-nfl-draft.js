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

// Function to scrape NFL Draft information for the Indianapolis Colts from the HTML content
function scrapeColtsDraftInfo() {
    var url = 'https://www.nfl.com/draft/tracker/picks';
    fetchHTML(url)
        .then(html => {
            if (html) {
                var $ = cheerio.load(html);

                // Filter players drafted by the Indianapolis Colts
                var coltsDraftPicks = [];
                $('.d3-o-club-draft-tracker__club-name').each(function(index, element) {
                    var teamName = $(element).text().trim();
                    if (teamName === 'Indianapolis Colts') {
                        var $playerRow = $(element).closest('.d3-o-club-draft-tracker__player');
                        var playerName = $playerRow.find('.d3-o-club-draft-tracker__player-name').text().trim();
                        var playerPosition = $playerRow.find('.d3-o-club-draft-tracker__player-pos').text().trim();
                        var playerCollege = $playerRow.find('.d3-o-club-draft-tracker__player-college').text().trim();
                        coltsDraftPicks.push({ name: playerName, position: playerPosition, college: playerCollege });
                    }
                });

                // Print the scraped information for the Indianapolis Colts
                console.log("Indianapolis Colts Draft Picks:");
                console.log(coltsDraftPicks);
            }
        });
}

// Call the scrapeColtsDraftInfo function to start scraping
scrapeColtsDraftInfo();

