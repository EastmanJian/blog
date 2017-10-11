/**
 * Initiate listjs plugin
 */
function initListSearch() {
	var options = {
		valueNames: ['time', 'title', 'categories', 'pageTag'],
        fuzzySearch: {
            searchClass: "fuzzy-search",
            location: 0,
            distance: 9000,
            threshold: 0.1,
            multiSearch: true
        }
	};

	var userList = new List('articles', options);
}

window.addEventListener("load", initListSearch);
