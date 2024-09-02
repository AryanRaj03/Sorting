

const arrayContainer = document.getElementById('array-container');
let array = [];
function generateArray() {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        const number = document.createElement('span');
        number.className = 'bar-value';
        number.innerText = value;

        bar.appendChild(number);
        arrayContainer.appendChild(bar);
    }
}

let speed = 50; 

function updateSpeed(value) {
    speed = 201-value; 
    document.getElementById('speed-value').textContent = value;
}
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j].querySelector('.bar-value').innerText = array[j];
                bars[j + 1].querySelector('.bar-value').innerText = array[j + 1];
                bars[j].style.backgroundColor = '#F95738';
                bars[j + 1].style.backgroundColor = '#F95738';
                await new Promise((resolve) => setTimeout(resolve, speed));
                bars[j].style.backgroundColor = '#0D3B66';
                bars[j + 1].style.backgroundColor = '#0D3B66';
            }
        }
       
    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}


async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIdx].style.height = `${array[minIdx] * 3}px`;
            bars[i].querySelector('.bar-value').innerText = array[i];
            bars[minIdx].querySelector('.bar-value').innerText = array[minIdx];
            bars[i].style.backgroundColor = '#F95738';
            bars[minIdx].style.backgroundColor = '#F95738'
            await new Promise((resolve) => setTimeout(resolve, speed));
            bars[i].style.backgroundColor = '#0D3B66';
            bars[minIdx].style.backgroundColor = '#0D3B66';
        }

    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].querySelector('.bar-value').innerText = array[j+1];
            bars[j + 1].style.backgroundColor = '#F95738';
            await new Promise((resolve) => setTimeout(resolve,speed));
            bars[j + 1].style.backgroundColor = '#0D3B66';
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
        bars[j + 1].querySelector('.bar-value').innerText = array[j+1];
       
    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}



async function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }
    const m = l + Math.floor((r - l) / 2);
     await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
    if (l === 0 && r === arr.length - 1) {
        //  sorting is done
        await turnBarsGreen();
    }
    
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    const bars = document.querySelectorAll('.bar');

    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            bars[k].style.height = `${left[i] * 3}px`;
            bars[k].querySelector('.bar-value').innerText = arr[k];
            i++;
        } else {
            arr[k] = right[j];
            bars[k].style.height = `${right[j] * 3}px`;
            bars[k].querySelector('.bar-value').innerText = arr[k];
            j++;
        }
        bars[k].style.backgroundColor = '#F95738';
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[k].style.backgroundColor = '#0D3B66';
        k++;
    }

    while (i < n1) {
        arr[k] = left[i];
        bars[k].style.height = `${left[i] * 3}px`;
        bars[k].querySelector('.bar-value').innerText = arr[k];
        bars[k].style.backgroundColor = '#F95738';
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[k].style.backgroundColor = '#0D3B66';
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = right[j];
        bars[k].style.height = `${right[j] * 3}px`;
        bars[k].querySelector('.bar-value').innerText = arr[k];
        bars[k].style.backgroundColor ='#F95738';
        await new Promise((resolve) => setTimeout(resolve, speed));
        bars[k].style.backgroundColor = '#0D3B66';
        j++;
        k++;
    }
}
async function turnBarsGreen() {
    const bars = document.querySelectorAll('.bar');
    for (let bar of bars) {
        bar.style.backgroundColor = 'green';
        
    }
}
async function quickSort(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    if(low == 0 && high == arr.length-1){
        await turnBarsGreen();
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    const bars = document.querySelectorAll('.bar');
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            bars[i].style.height = `${arr[i] * 3}px`;
            bars[i].querySelector('.bar-value').innerText = arr[i];
            bars[j].style.height = `${arr[j] * 3}px`;
            bars[j].querySelector('.bar-value').innerText = arr[j];

            bars[i].style.backgroundColor = '#F95738';
            bars[j].style.backgroundColor = '#F95738';
            await new Promise((resolve) => setTimeout(resolve, speed));
            bars[i].style.backgroundColor = '#0D3B66';
            bars[j].style.backgroundColor ='#0D3B66';
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
    bars[i + 1].querySelector('.bar-value').innerText = arr[i + 1];
    bars[high].style.height = `${arr[high] * 3}px`;
    bars[high].querySelector('.bar-value').innerText = arr[high];

    bars[i + 1].style.backgroundColor = '#F95738';
    bars[high].style.backgroundColor = '#F95738';
    await new Promise((resolve) => setTimeout(resolve, speed));
    bars[i + 1].style.backgroundColor = '#0D3B66';
    bars[high].style.backgroundColor = '#0D3B66';

    return i + 1;
}



const algorithmInfo = {
    bubbleSort: {
        best: "O(n)",
        average: "O(n^2)",
        worst: "O(n^2)",
        cppCode: `
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                std::swap(arr[j], arr[j+1]);
            }
        }
    }
}`
    },
    selectionSort: {
        best: "O(n^2)",
        average: "O(n^2)",
        worst: "O(n^2)",
        cppCode: `
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        std::swap(arr[i], arr[min_idx]);
    }
}`
    },
    insertionSort: {
        best: "O(n)",
        average: "O(n^2)",
        worst: "O(n^2)",
        cppCode: `
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    },
    mergeSort: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        cppCode: `
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`
    },
    quickSort: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n^2)",
        cppCode: `
int partition (int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    }
};

function displayAlgorithmInfo(algorithm) {
    document.getElementById('best-case').textContent = algorithmInfo[algorithm].best;
    document.getElementById('average-case').textContent = algorithmInfo[algorithm].average;
    document.getElementById('worst-case').textContent = algorithmInfo[algorithm].worst;
    document.getElementById('cpp-code').textContent = algorithmInfo[algorithm].cppCode;
}

function sort() {
    const algorithm = document.getElementById('algorithm').value;
    displayAlgorithmInfo(algorithm);
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'mergeSort':
            mergeSort(array, 0, array.length - 1);
            break;
        case 'quickSort':
            quickSort(array, 0, array.length - 1);
            break;
    }
}
window.onload = generateArray;

