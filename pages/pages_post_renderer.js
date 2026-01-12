// pages/pages_post_renderer.js
const POSTS_DATA = [
    { id: 1, title: "Welcome to Victory Pages!", tag: "life", author: "AdminUser", date: "2025-12-01", content: "This is the first post on the new forum. The retro UI looks great! Use the 'Create Post' button below to add your own public page to the forum. This post is purposefully long so you can test the 'Read More' functionality. Testing, testing, 1, 2, 3. We can write a whole paragraph about the importance of fellowship in the Christian walk, citing scripture like Hebrews 10:24-25." },
    { id: 2, title: "Question about the Finder Path", tag: "faith", author: "NewbieVic", date: "2025-12-05", content: "I'm a new user and I'm a bit confused about the Finder Path structure. Can anyone share their experience or a quick guide on what the 'Ways' are supposed to lead to? I am currently trying to figure out how to track my progress in my spiritual disciplines." },
    { id: 3, title: "Investing for Christians", tag: "investing", author: "FinancePro", date: "2025-12-10", content: "Are there any good Christian-focused books or resources on ethical investing? Trying to align my financial path with my faith path. Any advice appreciated!" }
];

const el = (id) => document.getElementById(id);
const postsList = el('posts-list'), postsMessages = el('posts-messages'), tagDropdown = el('tagDropdown');
const prevPageBtn = el('prevPage'), nextPageBtn = el('nextPage');

const POSTS_PER_PAGE = 3;
let currentPage = 1, currentPosts = [];

window.readPost = (id) => {
    const post = POSTS_DATA.find(p => p.id === id);
    if (!post) return postsList.innerHTML = '<p class="text-center text-red-700 p-4">Post not found.</p>';
    
    postsMessages.textContent = '';
    postsList.classList.remove('h-96', 'overflow-y-auto');
    postsList.innerHTML = `
        <br><button id="backToPagesBtn" class="btn-class3 mb-4">&lt; Back</button><br>
        <div class="post-detail-container p-3 min-h-[300px]">
            <h2 class="text-xl font-bold">${post.title}</h2>
            <div class="post-meta mb-4 text-sm">Author: ${post.author} | Tag: ${post.tag} | Date: ${post.date}</div>
            <hr class="my-4"><p class="whitespace-pre-wrap text-black">${post.content}</p>
        </div>`;
    el('backToPagesBtn').onclick = filterAndSortPosts;
};

function renderPostList() {
    postsMessages.textContent = '';
    postsList.classList.add('h-96', 'overflow-y-auto');
    const totalPages = Math.ceil(currentPosts.length / POSTS_PER_PAGE);
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const toDisplay = currentPosts.slice(start, start + POSTS_PER_PAGE);

    postsList.innerHTML = toDisplay.length ? '' : `<p class="text-center p-4">No posts found for: ${tagDropdown.value}</p>`;
    
    toDisplay.forEach(p => {
        const needsMore = p.content.length > 300;
        const div = document.createElement('div');
        
        // ADDED: Applied 'retro-inset-panel' and 'mb-4' for spacing
        div.className = 'post-item retro-inset-panel mb-4'; 
        
        div.innerHTML = `
            <div class="post-header" style="border-bottom: 1px dashed #A0A0A0; margin-bottom: 8px;">
                ${p.title}
            </div>
            <p class="text-sm">${p.content.substring(0, 300)}${needsMore ? '...' : ''}</p>
            <div class="post-meta" style="font-size: 0.75rem; color: #555; margin-top: 8px;">
                Author: ${p.author} | Tag: ${p.tag} | Date: ${p.date}
            </div>
            ${needsMore ? `<button class="classic-3d-button mt-2" onclick="readPost(${p.id})">Read More</button>` : ''}`;
        postsList.appendChild(div);
    });

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= totalPages || totalPages === 0;
}

function filterAndSortPosts() {
    const tag = tagDropdown.value;
    currentPosts = POSTS_DATA.filter(p => tag === 'Most recent' || p.tag.toLowerCase() === tag.toLowerCase())
                              .sort((a, b) => new Date(b.date) - new Date(a.date));
    currentPage = 1;
    renderPostList();
}

// Global exposure for external scripts
window.filterAndSortPosts = filterAndSortPosts;

// Listeners
tagDropdown.onchange = filterAndSortPosts;
prevPageBtn.onclick = () => { if (currentPage > 1) { currentPage--; renderPostList(); }};
nextPageBtn.onclick = () => { if (currentPage < Math.ceil(currentPosts.length / POSTS_PER_PAGE)) { currentPage++; renderPostList(); }};
document.addEventListener('DOMContentLoaded', filterAndSortPosts);

// Video Logic
const destroyIframe = (vId) => {
    const c = el(`${vId}-container`);
    if (c && c.querySelector('iframe')) c.removeChild(c.querySelector('iframe'));
};

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.video-placeholder');
    links.forEach(link => {
        const vId = link.id.replace('-placeholder', '');
        const container = el(`${vId}-container`);
        if (container) container.style.display = 'none';

        link.onclick = (e) => {
            e.preventDefault();
            links.forEach(l => {
                const id = l.id.replace('-placeholder', '');
                destroyIframe(id);
                l.style.display = 'inline';
                if (el(`${id}-container`)) el(`${id}-container`).style.display = 'none';
            });
            link.style.display = 'none';
            const frame = document.createElement('iframe');
            Object.entries({ width: 560, height: 315, frameborder: 0, allowfullscreen: '', allow: 'autoplay; encrypted-media' })
                  .forEach(([k, v]) => frame.setAttribute(k, v));
            frame.src = link.getAttribute('data-video-url');
            container.appendChild(frame);
            container.style.display = 'block';
        };
    });
});