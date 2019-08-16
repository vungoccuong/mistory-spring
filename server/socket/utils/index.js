function _getJsonData(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return false;
	}
}
module.exports.getJsonData = _getJsonData;
