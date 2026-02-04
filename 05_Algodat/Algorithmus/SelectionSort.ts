/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function selectionSort(
    arr: number[] | Int32Array,
): number[] | Int32Array {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Find the minimum element in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the minimum element with the first element of the unsorted portion
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}
