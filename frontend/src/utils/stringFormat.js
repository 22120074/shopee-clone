export const emailHidden = (email) => {
    const [localPart, domain] = email.split("@");
    if (localPart.length <= 2) return email;

    const visible = localPart.slice(0, 2);
    const hidden = "*".repeat(localPart.length - 2);
    return `${visible}${hidden}@${domain}`;
};

