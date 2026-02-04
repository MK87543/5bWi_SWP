/**
 * Radix Sort Algorithm
 * Time Complexity: O(d * (n + k)) where d is the number of digits
 * Space Complexity: O(n + k)
 */

function countingSortByDigit(arr: number[] | Int32Array, exp: number): void {
    const n = arr.length;
    const output = arr instanceof Int32Array ? new Int32Array(n) : new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }

    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy output array back to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

export function radixSort(arr: number[] | Int32Array): number[] | Int32Array {
    if (arr.length === 0) return arr;

    // Find the maximum number to determine number of digits
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Perform counting sort for each digit
    // exp is 10^i where i is the current digit position
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }

    return arr;
}
