let count = 0;
function createTree(arr, parentId="") {
    const tree = [];
    for (const item of arr) {
        if(item.parentId == parentId) {
            count++;
            item.count = count;
            const children = createTree(arr, item.id);
            if(children.length > 0) {
                item.children = children;
            }
            tree.push(item);
        }
      }
    return tree;
}

module.exports = function tree(arr, parentId="") {
    count = 0;
    return createTree(arr, parentId);
}