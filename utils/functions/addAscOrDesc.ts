export function addAscOrDesc(val: string, paramValue: string) {
  let sortBy;
  const [name, direction] = paramValue.split("-");
  if (name === val && direction === "desc") {
    sortBy = val.concat("-asc");
  } else {
    sortBy = val.concat("-desc");
  }
  return sortBy;
}
