export function transformToFormData(object: {[k: string]: any}): FormData {
  const formData = new FormData();

  function toFormData(rawObject: {[k: string]: any}): void {
    Object.entries(rawObject).forEach(([key, value]: [string, any]) => {
      formData.append(key, value);
    });
  }
  toFormData(object);

  return formData;
}
