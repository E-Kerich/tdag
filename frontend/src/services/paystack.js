import api from "./api";

export const initiatePayment = async (email, productIds) => {
  const res = await api.post("/payment/initialize", {
    email,
    productIds
  });
  window.location.href = res.data.authorization_url;
};
