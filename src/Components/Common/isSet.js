const isSet = (value) => {
    if (typeof value !== 'undefined') {
        if (Array.isArray(value)) { 
            if (value.length != 0) return true; else return false;
        } else {
            if (value != null) return true; else return false;
        }
    } else return false;
}

export { isSet }