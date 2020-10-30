export const removeDuplicateCommas = (addresses) =>
  addresses.map((address) => address.replace(', , ,', ''));