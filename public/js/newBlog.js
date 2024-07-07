const newBlogPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;

    if(title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newBlogPostHandler);