let contentPromise;

export function loadContent() {
  if (!contentPromise) {
    const contentUrl = `${import.meta.env.BASE_URL}content.json`;
    contentPromise = fetch(contentUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load site content (${response.status})`);
      }
      return response.json();
    });
  }

  return contentPromise;
}
