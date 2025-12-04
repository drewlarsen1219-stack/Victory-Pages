import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, setLogLevel, doc, getDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- MANDATORY GLOBAL VARIABLES ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- FIREBASE INITIALIZATION ---
setLogLevel('Debug');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let userId = null;
let unsubscribePosts = null; // Variable to hold the unsubscribe function for the listener

const postsList = document.getElementById('posts-list');
const postsMessages = document.getElementById('posts-messages');
const forumControls = document.getElementById('forum-controls');
const actionControls = document.getElementById('action-controls');

// Make readPost globally accessible for inline onclick events
window.readPost = readPost;

/**
 * Authenticates the user using the provided custom token or anonymously.
 */
async function handleAuthentication() {
    try {
        await setPersistence(auth, browserSessionPersistence);
        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth);
        }
    } catch (error) {
        console.error("Firebase authentication failed:", error);
        postsMessages.textContent = `Error: Authentication failed (${error.code}). Cannot fetch posts.`;
    }
}

/**
 * Renders the list of forum posts to the DOM.
 * @param {Array<Object>} posts - The list of post objects from Firestore.
 */
function renderPosts(posts) {
    // Show list controls
    forumControls.classList.remove('hidden');
    actionControls.classList.remove('hidden');
    
    postsList.innerHTML = '';
    if (posts.length === 0) {
        postsList.innerHTML = '<p class="text-center text-gray-600 p-4">No posts found. Be the first to post!</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-item';
        
        // Format timestamp if available
        const date = post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleString() : 'Just now';

        // Sanitize content for display and determine if "Read More" is needed
        const contentPreviewLimit = 150; // Increased limit for better preview
        const needsReadMore = post.content && post.content.length > contentPreviewLimit;
        const contentPreview = post.content 
            ? post.content.substring(0, contentPreviewLimit) + (needsReadMore ? '...' : '') 
            : 'No content preview.';
        
        // Generate the button HTML with the globally accessible readPost function
        const readMoreButtonHtml = needsReadMore 
            ? `<button class="text-xs text-blue-700 classic-3d-button mt-2" onclick="readPost('${post.id}')">Read More</button>` 
            : '';

        postElement.innerHTML = `
            <div class="post-header">${post.title || 'Untitled Post'}</div>
            <p>${contentPreview}</p>
            <div class="post-meta">
                Author: ${post.authorId.substring(0, 8)}... | Tag: ${post.tag || 'General'} | Date: ${date}
            </div>
            ${readMoreButtonHtml}
        `;
        postsList.appendChild(postElement);
    });
}

/**
 * Fetches and renders a single post. This replaces the posts list view.
 * @param {string} postId - The ID of the post to read.
 */
async function readPost(postId) {
    // Stop the real-time listener when viewing a single post
    if (unsubscribePosts) {
        unsubscribePosts();
        unsubscribePosts = null;
    }

    // Hide list controls
    forumControls.classList.add('hidden');
    actionControls.classList.add('hidden');
    
    postsMessages.textContent = 'Loading post...';
    postsList.innerHTML = '<p class="text-center p-4">Loading full article...</p>';

    const postDocPath = `artifacts/${appId}/public/data/posts/${postId}`;
    const postRef = doc(db, postDocPath);

    try {
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const post = { id: postSnap.id, ...postSnap.data() };
            renderSinglePost(post);
        } else {
            postsList.innerHTML = '<p class="text-center text-red-700 p-4">Post not found.</p>';
            postsMessages.textContent = '';
        }
    } catch (error) {
        console.error("Error reading single post:", error);
        postsMessages.textContent = `Error reading post: ${error.message}`;
    }
}

/**
 * Renders a single post in detail.
 * @param {Object} post - The post object.
 */
function renderSinglePost(post) {
    postsMessages.textContent = ''; 
    postsList.classList.remove('h-96', 'overflow-y-auto'); // Allow full post height

    // Format timestamp
    const date = post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleString() : 'Just now';
    
    // Render the detailed view
    postsList.innerHTML = `
        <button id="backToPagesBtn" class="btn-class3 mb-4">&lt; Back to Pages</button>
        <div class="post-detail-container p-3 min-h-[300px]">
            <h2 class="text-xl font-bold mb-2">${post.title || 'Untitled Post'}</h2>
            <div class="post-meta mb-4 text-sm">
                Author: ${post.authorId.substring(0, 8)}... | Tag: ${post.tag || 'General'} | Date: ${date}
            </div>
            <hr class="border-t border-gray-300 my-4">
            <!-- Use white-space: pre-wrap to preserve original formatting like line breaks -->
            <p class="whitespace-pre-wrap text-black">${post.content || 'No content.'}</p>
        </div>
    `;

    // Attach event listener to the back button
    document.getElementById('backToPagesBtn').addEventListener('click', () => {
        postsList.classList.add('h-96', 'overflow-y-auto'); // Restore scroll height
        setupPostsListener(); // Re-run the listener to display the post list
    });
}

