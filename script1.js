function sort() {
    var numbersInput = document.getElementById('numbers').value.trim();
    var algorithm = document.getElementById('algorithm').value;
    
    var numbersArray = numbersInput.split(',').map(function(item) {
        return parseFloat(item.trim(), 10);
    });
    
    var sortedArray;
    var startTime, endTime;
    
    switch(algorithm) {
        case 'bubble':
            startTime = performance.now();
            sortedArray = bubbleSort(numbersArray);
            endTime = performance.now();
            break;
        case 'selection':
            startTime = performance.now();
            sortedArray = selectionSort(numbersArray);
            endTime = performance.now();
            break;
        case 'insertion':
            startTime = performance.now();
            sortedArray = insertionSort(numbersArray);
            endTime = performance.now();
            break;
        case 'heap':
            startTime = performance.now();
            sortedArray = heapSort(numbersArray);
            endTime = performance.now();
            break;
        case 'merge':
            startTime = performance.now();
            sortedArray = mergeSort(numbersArray);
            endTime = performance.now();
            break;
        case 'quick':
            startTime = performance.now();
            sortedArray = quickSort(numbersArray);
            endTime = performance.now();
            break;
        case 'counting':
            startTime = performance.now();
            sortedArray = countingSort(numbersArray);
            endTime = performance.now();
            break;
        case 'radix':
            startTime = performance.now();
            sortedArray = radixSort(numbersArray);
            endTime = performance.now();
        case 'bucket':
            startTime = performance.now();
            sortedArray = bucketSort(numbersArray);
            endTime = performance.now();
        default:
            break;
    }
    
    // var outputTextArea = document.getElementById('output');
    // outputTextArea.value = sortedArray.join(', ') + '\n\nTime Complexity: ' + (endTime - startTime) + ' milliseconds';
    var outputTextArea = document.getElementById('output');
if (Array.isArray(sortedArray)) {
    outputTextArea.value = sortedArray.join(', ') + '\n\nTime Complexity: ' + (endTime - startTime) + ' milliseconds';
} else {
    outputTextArea.value = sortedArray + '\n\nTime Complexity: N/A';
}

}

function bubbleSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n-1; i++) {
        for (var j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // swap arr[j] and arr[j+1]
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n-1; i++) {
        var minIndex = i;
        for (var j = i+1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // swap arr[minIndex] and arr[i]
        var temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function insertionSort(arr) {
    var n = arr.length;
    for (var i = 1; i < n; i++) {
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j = j - 1;
        }
        arr[j+1] = key;
    }
    return arr;
}

function heapSort(arr) {
    function heapify(arr, n, i) {
        var largest = i;
        var l = 2 * i + 1;
        var r = 2 * i + 2;
    
        if (l < n && arr[l] > arr[largest]) {
            largest = l;
        }
    
        if (r < n && arr[r] > arr[largest]) {
            largest = r;
        }
    
        if (largest !== i) {
            var temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
    
            heapify(arr, n, largest);
        }
    }
    
    var n = arr.length;
    
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    for (var i = n - 1; i >= 0; i--) {
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
    
        heapify(arr, i, 0);
    }
    
    return arr;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    var middle = Math.floor(arr.length / 2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    var leftIndex = 0;
    var rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    var pivot = arr[Math.floor(arr.length / 2)];
    var left = [];
    var right = [];
    
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        }
    }
    
    return quickSort(left).concat([pivot]).concat(quickSort(right));
}
function countingSort(arr) {
    // Check if the array is empty
    if (arr.length === 0) {
        return arr;
    }

    // Check if the array contains fractional numbers
    for (var i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i])) {
            return "Counting Sort is only for integers. Fractional numbers are not supported.";
        }
    }

    // Check if the array contains negative numbers
    var containsNegative = false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            containsNegative = true;
            break;
        }
    }

    if (containsNegative) {
        return countingSortForNegative(arr);
    } else {
        return countingSortForNonNegative(arr);
    }
}

function countingSortForNonNegative(arr) {
    // Find the maximum value in the array
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Create an array to store the count of each element
    var countArray = new Array(max + 1).fill(0);

    // Count the occurrences of each element
    for (var i = 0; i < arr.length; i++) {
        countArray[arr[i]]++;
    }

    // Build the sorted array
    var sortedArray = [];
    for (var i = 0; i < countArray.length; i++) {
        while (countArray[i] > 0) {
            sortedArray.push(i);
            countArray[i]--;
        }
    }

    return sortedArray;
}

function countingSortForNegative(arr) {
    // Find the maximum and minimum values in the array
    var max = Math.max(...arr);
    var min = Math.min(...arr);

    // Create an array to store the count of each element
    var countArray = new Array(max - min + 1).fill(0);

    // Count the occurrences of each element
    for (var i = 0; i < arr.length; i++) {
        countArray[arr[i] - min]++;
    }

    // Build the sorted array
    var sortedArray = [];
    for (var i = 0; i < countArray.length; i++) {
        while (countArray[i] > 0) {
            sortedArray.push(i + min);
            countArray[i]--;
        }
    }

    return sortedArray;
}
function radixSort(arr) {
    // Check if the array is empty
    if (arr.length === 0) {
        return arr;
    }

    // Check if the array contains only non-negative integers
    for (var i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            return "Radix Sort is only for non-negative integers.";
        }
    }

    // Find the maximum value in the array
    var max = Math.max(...arr);

    // Perform counting sort for each digit
    for (var exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        arr = countingSortByDigit(arr, exp);
    }

    return arr;
}

function countingSortByDigit(arr, exp) {
    var countArray = new Array(10).fill(0);
    var outputArray = new Array(arr.length);

    // Count the occurrences of each digit
    for (var i = 0; i < arr.length; i++) {
        var digit = Math.floor(arr[i] / exp) % 10;
        countArray[digit]++;
    }

    // Modify the count array to store the cumulative count of each digit
    for (var i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Build the output array using the count array
    for (var i = arr.length - 1; i >= 0; i--) {
        var digit = Math.floor(arr[i] / exp) % 10;
        outputArray[countArray[digit] - 1] = arr[i];
        countArray[digit]--;
    }

    // Copy the sorted elements back into the original array
    for (var i = 0; i < arr.length; i++) {
        arr[i] = outputArray[i];
    }

    return arr;
}
function bucketSort(arr, bucketSize = 5) {
    // Check if the array is empty
    if (arr.length === 0) {
        return arr;
    }

    // Check if the array contains only non-negative numbers
    for (var i = 0; i < arr.length; i++) {
        if (!Number.isFinite(arr[i]) || arr[i] < 0) {
            return "Bucket Sort is only for non-negative finite numbers.";
        }
    }

    // Find the maximum and minimum values in the array
    var max = Math.max(...arr);
    var min = Math.min(...arr);

    // Calculate the number of buckets needed
    var numBuckets = Math.floor((max - min) / bucketSize) + 1;
    
    // Initialize buckets
    var buckets = new Array(numBuckets);
    for (var i = 0; i < numBuckets; i++) {
        buckets[i] = [];
    }

    // Distribute elements into buckets
    for (var i = 0; i < arr.length; i++) {
        var bucketIndex = Math.floor((arr[i] - min) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
    }

    // Sort each bucket using another sorting algorithm (e.g., insertion sort)
    for (var i = 0; i < buckets.length; i++) {
        buckets[i] = insertionSort(buckets[i]);
    }

    // Concatenate sorted buckets
    var sortedArray = [].concat(...buckets);

    return sortedArray;
}



