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

export const formatPayDate = (dateStr) => {
  if (!dateStr) return "";
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = dateStr.substring(8, 10);
  const minute = dateStr.substring(10, 12);
  const second = dateStr.substring(12, 14);
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

export const getOrderStatus = (status) => {
  switch (status) {
    case "PENDING":
      return "Chờ thanh toán";
    case "PAID":
      return "Đã thanh toán";
    case "FAILED":
      return "Đã hủy";
    default:
      return "";
  }
};
