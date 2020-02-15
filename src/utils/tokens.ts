export default function (token) {
  let sanitized = token.split(' ');
  return sanitized[1];
};