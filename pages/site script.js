/**
 * Toggles visibility of the columns based on the 'hidden-content' class,
 * updates the button text, and manages the carved image display.
 * This file should also contain any other general utility functions (like video functions).
 */
function toggleColumn(columnId) {
    const content = document.getElementById(columnId);
    // Assuming the button ID is the contentId + '-toggle' (e.g., 'pages-content-toggle')
    const button = document.getElementById(columnId + '-toggle'); 
    
    // Check if we are toggling the 'pages-content' column
    if (columnId === 'pages-content') {
        const imageContainer = document.getElementById('pages-closed-image');

        if (content.classList.contains('hidden-content')) {
            // 1. OPENING PAGES CONTENT
            content.classList.remove('hidden-content');
            
            // Update Button Text
            if (button && button.innerHTML) {
                // Assuming the button text is wrapped in a span for the text-shadow style
                button.innerHTML = button.innerHTML.replace('Open', 'Close').replace('▼', '▲');
            }

            // HIDE THE IMAGE
            if (imageContainer) {
                imageContainer.style.display = 'none'; 
            }
            
            // **CRITICAL FIX:** RENDER POSTS WHEN THE PAGE COLUMN IS OPENED
            // This forces the posts to load after the container is made visible.
            if (window.filterAndSortPosts) {
                window.filterAndSortPosts(); 
            }
        } else {
            // 2. CLOSING PAGES CONTENT
            content.classList.add('hidden-content');
            
            // Update Button Text
            if (button && button.innerHTML) {
                button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
            }

            // SHOW THE IMAGE
            if (imageContainer) {
                imageContainer.style.display = 'block'; 
            }
        }
    } else {
        // Toggling other columns (like 'paths-content')
        if (content.classList.contains('hidden-content')) {
            content.classList.remove('hidden-content');
            if (button && button.innerHTML) {
                button.innerHTML = button.innerHTML.replace('Open', 'Close').replace('▼', '▲');
            }
        } else {
            content.classList.add('hidden-content');
            if (button && button.innerHTML) {
                button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
            }
        }
    }
}
// Include any other global functions you removed from your index.html here (e.g., video functions).