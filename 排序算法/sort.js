let creatArray = [10,15,67,53,23,7,16,45,98,2]
console.log(creatArray)

//冒泡排序：循环一次最大值放到当前的最后
function bubbleSort (array) {
    for (let end = array.length - 1; end >= 0; end--) {
        for (let begin = 1; begin <= end; begin++) {
            if ((array[begin - 1] - array[begin]) > 0) {
                let temp = array[begin - 1]
                array[begin - 1] = array[begin]
                array[begin] = temp
            }
        }
    }
}

// bubbleSort(creatArray)
// console.log(creatArray)

//选择排序：先不进行数据交换，只记录出现最大值的位置，最后将最大值与当前最后一位进行交换，减少交换次数
function selectSort (array) {
    for (let end = array.length - 1; end >=0; end--) {
        let max = 0 //初始为0
        for (let begin = 1; begin <= end; begin++) {
            if ((array[max] - array[begin]) < 0) {
                max = begin
            }
        }
        let temp = array[max]
        array[max] = array[end]
        array[end] = temp
    }
}

// selectSort(creatArray)
// console.log(creatArray)

//插入排序：前面是顺序，后面是乱序，拿起乱序的第一个插入到前面顺序中
function insertSort (array) {
    let end = array.length
    for (let begin = 1; begin < end; begin++) {
        let childBegin  = begin
        while (childBegin > 0) {
            if((array[childBegin - 1] - array[childBegin]) > 0) {
                let  temp = array[childBegin]
                array[childBegin] = array[childBegin - 1]
                array[childBegin - 1] = temp
            }
            childBegin--
        }
    }
}

// insertSort(creatArray)
// console.log(creatArray)

//二分查找：顺序数值中查找 主要解决插入排序中，需要遍历交换的问题
let searchArray = [2, 7, 10, 15, 16, 23, 30,45, 53, 67, 98]
function binarySearch(sortArray,target) {
    //左闭右开
    let beigin = 0
    let end = sortArray.length
    while (beigin < end) {
        let mid = beigin + Math.floor((end - beigin) / 2)
        if (sortArray[mid] - target > 0) {
            end = mid
        } else if (sortArray[mid] - target < 0) {
            beigin = mid + 1
        } else {
            return mid
        }
    }

    if (sortArray[beigin] === target) {
        return beigin
    } else {
        return null
    }
}
// console.log(binarySearch(searchArray, 10))

//归并排序：一直把数组分拆成一半，直到成为单独的一个一个，再按顺序合并单独的数组，最后就是有序数组
function mergeSort(array) {
    if(array.length < 2) return array
    msort(0,array.length)
}

function msort(begin,end) {
    if (end - begin < 2) return
    let mid = begin + Math.floor((end - begin) / 2)
    msort(begin, mid)
    msort(mid, end)
    merge(begin,mid,end)
}

//合并数组时，取一半的数据创建一个新的数组，是因为要在原数组上进行合并，不备份数据将被覆盖
function merge(begin,mid,end) {
    let li = 0, lcount = mid - begin
    let ri = mid
    let ai = begin
    
    //备份左边数组
    let leftArray = []
    for (let i = 0; i < lcount; i++) {
        //creatArray为最外面的大数组
        leftArray.push(creatArray[begin + i])
    }
    //左边没有结束，就继续比对
    while (li < lcount) {
        if ((leftArray[li] - creatArray[ri] > 0) && ri < end) {
            creatArray[ai] = creatArray[ri]
            ri++
        } else {
            creatArray[ai] = leftArray[li]
            li++
        }
        ai++
    }
}

// mergeSort(creatArray)
// console.log(creatArray)

//快速排序：备份数组第一个值，以第一个值为锚点，小于它的在左边，大于它的在右边，这样就变成了两个数组，重复前面的动作
// [begin end)
function quickSort(array) {
    if(array.length < 2) return array
    qsort(0, array.length)
}

function qsort(begin, end) {
    if (end - begin < 2) return //退出条件
    let mid = pivotIndex(begin, end)
    qsort(begin, mid)
    qsort(mid + 1, end)
}

function pivotIndex(begin, end) {
    end--
    let copyFirst = creatArray[begin]
    while (begin < end) {
        while (begin < end) {
            //从右往左扫描
            if (copyFirst - creatArray[end] < 0) {
                end--
            } else {
                //右边小于锚点元素
                creatArray[begin] = creatArray[end]
                begin++ //begin++之后需要改变扫描方向，从左往右扫描
                break
            }
        }
        
        while (begin < end) {
            //从左往右扫描
            if (copyFirst - creatArray[begin] > 0) {
                begin++
            } else {
                creatArray[end] = creatArray[begin]
                end-- //end--之后需要改变扫描方向，从左往右扫描
                break
            }
        }
    }
    //将锚点元素放到最终的位置
    creatArray[begin] = copyFirst;
    return begin
}

quickSort(creatArray)
console.log(creatArray)