export const readFile = (file: File) =>
  new Promise<{ type: string; name: string; uri: string }>((resolve) =>
    resolve({
      type: file.type,
      name: file.name,
      uri: URL.createObjectURL(file),
    }),
  );
