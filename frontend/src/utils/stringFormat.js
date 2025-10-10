export const emailHidden = (email) => {
    if (!email) return;
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) return email;

    const visible = localPart.slice(0, 2);
    const hidden = "*".repeat(localPart.length - 2);
    return `${visible}${hidden}@${domain}`;
};

export const userImageUrlFormat = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) {
        return url;
    }
    return `${process.env.REACT_APP_API_URL}${url}`;
};