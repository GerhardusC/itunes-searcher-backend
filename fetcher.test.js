//The function that fetches data from the API to be tested.
const getResults = async (searchTerm, mediaType) => {
  let searchResults = {};
  if (searchTerm && mediaType) {
    try {
      let result = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`
      );
      searchResults = await result.json();
    } catch (err) {
      console.log(err);
    } finally {
      return searchResults;
    }
  }
  if (searchTerm) {
    try {
      let result = await fetch(
        `https://itunes.apple.com/search?term=${searchTerm}`
      );
      searchResults = await result.json();
    } catch (err) {
      console.log(err);
    } finally {
      return searchResults;
    }
  }
};
//Check if an object is returned.
test("Fetched data.", () => {
  expect(typeof getResults("James blunt", "all")).toBe("object");
});
