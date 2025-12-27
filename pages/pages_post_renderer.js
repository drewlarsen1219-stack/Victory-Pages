// pages/pages_post_renderer.js

/**
 * POSTS_DATA: This array holds ALL public forum posts.
 * The data is stored locally in this script to avoid browser import errors
 * when running the site from a local file:// path.
 * * NOTE: The 'date' must be a string format (YYYY-MM-DD) for sorting to work correctly.
 * Use a sequential 'id' for the readPost function to work.
 */
const POSTS_DATA = [
    {
        id: 1,
        title: "Welcome to Victory Pages!",
        tag: "life",
        author: "AdminUser",
        date: "2025-12-01",
        content: "This is the first post on the new forum. The retro UI looks great! Use the 'Create Post' button below to add your own public page to the forum. This post is purposefully long so you can test the 'Read More' functionality. This means adding a few more lines of text here to exceed the 150 character limit set for the preview. Testing, testing, 1, 2, 3. We can write a whole paragraph about the importance of fellowship in the Christian walk, citing scripture like Hebrews 10:24-25, which encourages believers to spur one another toward love and good deeds and not to neglect meeting together, as is the habit of some."
    },
    {
        id: 2,
        title: "Question about the Finder Path",
        tag: "faith",
        author: "NewbieVic",
        date: "2025-12-05",
        content: "I'm a new user and I'm a bit confused about the Finder Path structure. Can anyone share their experience or a quick guide on what the 'Ways' are supposed to lead to? I am currently trying to figure out how to track my progress in my spiritual disciplines. Is there a built-in feature for daily Bible reading and prayer tracking, or do I need to input that information manually? Any tips for maximizing the Pathfinder tool would be greatly appreciated!"
    },
    {
        id: 3,
        title: "Investing for Christians: Seeking Wisdom",
        tag: "investing",
        author: "FinancePro",
        date: "2025-12-10",
        content: "Are there any good Christian-focused books or resources on ethical investing? Trying to align my financial path with my faith path. Any advice appreciated! Short and sweet, this post should not trigger 'Read More'."
    }
    // ADD NEW APPROVED POST OBJECTS HERE
];


const postsList = document.getElementById('posts-list');
const postsMessages = document.getElementById('posts-messages');
const tagDropdown = document.getElementById('tagDropdown');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

// Pagination settings
const POSTS_PER_PAGE = 1;
let currentPage = 1;
let currentPosts = [];

// Make readPost globally accessible for inline onclick events
window.readPost = readPost;

// --- CORE FUNCTIONS ---

/**
 * Filters, sorts, and paginates the posts array.
 */
function filterAndSortPosts() {
    const selectedTag = tagDropdown.value;
    
    // 1. Filter
    let filteredPosts = POSTS_DATA.filter(post => 
        selectedTag === 'Most recent' || post.tag.toLowerCase() === selectedTag.toLowerCase()
    );

    // 2. Sort (by date descending: most recent first)
    // Converts date strings to Date objects for accurate sorting
    filteredPosts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    currentPosts = filteredPosts;
    currentPage = 1; // Reset to page 1 after filtering/sorting
    renderPostList();
}

/**
 * Renders the list of forum posts for the current page.
 */
function renderPostList() {
    postsMessages.textContent = '';
    postsList.classList.add('h-96', 'overflow-y-auto');
    
    const totalPages = Math.ceil(currentPosts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToDisplay = currentPosts.slice(startIndex, endIndex);

    postsList.innerHTML = '';

    if (postsToDisplay.length === 0) {
        postsList.innerHTML = `<p class="text-center text-gray-600 p-4">No posts found for the tag: ${tagDropdown.value}</p>`;
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = true;
        return;
    }

    postsToDisplay.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-item';
        
        const contentPreviewLimit = 7000;
        const needsReadMore = post.content && post.content.length > contentPreviewLimit;
        const contentPreview = post.content 
            ? post.content.substring(0, contentPreviewLimit) + (needsReadMore ? '...' : '') 
            : 'No content preview.';
        
        const readMoreButtonHtml = needsReadMore 
            ? `<button class="text-xs text-blue-700 classic-3d-button mt-2" onclick="readPost(${post.id})">Read More</button>` 
            : '';

        postElement.innerHTML = `
            <div class="post-header">${post.title || 'Untitled Post'}</div>
            <p>${contentPreview}</p>
            <div class="post-meta">
                Author: ${post.author || 'Anonymous'} | Tag: ${post.tag || 'General'} | Date: ${post.date}
            </div>
            ${readMoreButtonHtml}
        `;
        postsList.appendChild(postElement);
    });
    
    // Update pagination buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= totalPages;
}

/**
 * Fetches and renders a single post.
 * @param {number} postId - The ID of the post to read.
 */
function readPost(postId) {
    const post = POSTS_DATA.find(p => p.id === postId);

    if (!post) {
        postsList.innerHTML = '<p class="text-center text-red-700 p-4">Post not found.</p>';
        return;
    }
    
    renderSinglePost(post);
}

