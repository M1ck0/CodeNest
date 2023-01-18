import timSort from "timsort";

let sortedItems = {};

function sortItemsIterative(items) {
  if (sortedItems[items]) {
    return sortedItems[items];
  }
  const stack = [...items];
  const result = [];
  while (stack.length > 0) {
    const item = stack.pop();
    if (item.children) {
      timSort.sort(item.children, (a, b) => {
        if (a.name.startsWith(".")) {
          if (!b.name.startsWith(".")) {
            if (!a.children && b.children) return 1;
            return -1;
          }
        } else if (b.name.startsWith(".")) {
          if (!a.children && b.children) return -1;
          return 1;
        }
        if (a.children && !b.children) return -1;
        if (!a.children && b.children) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      stack.push(...item.children);
    } else {
      result.push(item);
    }
  }

  return result;
}

self.onmessage = (e) => {
  const items = e.data;
  console.log("DATA: ", e.data);

  const sortedItems = sortItemsIterative(items);
  self.postMessage(sortedItems);
};