/**
 * Sets up a real-time listener for posts in the public collection.
 */
function setupPostsListener() {
    if (!userId) {
        postsMessages.textContent = 'Error: User ID not available for fetching data.';
        return;
    }

    // Public collection path: /artifacts/{appId}/public/data/posts
    const postsCollectionPath = `artifacts/${appId}/public/data/posts`;
    const postsCollectionRef = collection(db, postsCollectionPath);

    // Fetch the posts.
    const q = postsCollectionRef;

    // Use onSnapshot for real-time updates
    unsubscribePosts = onSnapshot(q, (snapshot) => {
        try {
            const fetchedPosts = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                fetchedPosts.push({ id: doc.id, ...data });
            });

            // Client-side sorting by a timestamp field (descending: most recent first)
            const sortedPosts = fetchedPosts.sort((a, b) => {
                const timeA = a.timestamp?.seconds || 0;
                const timeB = b.timestamp?.seconds || 0;
                return timeB - timeA;
            });
            
            // Only display the first 5 posts for the main list view
            const displayedPosts = sortedPosts.slice(0, 5);

            renderPosts(displayedPosts);
            postsMessages.textContent = ''; // Clear messages on success

            // --- Mock Data Generation (For First Run Only) ---
            if (sortedPosts.length === 0) {
                 addMockPosts(postsCollectionRef);
            }
            
        } catch (error) {
            console.error("Error fetching or processing posts:", error);
            postsMessages.textContent = `Error loading posts: ${error.message}`;
        }
    }, (error) => {
         console.error("Firestore listen failed:", error);
         postsMessages.textContent = `Real-time post feed failed: ${error.message}`;
    });
}

/**
 * Adds mock data to the posts collection if it is empty.
 * @param {CollectionReference} postsCollectionRef - Reference to the Firestore collection.
 */
async function addMockPosts(postsCollectionRef) {
    console.log("Adding mock posts to empty collection...");
    
    const mockPosts = [
        {
            title: "Welcome to Victory Pages!",
            content: "This is a mock post. The retro UI looks great! Use the 'Create Post' button below to add your own public page to the forum. This post is purposefully long so you can test the 'Read More' functionality. This means adding a few more lines of text here to exceed the 150 character limit set for the preview. Testing, testing, 1, 2, 3. We can write a whole paragraph about the importance of fellowship in the Christian walk, citing scripture like Hebrews 10:24-25, which encourages believers to spur one another toward love and good deeds and not to neglect meeting together, as is the habit of some.",
            authorId: "AdminUser",
            tag: "General",
            timestamp: new Date()
        },
        {
            title: "Question about the Finder Path",
            content: "I'm a new user and I'm a bit confused about the Finder Path structure. Can anyone share their experience or a quick guide on what the 'Ways' are supposed to lead to? I am currently trying to figure out how to track my progress in my spiritual disciplines. Is there a built-in feature for daily Bible reading and prayer tracking, or do I need to input that information manually? Any tips for maximizing the Pathfinder tool would be greatly appreciated!",
            authorId: "NewbieVic",
            tag: "faith",
            timestamp: new Date(Date.now() - 3600000) // 1 hour ago
        },
        {
            title: "Investing for Christians: Seeking Wisdom",
            content: "Are there any good Christian-focused books or resources on ethical investing? Trying to align my financial path with my faith path. Any advice appreciated! Short and sweet, this post should not trigger 'Read More'.",
            authorId: "FinancePro",
            tag: "investing",
            timestamp: new Date(Date.now() - 7200000) // 2 hours ago
        }
    ];

    for (const post of mockPosts) {
        try {
            await addDoc(postsCollectionRef, post);
        } catch (e) {
            console.error("Error adding mock document: ", e);
        }
    }
}

// --- MAIN EXECUTION ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        userId = user.uid;
        console.log("User authenticated:", userId);
        postsMessages.textContent = 'Authenticated. Fetching public posts...';
        // Start the post listener only after auth is confirmed
        setupPostsListener();
    } else {
        // User is signed out or initial state check failed
        userId = null;
        postsList.innerHTML = '';
        // If running in the canvas environment, try to authenticate first.
        handleAuthentication();
    }
});