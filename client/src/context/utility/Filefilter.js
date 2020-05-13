export const Filefilter = (fileArray) => {

    const len = fileArray.length;
    if (len > 3) {
        return ("Can't upload more than 3 image");
    }
    for (let i = 0; i < len; i++) {
        const file = fileArray[i];
        if (checkFileType(file) !== true) {
            return checkFileType(file);
        }
    };
    return true;
}
// checking the extension memeType and size of file
export const checkFileType = (file) => {

    const ext = /JEPG|PNG|GIF|JPG|IMAGE/;
    const size = 100000;
    const checkTypes = ext.test(fileExtension(file.name).toUpperCase()) && ext.test(file.type.toUpperCase())
    if (!checkTypes) {
        return ("Wrong file extension");
    }
    const sizeLimit = file.size < size;
    if (!sizeLimit) {
        return ("Can't upload more the 10 mb of individual file size");
    }
    return true;

}
// checking the extension of file
export const fileExtension = (filename) => {

    const lastIndex = filename.lastIndexOf(".");
    const extname = filename.slice(lastIndex + 1);
    return extname;
};

