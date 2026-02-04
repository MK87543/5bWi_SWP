import { selectionSort } from "./SelectionSort.ts";
import { bubbleSort } from "./BubbleSort.ts";
import { insertionSort } from "./InsertionSort.ts";
import { radixSort } from "./RadixSort.ts";

// Utility Types
type SortFunction = (arr: number[] | Int32Array) => number[] | Int32Array;

/**
 * Generates an array of random integers
 * @param n - Number of elements to generate
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 100000)
 * @returns Array of random integers
 */
function generateSampleData(
    n: number,
    min: number = 0,
    max: number = 100000,
): Int32Array | number[] {
    try {
        const data = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            data[i] = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return data;
    } catch (e) {
        console.error(`\n❌ Error allocating memory for ${n} items: ${e}`);
        return [];
    }
}

/**
 * Measures the execution time of a sorting algorithm
 * @param sortFn - Sorting function to test
 * @param data - Array to sort (will be copied to avoid mutating source for next tests)
 * @param name - Name of the sorting algorithm
 */
function measureSortPerformance(
    sortFn: SortFunction,
    data: number[] | Int32Array,
    name: string,
): void {
    try {
        let dataCopy: number[] | Int32Array;
        if (data instanceof Int32Array) {
            dataCopy = new Int32Array(data);
        } else {
            dataCopy = (data as number[]).slice();
        }

        const startTime = performance.now();
        sortFn(dataCopy);
        const endTime = performance.now();

        const timeTaken = (endTime - startTime).toFixed(4);
        console.log(`${name.padEnd(20)} | Time: ${timeTaken} ms`);
    } catch (e) {
        console.log(`${name.padEnd(20)} | Failed (Memory/Error: ${e})`);
    }
}

// ===== MAIN COMPARISON LOOP =====

async function runComparison() {
    // The requested sizes
    const SIZES = [10_000, 100_000, 1_000_000, 1_000_000_000];

    console.log("=".repeat(70));
    console.log("SORTING ALGORITHMS - MASSIVE SCALE COMPARISON");
    console.log("=".repeat(70));

    for (const size of SIZES) {
        console.log("\n" + "-".repeat(70));
        console.log(`🟦 DATASET SIZE: ${size.toLocaleString()} elements`);
        console.log("-".repeat(70));

        // 1. Generate Data
        console.log("Generating sample data...");
        const genStart = performance.now();
        const sampleData = generateSampleData(size);
        const genEnd = performance.now();

        if (sampleData.length === 0) {
            console.log(
                "⚠️  Skipping tests for this size due to generation failure.",
            );
            continue;
        }

        console.log(
            `✅ Data generated in ${(genEnd - genStart).toFixed(2)} ms`,
        );
        console.log(`Starting Sort Tests...\n`);

        // 2. Define Algorithms to Test
        const algorithms = [
            { name: "Bubble Sort", fn: bubbleSort, complexity: "O(n^2)" },
            { name: "Selection Sort", fn: selectionSort, complexity: "O(n^2)" },
            { name: "Insertion Sort", fn: insertionSort, complexity: "O(n^2)" },
            { name: "Radix Sort", fn: radixSort, complexity: "O(nk)" },
        ];

        // 3. Run Tests
        for (const algo of algorithms) {
            measureSortPerformance(algo.fn, sampleData, algo.name);
        }
    }

    console.log("\n" + "=".repeat(70));
    console.log("DONE");
}

// Start the comparison
runComparison();
