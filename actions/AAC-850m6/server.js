function(properties, context) {
    
const { getSubtitles } = require('youtube-caption-extractor');

// Function to extract video ID from YouTube URL
function extractVideoId(url) {
    
    // Regular expression to match various YouTube link formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        
        // Return null or throw an error if the URL is invalid
        throw new Error('Invalid YouTube URL');
    }
}

    
// Example usage with a YouTube URL (replace this with the user-provided URL)
const youtubeUrl = properties.videoID;
const videoID = extractVideoId(youtubeUrl);
const language = properties.language; // Optional, default is 'en' (English)

return getSubtitles({ videoID, language })
    .then(subtitles => {
        let fullTranscript = "";
        for (let subtitle of subtitles) {
            fullTranscript += subtitle.text + " ";
        }

        // Return the full transcript as the result of the action
        return { transcript: fullTranscript.trim() };
    })
    .catch(error => {
        // Handle the error
        console.error("Error fetching subtitles:", error);
        throw error;
    });
}