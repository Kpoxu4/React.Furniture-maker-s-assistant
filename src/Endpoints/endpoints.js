const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const loginUrl = `${baseUrl}/AuthUser/Login`;
export const registrationUrl = `${baseUrl}/AuthUser/Registration`;
export const checkToking = `${baseUrl}/AuthUser/CheckTokenValidity`;
export const createOrder = `${baseUrl}/Order/createOrder`;

