/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function insertionSort(
    arr: number[] | Int32Array,
): number[] | Int32Array {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }

    return arr;
}
