const postsData = [
    {
        title: "Guy from my hometown",
        filename: "guy_from_my_hometown.html",
        date: "Sep. 28, 2025",
        tags: ["life", "faith"],
        excerpt: "When I am at work I like to ask where my customers are from..."
    },
    {
        title: "Investing",
        filename: "Investing.html",
        date: "Oct. 14, 2025",
        tags: ["investing"],
        excerpt: "My efforts at investing and documenting what works for me"
    },
    {
        title: '"Conclave" full review',
        filename: "movie_conclave.html",
        date: "Sep. 10, 2025",
        tags: ["movies"],
        excerpt: "Typically I do not like A24 movies because I find them to usually be too high effort..."
    },
    {
        title: '"Mysteries of the Bible" full review',
        filename: "movie_mysteries_of_the_bible.html",
        date: "Sep. 10, 2025",
        tags: ["movies", "faith"],
        excerpt: '"Mysteries of the Bible" by Questar Entertainment. Disc 1-4 were great...'
    },
    {
        title: "Movie Reviews",
        filename: "movie_reviews.html",
        date: "Oct. 5, 2025",
        tags: ["movies"],
        excerpt: "A collection of my movie ratings and reviews"
    },
    {
        title: "Moving towns or cities",
        filename: "moving_towns.html",
        date: "Oct. 14, 2025",
        tags: ["life"],
        excerpt: "Documenting my move to a new town"
    },
    {
        title: "Music",
        filename: "music.html",
        date: "Sep. 26, 2025",
        tags: ["music"],
        excerpt: "I am posting here about some of my favorite music and why it's good..."
    },
    {
        title: "My gripes with OldLutheran.com",
        filename: "my_cripes_with_OldLutheran.com.html",
        date: "Sep. 26, 2025",
        tags: ["faith", "opinion"],
        excerpt: "OldLutheran.com is a website that you can buy a variety of lutheran merchandise..."
    },
    {
        title: "Things happening in my life",
        filename: "my_life.html",
        date: "Oct. 8, 2025",
        tags: ["life"],
        excerpt: "A collection of posts about things happening in my life"
    },
    {
        title: "October 2025",
        filename: "person_post_2.html",
        date: "Oct. 2025",
        tags: ["life", "faith"],
        excerpt: "Going back to college, puppeteering for a local live show..."
    },
    {
        title: "September 2025",
        filename: "personal_post.html",
        date: "Sep. 2025",
        tags: ["life"],
        excerpt: "3 year anniversary - This year has been the most difficult and growth induced of my marriage."
    },
    {
        title: "Powerful acts of forgiveness",
        filename: "powerful_acts_of_forgiveness.html",
        date: "Sep. 26, 2025",
        tags: ["faith"],
        excerpt: "A couple of my favorite videos of acts of forgiveness that we can all learn from..."
    },
    {
        title: "Yu-Gi-Oh!",
        filename: "Yu_Gi_Oh.html",
        date: "Oct. 22, 2025",
        tags: ["gaming"],
        excerpt: "This game has been surprisingly an enjoyable game for me..."
    }
];

// Posts per page configuration
const POSTS_PER_PAGE = 5;

// Current page and filtered posts
let currentPage = 1;
let filteredPosts = [...postsData];
let isViewingSinglePost = false;

// Generate HTML for a single post
function generatePostHTML(post) {
    const tagsHTML = post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
        }
 return `
        <div class="post ${post.tags.join(' ')}">
            <div class="post-title-row">
                <a href="#" onclick="loadPost('${post.filename}'); return false;">${post.title}</a>
            </div>
            <p>${post.excerpt}</p>
            <div class="post-meta">
                <em>${post.date}</em>
                <div class="post-tags">${tagsHTML}</div>
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