export const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ? email : 'Invalud email' ;
export const isPassword = (password) => password && /^.{6,}$/.test(password) ? password : 'Invalid password';
export const isName = (value) => (value ? null : 'Invalid name');
export const isDescription = (value) => (value ? null : 'Invalid description');
export const isPrice = (value) => (value && value > 0 ? null : 'Invalid price');
export const isStock = (value) => (value && value > 0 ? null : 'Invalid stock number');
export const isImage = (value) => (value ? null : 'Please provide an image');
export const isCollection = (value) => (value && value > 0 ? null : 'Please choose a collection');
