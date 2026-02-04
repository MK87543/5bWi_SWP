/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function bubbleSort(arr: number[] | Int32Array): number[] | Int32Array {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        // Compare adjacent elements and swap if needed
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // If no swaps were made, the array is already sorted
        if (!swapped) {
            break;
        }
    }

    return arr;
}
