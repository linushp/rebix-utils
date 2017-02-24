var _immutableLib = null;

/**
 * RebixUtils 库主动依赖第三方库,只能通过外界注入.
 */
module.exports = {

    setImmutableLib: function (immutableLib) {
        _immutableLib = immutableLib;
    },

    getImmutableLib: function () {
        if (!_immutableLib) {
            throw new Error('immutableLib is not set');
        }
        return _immutableLib;
    }
};