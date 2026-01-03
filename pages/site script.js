/**
 * Toggles visibility of the columns and manages image display.
 */
function toggleColumn(columnId) {
    const content = document.getElementById(columnId);
    const button = document.getElementById(columnId + '-toggle'); 
    
    let imageContainer = null;
    if (columnId === 'pages-content') {
        imageContainer = document.getElementById('pages-closed-image');
    } else if (columnId === 'paths-content') {
        imageContainer = document.getElementById('paths-closed-image');
    } else if (columnId === 'paraclete-content') {
        imageContainer = document.getElementById('paraclete-closed-image');
    }


    if (content.classList.contains('hidden-content')) {
        // --- OPENING CONTENT ---
        content.classList.remove('hidden-content');
        
        if (button && button.innerHTML) {
            button.innerHTML = button.innerHTML.replace('Open', 'Close').replace('▼', '▲');
        }

        // Hide the image if it exists for this column
        if (imageContainer) {
            imageContainer.style.display = 'none'; 
        }
        
        // Special case: Render posts if the pages column is opened
        if (columnId === 'pages-content' && window.filterAndSortPosts) {
            window.filterAndSortPosts(); 
        }
    } else {
        // --- CLOSING CONTENT ---
        content.classList.add('hidden-content');
        
        if (button && button.innerHTML) {
            button.innerHTML = button.innerHTML.replace('Close', 'Open').replace('▲', '▼');
        }

        // Show the image if it exists for this column
        if (imageContainer) {
            imageContainer.style.display = 'block'; 
        }
    }
}