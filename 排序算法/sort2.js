let creatArray = [10,15,67,53,23,7,16,45,98,2]
console.log(creatArray)

//冒泡排序
function bubbleSort (array) {
    let end = array.length
    for (end = end - 1; end > 0; end--) {
        for (let begin = 1; begin <= end; begin++) {
            if (array[begin - 1] > array[begin]) {
                let temp = array[begin - 1]
                array[begin - 1] = array[begin]
                array[begin] = temp
            }
        }
    }
    return array
}

//选择排序
function selectSort (array) {
    console.log("selectSort")
    let end = array.length
    for (end = end - 1; end > 0; end--) {
        let maxIndex = 0
        for (let begin = 1; begin <= end; begin++) {
            if (array[maxIndex] - array[begin] < 0) {
                maxIndex = begin
            }
        }

        let temp = array[maxIndex]
        array[maxIndex] = array[end]
        array[end] = temp
    }
    return array
}

//插入排序
function insertSort (array) {
    console.log("insertSort")
    let end = array.length
    for (let begin = 1; begin < end; begin++) {
        for (let childEnd = begin; childEnd > 0; childEnd--) {
            if (array[childEnd - 1] - array[childEnd] > 0) {
                temp = array[childEnd - 1];
                array[childEnd - 1] = array[childEnd]
                array[childEnd] = temp
            }
        }
    }
    return array
}

//快速排序
function quickSort(array) {
    console.log("quickSort")
    if (array.length < 2) return creatArray
    qSort(0,array.length)
}

function qSort(begin, end) {
    if (end - begin < 2) return
    //锚点位置
    let index = pivotIndex(begin, end)
    qSort(begin, index)
    qSort(index + 1, end)
}

function pivotIndex(begin, end) {
    end--
    //先copy第一位
    let beginCopy = creatArray[begin]
    while (begin < end) {
        //选定第一位做锚点之后，都是与第一位进行比较
        while (begin < end) {
            if (beginCopy < creatArray[end]) {
                end--
            } else {
                creatArray[begin] = creatArray[end]
                begin++
                break
            }
        }
        while (begin < end) {
            if (beginCopy > creatArray[begin]) {
                begin++
            } else {
                creatArray[end] = creatArray[begin]
                end--
                break
            }
        }
    }
    creatArray[begin] = beginCopy
    return begin
}


//归并排序
function mergeSort(array) {
    console.log("mergeSort")
    if (array.length < 2) return array
    msort(0, array.length)
}

function msort(begin,end) {
    if (end - begin < 2) return
    let mid = begin + Math.floor((end - begin) / 2)
    msort(begin, mid)
    //要包含mid
    msort(mid, end)
    merge(begin,mid,end)
}

function merge(begin, mid,end) {
    //先copy先半部分数组
    let copyBegin = []
    let i = begin
    for (let i = begin; i < mid; i++) {
        copyBegin.push(creatArray[i])
    }

    //合并前半部分和后半部分
    let li = 0 
    let lCount = mid - begin
    let ri = mid
    let ai = begin
    while (li < lCount) {
        if (copyBegin[li] - creatArray[ri] > 0 &&  ri < end) {
            creatArray[ai] = creatArray[ri]   
            ri++
        } else {
            creatArray[ai] = copyBegin[li]
            li++
        }
        ai++
    }
}

mergeSort(creatArray)
console.log(creatArray)