/**
 * Renders a single post in detail.
 * @param {Object} post - The post object.
 */
function renderSinglePost(post) {
    postsMessages.textContent = ''; 
    postsList.classList.remove('h-96', 'overflow-y-auto'); 

    // Render the detailed view
    postsList.innerHTML = `
        <br>
		<button id="backToPagesBtn" class="btn-class3 mb-4">&lt; Back to Pages</button>
		<br>
        <div class="post-detail-container p-3 min-h-[300px]">
            <h2 class="text-xl font-bold mb-2">${post.title || 'Untitled Post'}</h2>
            <div class="post-meta mb-4 text-sm">
                Author: ${post.author || 'Anonymous'} | Tag: ${post.tag || 'General'} | Date: ${post.date}
            </div>
            <hr class="border-t border-gray-300 my-4">
            <p class="whitespace-pre-wrap text-black">${post.content || 'No content.'}</p>
        </div>
    `;

    // Attach event listener to the back button
    document.getElementById('backToPagesBtn').addEventListener('click', () => {
        // Rerun the filter and sort to ensure the list is refreshed correctly
        filterAndSortPosts(); 
    });
}

// --- INITIALIZATION & LISTENERS (Video Logic) ---

// Set up event listeners (for post pagination/filtering)
tagDropdown.addEventListener('change', filterAndSortPosts);
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPostList();
    }
});
nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(currentPosts.length / POSTS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPostList();
    }
});

// Initial load: Run filter and sort to populate the post list
document.addEventListener('DOMContentLoaded', () => {
    filterAndSortPosts();
});

    // Define CSS selectors
    const PLACEHOLDER_SELECTOR = '.video-placeholder';
    const CONTAINER_SELECTOR = '.video-container';

    /**
     * Finds a video container and removes its iframe, effectively stopping playback 
     * and forcing a resource release.
     * @param {string} videoId - The ID stem (e.g., 'video1')
     */
    function destroyIframe(videoId) {
        const container = document.getElementById(`${videoId}-container`);
        if (container) {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                // Completely remove the iframe from the DOM
                container.removeChild(iframe);
            }
        }
    }

    /**
     * Creates a new iframe element and inserts it into the specified container.
     * @param {string} videoId - The ID stem (e.g., 'video1')
     * @param {string} videoUrl - The full embed URL with parameters
     */
    function createIframe(videoId, videoUrl) {
        const container = document.getElementById(`${videoId}-container`);
        if (container) {
            // 1. Create the new iframe element
            const newIframe = document.createElement('iframe');
            
            // 2. Set all necessary attributes
            newIframe.setAttribute('width', '560');
            newIframe.setAttribute('height', '315');
            newIframe.setAttribute('frameborder', '0');
            newIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            newIframe.setAttribute('allowfullscreen', '');
            newIframe.src = videoUrl; // Set the source *after* all other attributes

            // 3. Insert the new iframe into the container
            container.appendChild(newIframe);
        }
    }

    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        const videoPlaceholders = document.querySelectorAll(PLACEHOLDER_SELECTOR);

        // Map to store the original iframe structure data for re-creation
        const videoMap = {};

        // Initialization: Capture all video IDs and destroy initial empty iframes
        videoPlaceholders.forEach(placeholder => {
            const videoId = placeholder.id.replace('-placeholder', '');
            videoMap[videoId] = true; // Simple map to track IDs
            
            // Immediately destroy any placeholder iframes to start clean
            destroyIframe(videoId); 
            
            // Ensure container is hidden at start
            const container = document.getElementById(`${videoId}-container`);
            if (container) {
                container.style.display = 'none';
            }
        });


        // Loop through each placeholder link to attach the click listener
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', function(event) {
                event.preventDefault();

                const clickedVideoId = this.id.replace('-placeholder', '');
                let videoUrl = this.getAttribute('data-video-url');

                // 1. **AGGRESSIVE RESET:** Loop through ALL known video IDs
                Object.keys(videoMap).forEach(videoId => {
                    const container = document.getElementById(`${videoId}-container`);
                    const placeholderEl = document.getElementById(`${videoId}-placeholder`);

                    // Destroy the iframe if it exists
                    destroyIframe(videoId);
                    
                    // Show the placeholder link and hide the container
                    if (placeholderEl) {
                        placeholderEl.style.display = 'inline';
                    }
                    if (container) {
                        container.style.display = 'none';
                    }
                });

                // 2. **LOAD NEW VIDEO:** Load the clicked video
                
                // Ensure protocol is HTTPS
                if (!videoUrl.startsWith('https://')) {
                    videoUrl = 'https://' + videoUrl.replace('//', '');
                }

                // Hide the text link for the one we are about to play
                this.style.display = 'none'; 

                // Create and load the new iframe for the selected video
                createIframe(clickedVideoId, videoUrl);

                // Make the container visible
                document.getElementById(`${clickedVideoId}-container`).style.display = 'block';
            });
        });
    });
    
// EXPOSE CORE FUNCTION GLOBALLY for the external script to call
window.filterAndSortPosts = filterAndSortPosts;