class ObjectUtil {

    /**
     * 判断对象是否为空
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {

        // null、undefined
        if (value == null) {
            return true;
        }

        // String
        if (typeof value === 'string') {
            return value.trim().length === 0;
        }

        // Array
        if (Array.isArray(value)) {
            return value.length === 0;
        }

        return false;
    }

    /**
     * 判断对象是否非空
     * @param value
     * @returns {boolean}
     */
    static isNotEmpty(value) {
        return !this.isEmpty(value);
    }
}

export default ObjectUtil;