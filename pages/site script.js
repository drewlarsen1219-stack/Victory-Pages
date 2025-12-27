/**
 * Toggles visibility of the columns based on the 'hidden-content' class,
 * updates the button text, and manages the carved image display.
 * This file should also contain any other general utility functions (like video functions).
 */
function toggleColumn(columnId) {
    const content = document.getElementById(columnId);
    const button = document.getElementById(columnId + '-toggle'); 
    
    // Determine which image container to toggle based on the columnId
    let imageContainer = null;
    if (columnId === 'pages-content') {
        imageContainer = document.getElementById('pages-closed-image');
    } else if (columnId === 'paths-content') {
        imageContainer = document.getElementById('paths-closed-image');
    }

    if (content.classList.contains('hidden-content')) {
        // OPENING CONTENT
        content.classList.remove('hidden-content');
        
        if (button && button.innerHTML) {
            button.innerHTML = button.innerHTML.replace('Open', 'Close').replace('▼', '▲');
        }

        // HIDE THE IMAGE
        if (imageContainer) {
            imageContainer.style.display = 'none'; 
        }
        
        // Render posts if the pages column is opened
        if (columnId === 'pages-content' && window.filterAndSortPosts) {
            window.filterAndSortPosts(); 
        }
    } else {
        // CLOSING CONTENT
        content.classList.add('hidden-content');
        
        if (button && button.innerHTML) {
            button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
        }

        // SHOW THE IMAGE
        if (imageContainer) {
            imageContainer.style.display = 'block'; 
        }
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