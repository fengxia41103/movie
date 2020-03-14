export const randomId = (prefix = "FX") => {
  return prefix + (Math.random() * 1e32).toString(12);
};

export const randomColorGenerator = () => {
  return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
};

export const dictHasNoValues = (dict)=>{
  // checking whether all dict values are empty:
  // null, [], undefined, ""
  return Object.values(dict).reduce((total, current)=>{
    // `curent || ""` to take are of undefined
    return total && !!!(current || "");
  }, true);
}
