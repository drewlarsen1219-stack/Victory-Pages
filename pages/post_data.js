// posts_data.js - Contains all post information and handles dynamic loading

const postsData = [
    {
        title: "Yu-Gi-Oh!",
        filename: "1764443096691_Yu_Gi_Oh.html",
        date: "Oct. 22, 2025",
        tags: ["gaming"],
        author: "Green"
    },
    {
        title: "Investing",
        filename: "1764443096688_Investing.html",
        date: "Oct. 14, 2025",
        tags: ["investing"],
        author: "Green"
    },
    {
        title: "Moving towns or cities",
        filename: "1764443096689_moving_towns.html",
        date: "Oct. 14, 2025",
        tags: ["life"],
        author: "Green"
    },
    {
        title: "Things happening in my life",
        filename: "1764443096690_my_life.html",
        date: "Oct. 8, 2025",
        tags: ["life"],
        author: "Green"
    },
    {
        title: "Movie Reviews",
        filename: "1764443096688_movie_reviews.html",
        date: "Oct. 5, 2025",
        tags: ["movies"],
        author: "Green"
    },
    {
        title: "October 2025",
        filename: "1764443096690_person_post_2.html",
        date: "Oct. 2025",
        tags: ["life", "faith"],
        author: "Green"
    },
    {
        title: "Guy from my hometown",
        filename: "1764443096687_guy_from_my_hometown.html",
        date: "Sep. 28, 2025",
        tags: ["life", "faith"],
        author: "Green"
    },
    {
        title: "Music",
        filename: "1764443096689_music.html",
        date: "Sep. 26, 2025",
        tags: ["music"],
        author: "Green"
    },
    {
        title: "My gripes with OldLutheran.com",
        filename: "1764443096689_my_cripes_with_OldLutheran.com.html",
        date: "Sep. 26, 2025",
        tags: ["faith", "opinion"],
        author: "Green"
    },
    {
        title: "Powerful acts of forgiveness",
        filename: "1764443096690_powerful_acts_of_forgiveness.html",
        date: "Sep. 26, 2025",
        tags: ["faith"],
        author: "Green"
    },
    {
        title: "September 2025",
        filename: "1764443096690_personal_post.html",
        date: "Sep. 2025",
        tags: ["life"],
        author: "Green"
    },
    {
        title: '"Conclave" full review',
        filename: "1764443096688_movie_conclave.html",
        date: "Sep. 10, 2025",
        tags: ["movies"],
        author: "Green"
    },
    {
        title: '"Mysteries of the Bible" full review',
        filename: "1764443096688_movie_mysteries_of_the_bible.html",
        date: "Sep. 10, 2025",
        tags: ["movies", "faith"],
        author: "Green"
    }
];

// Posts per page configuration
const POSTS_PER_PAGE = 30;

// Current page and filtered posts
let currentPage = 1;
let filteredPosts = [...postsData];
let isViewingSinglePost = false;

// Generate HTML for a single post (Hacker News style)
function generatePostHTML(post) {
    return `
        <div class="post">
            <div class="post-title">
                <a href="#" onclick="loadPost('${post.filename}'); return false;">${post.title}</a>
            </div>
            <div class="post-subtext">
                by ${post.author} | ${post.date} | ${post.tags.join(', ')}
            </div>
        </div>
    `;
}

// Display posts for current page
function displayPosts() {
    const postsContainer = document.getElementById('posts');
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    postsContainer.innerHTML = postsToShow.map(post => generatePostHTML(post)).join('');
    
    updatePaginationControls();
    showPostListUI();
}

// Load a single post
async function loadPost(filename) {
    const postsContainer = document.getElementById('posts');
    
    try {
        postsContainer.innerHTML = '<p>Loading...</p>';
        
        const response = await fetch(`Posts/${filename}`);
        if (!response.ok) throw new Error('Post not found');
        
        const html = await response.text();
        
        // Parse the HTML to extract just the body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.body.innerHTML;
        
        // Add back button and display content
        postsContainer.innerHTML = `
            <button onclick="backToPostList()" class="btn-class3" style="margin-bottom: 15px;">← Back to Posts</button>
            <div class="single-post-content">
                ${bodyContent}
            </div>
        `;
        
        isViewingSinglePost = true;
        hidePostListUI();
        window.scrollTo(0, 0);
        
    } catch (error) {
        postsContainer.innerHTML = `
            <p>Error loading post: ${error.message}</p>
            <button onclick="backToPostList()" class="btn-class3">← Back to Posts</button>
        `;
    }
}

// Go back to post list
function backToPostList() {
    isViewingSinglePost = false;
    displayPosts();
}

// Show post list UI elements
function showPostListUI() {
    document.getElementById('post-action-row').style.display = 'block';
    document.querySelector('.tag-dropdown-container').style.display = 'block';
    document.querySelector('.pagination-controls').style.display = 'block';
}

// Hide post list UI elements
function hidePostListUI() {
    document.getElementById('post-action-row').style.display = 'none';
    document.querySelector('.tag-dropdown-container').style.display = 'none';
    document.querySelector('.pagination-controls').style.display = 'none';
}

// Update pagination button states
function updatePaginationControls() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayPosts();
        window.scrollTo(0, 0);
    }
}

// Filter posts by tag
function filterPostsByTag(tag) {
    if (tag === 'all') {
        filteredPosts = [...postsData];
    } else {
        filteredPosts = postsData.filter(post => post.tags.includes(tag));
    }
    
    currentPage = 1;
    displayPosts();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayPosts();
    
    // Set up pagination buttons
    document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
    document.getElementById('nextPage').addEventListener('click', () => changePage(1));
    
    // Set up tag filter dropdown
    const tagDropdown = document.getElementById('tagDropdown');
    if (tagDropdown) {
        tagDropdown.addEventListener('change', (e) => {
            filterPostsByTag(e.target.value);
        });
    }
});