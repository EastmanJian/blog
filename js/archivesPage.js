/**
 * Initiate listjs plugin
 */
function initListSearch() {
	var options = {
		valueNames: ['time', 'title', 'categories', 'pageTag']
	};

	var userList = new List('articles', options);
}

window.addEventListener("load", initListSearch);
