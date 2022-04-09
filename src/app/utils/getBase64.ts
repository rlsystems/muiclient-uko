const getBase64 = (file: File) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e?.target?.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

export default getBase64