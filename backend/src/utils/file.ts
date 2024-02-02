export const getExternalFileUrl = (request, filename) => {
  const protocol = request.protocol;
  return `${protocol}://${request.headers.host}/file/${filename}`;
};
