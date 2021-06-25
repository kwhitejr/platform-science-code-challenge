/**
 * PriorityQueue
 * A queue data structure where each element additionally has a priority associated with it.
 * In a priority queue, an element with high priority is served before an element with low priority.
 * In this implementation, elements with the same priority are served according to the order in
 * which they were enqueued.
 *
 * The queue is sorted after any new element is added.
 */
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    this.values.push({ value, priority }); // add new element to end of array
    this.sort(); // sort array
  }

  dequeue() {
    return this.values.shift(); // remove first element in the array
  }

  sort() {
    this.values.sort((a, b) => b.priority - a.priority); // sort in descending priority (low to high)
  }
}

module.exports = PriorityQueue;