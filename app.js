function fetchHackerNews() {
    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => response.json())
        .then(data => {
            const topStories = data.slice(0, 20);
            const storyPromises = topStories.map(storyId =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                    .then(response => response.json())
            );
            return Promise.all(storyPromises);
        });
}

function displayHackerNews() {
    const contentSection = document.querySelector('.content');
    const blogPostsContainer = document.createElement('div');
    blogPostsContainer.classList.add('blog-posts');
    contentSection.appendChild(blogPostsContainer);

    fetchHackerNews().then(stories => {
        stories.forEach(story => {
            const blogPostElement = document.createElement('div');
            blogPostElement.classList.add('blog-post');
            blogPostElement.innerHTML = `
          <h2 class="blog-title"><a href="${story.url}">Visit>> </a>${story.title}</h2>
          <p class="blog-author">  -${story.by}</p>
        `;
            blogPostsContainer.appendChild(blogPostElement);
        });
    });
}

displayHackerNews();
