export const calcRows = (data, size) =>
  data.reduce((acc, curr, i) => {
    if (!(i % size)) {
      acc.push(data.slice(i, i + size));
    }
    return acc;
  }, []);
