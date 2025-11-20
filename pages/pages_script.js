   <script>
        // Note: Firestore setup variables are available globally in the Canvas environment
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;

        // Since this uses a mock array (POSTS) and not Firestore, we don't need the Firebase imports/setup.
        // If you decide to connect this to a database later, you will need to add those imports and initialization logic.
        
        const POSTS = [
            { title: "Investing and documenting what worked", url: "Investing.html", tag: "investing", username: "Drew", date: "2025-11-11" },
            { title: 'Game "Yu-Gi-Oh"', url: "Post1.html", tag: "gaming", username: "Drew", date: "2025-09-26" },
            { title: "Movie ratings & reviews", url: "mr.html", tag: "movies", username: "Drew", date: "2025-10-21" },
            { title: "Powerful acts of forgiveness", url: "paof.html", tag: "faith", username: "Drew", date: "2025-09-26" },
            { title: 'A good band called "Sweet Trip"', url: "music.html", tag: "music", username: "Drew", date: "2025-09-26" },
            { title: "My life", url: "ml.html", tag: "life", username: "Username example", date: "2025-09-26" },
            { title: "My cripes with Oldlutheran.com", url: "mcwol.html", tag: "opinion", username: "Drew", date: "2025-09-26" },
            { title: "Guy from my home town", url: "GFMH.html", tag: "life", username: "Drew", date: "2025-09-27" },
            { title: "ChatGPT is wasting water (allegedly)", url: "cww.html", tag: "opinion", username: "Drew", date: "2025-09-28" },
            { title: "How to build a text based website like mine", url: "htbw.html", tag: "programing", username: "Drew", date: "2025-10-01" }
        ];
        const POSTS_PER_PAGE = 15; 
        let currentPage = 1;
        let filteredPosts = POSTS.slice();
        let totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

        function renderPosts() {
            const postsElem = document.getElementById("posts");
            postsElem.innerHTML = "";
            const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
            const endIndex = Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length);
            for (let i = startIndex; i < endIndex; i++) {
                const post = filteredPosts[i];
                const postDiv = document.createElement("div");
                postDiv.className = "post";
                const row = document.createElement("div");
                row.className = "post-title-row";
                row.innerHTML =
                    `<a href="${post.url}">${post.title}</a> <em> ${post.username}_${formatDate(post.date)}</em>`;
                postDiv.appendChild(row);
                postsElem.appendChild(postDiv);
            }
        }
        function formatDate(dateStr) {
            const d = new Date(dateStr);
            if (!isNaN(d)) {
                return `${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}`;
            }
            return dateStr;
        }
        function calculateTotalPages() {
            totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
            updatePaginationControls();
        }
        function updatePaginationControls() {
            const prevBtn = document.getElementById('prevPage');
            const nextBtn = document.getElementById('nextPage');
            
            const disableNext = currentPage === totalPages || filteredPosts.length === 0;
            const disablePrev = currentPage === 1;

            prevBtn.disabled = disablePrev;
            nextBtn.disabled = disableNext;
            
            prevBtn.classList.toggle('disabled', disablePrev);
            nextBtn.classList.toggle('disabled', disableNext);

            const controls = document.querySelector('.pagination-controls');
            if (controls) {
                controls.style.display = totalPages > 1 ? 'flex' : 'none';
            }
        }
        function changePage(delta) {
            const newPage = currentPage + delta;
            if (newPage >= 1 && newPage <= totalPages) {
                currentPage = newPage;
                renderPosts();
                updatePaginationControls();
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
        function filterPostsByTag(tag) {
            if (tag === "all") {
                filteredPosts = POSTS.slice();
            } else {
                filteredPosts = POSTS.filter(post => post.tag === tag);
            }
            currentPage = 1;
            calculateTotalPages();
            renderPosts();
        }
        document.getElementById("tagDropdown").addEventListener("change", function() {
            filterPostsByTag(this.value);
        });
        document.getElementById("prevPage").addEventListener("click", () => changePage(-1));
        document.getElementById("nextPage").addEventListener("click", () => changePage(1));
        document.addEventListener("DOMContentLoaded", () => {
            filterPostsByTag("all");
        });
    </script>