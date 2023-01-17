import { atom, selector } from "recoil";

let sortedItems = {};

// TODO: Improve performance for bigger directories. Maybe sort subdirectories when user clicks to expand them

// TODO: When opening big directories, it doesn't always shows everything. Might be rendering issue, but probably there is an issue with sorting algorithm

function sortItemsRecursive(items, isSorted = false) {
  if (isSorted && sortedItems[items]) {
    return sortedItems[items];
  }
  items = items.sort((a, b) => {
    if (a.name.startsWith(".") && !b.name.startsWith(".")) {
      if (!a.children && b.children) return 1;
      return -1;
    }
    if (!a.name.startsWith(".") && b.name.startsWith(".")) {
      if (a.children && !b.children) return -1;
      return 1;
    }
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  sortedItems[items] = items;

  for (let i = 0; i < items?.length; i++) {
    if (items[i].children) {
      items[i].children = sortItemsRecursive(items[i].children, true);
    }
  }
  return items;
}
const directoryData = atom({
  key: "directoryData",
  default: [],
});

const directoryState = selector({
  key: "directoryState",
  get: ({ get }) => {
    return get(directoryData);
  },
  set: ({ set }, newValue) => {
    const sortedData = sortItemsRecursive(newValue);

    set(directoryData, sortedData);
  },
});

export { directoryState };
