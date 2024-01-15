
```markdown
---
id: array
title: Array Component
sidebar_label: Array
---

## Introduction

The Array component in the Katxupa library provides additional utility functions for working with arrays.

### Installation

To use the Array component, you can include it in your project:

```bash
npm install katxupa
```

### Usage

#### listOf

Creates an immutable list from the provided elements.

```javascript
const list = listOf(1, 2, 3);
// list is [1, 2, 3]
```

#### mutableListOf

Creates a mutable list from the provided elements.

```javascript
const mutableList = mutableListOf(1, 2, 3);
// mutableList is [1, 2, 3]
```

#### emptyList

Creates an empty list.

```javascript
const empty = emptyList();
// empty is []
```

#### associateWith

Associates each element with a key-value pair based on the provided selectors.

```javascript
const elements = [
  { id: 1, value: 'a' },
  { id: 2, value: 'b' },
];
const keyValuePairs = elements.associateWith(
  (element) => element.id,
  (element) => element.value
);
// keyValuePairs is { '1': 'a', '2': 'b' }
```

#### mapIndexed

Maps each element to a new value using the provided transformation function.

```javascript
const numbers = [1, 2, 3];
const squaredNumbers = numbers.mapIndexed((num, index) => num * num + index);
// squaredNumbers is [1, 5, 11]
```

#### sortDescending

Sorts the collection in descending order.

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2];
const sortedNumbers = numbers.sortDescending();
// sortedNumbers is [9, 5, 4, 3, 2, 1, 1]
```

#### sortBy

Sorts the collection using the provided comparator function.

```javascript
const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
];
const sortedUsers = users.sortBy((a, b) => a.age - b.age);
// sortedUsers is [{ name: 'Alice', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]
```

#### plus

Concatenates the collection with another array.

```javascript
const collection = [1, 2, 3];
const otherArray = [4, 5, 6];
const result = collection.plus(otherArray);
// result is [1, 2, 3, 4, 5, 6]
```

#### minus

Removes elements from the collection that are present in another array.

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRemove = [3, 5];
const result = collection.minus(elementsToRemove);
// result is [1, 2, 4]
```

#### minusAssign

Removes elements from the collection that are present in another array (mutates the collection).

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRemove = [3, 5];
collection.minusAssign(elementsToRemove);
// collection is now [1, 2, 4]
```

#### plusAssign

Appends elements from another array to the collection (mutates the collection).

```javascript
const collection = [1, 2, 3];
const additionalElements = [4, 5, 6];
collection.plusAssign(additionalElements);
// collection is now [1, 2, 3, 4, 5, 6]
```

#### count

Returns the number of elements in the collection.

```javascript
const collection = [1, 2, 3, 4, 5];
const count = collection.count();
// count is 5
```

#### removeAll

Removes elements from the collection based on a predicate or a collection of elements.

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRemove = [3, 5];
const result = collection.removeAll(elementsToRemove);
// result is [1, 2, 4]
```

#### retainAll

Retains only the elements in the collection that are present in another array.

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRetain = [3, 5];
const result = collection.retainAll(elementsToRetain);
// result is [3, 5]
```

#### last

Returns the last element in the collection.

```javascript
const collection = [1, 2, 3];
const lastElement = collection.last();
// lastElement is 3
```

#### getOrElse

Gets the element at the specified index or provides a default value if the index is out of bounds.

```javascript
const collection = [1, 2, 3, 4, 5];
const element = collection.getOrElse(2, () => 10);
// element is 3
```

#### getOrEmpty

Gets an optional containing the element at the specified index.

```javascript
const collection = [1, 2, 3, 4, 5];
const optionalElement = collection.getOrEmpty(2);
// optionalElement contains the value Optional.of(3)
```

#### shuffle

Shuffles the elements in the collection randomly.

```javascript
const collection = [1, 2, 3, 4, 5];
collection.shuffle();
// collection is now shuffled randomly, e.g., [3, 1, 5, 2, 4]
```

## API Reference

### Methods

- [associateWith](#associateWith)
- [mapIndexed](#mapIndexed)
- [sortDescending](#sortDescending)
- [sortBy](#sortBy)
- [plus](#plus)
- [minus](#minus)
- [minusAssign](#minusAssign)
- [plusAssign](#plusAssign)
- [count](#count)
- [removeAll](#removeAll)
- [retainAll](#retainAll)
- [last](#last)
- [getOrElse](#getOrElse)
- [getOrEmpty](#getOrEmpty)
- [shuffle](#shuffle)

### associateWith

Associates each element with a key-value pair based on the provided selectors.

#### Parameters

- `keySelector: (element: T) => K` - The function to extract keys from elements.
- `valueSelector: (element: T) => V` - The function to extract values from elements.

#### Returns

A record associating keys with their corresponding values.

#### Example

```javascript
const elements = [
  { id: 1, value: 'a' },
  { id: 2, value: 'b' },
];
const keyValuePairs = elements.associateWith(
  (element) => element.id,
  (element) => element.value
);
// keyValuePairs is { '1': 'a', '2': 'b' }
```

### mapIndexed

Maps each element to a new value using the provided transformation function.

#### Parameters

- `transform: (element: T, index: number) => U` - The function to transform each element.

#### Returns

A readonly array containing the transformed elements.

#### Example

```javascript
const numbers = [1, 2, 3];
const squaredNumbers = numbers.mapIndexed((num, index) => num * num + index);
// squaredNumbers is [1, 5, 11]
```

### sortDescending

Sorts the collection in descending order.

#### Returns

A reference to the sorted array.

#### Example

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2];
numbers.sortDescending();
// numbers is now [9, 5, 4, 3, 2, 1, 1]
```

### sortBy

Sorts the collection using the provided comparator function.

#### Parameters

- `comparator: (a: T, b: T) => number` - The function to compare elements.

#### Returns

A reference to the sorted array.

#### Example

```javascript
const users = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
];
users.sortBy((a, b) => a.age - b.age);
// users is now sorted by age: [{ name: 'Alice', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]
```

### plus

Concatenates the collection with another array.

#### Parameters

- `other: T[]` - The array to concatenate with the current collection.

#### Returns

A new array containing elements from both the current collection and the provided array.

#### Example

```javascript
const collection = [1, 2, 3];
const otherArray = [4, 5, 6];
const result = collection.plus(otherArray);
// result is [1, 2, 3, 4, 5, 6]
```

### minus

Removes elements from the collection that are present in another array.

#### Parameters

- `other: T[]` - The array containing elements to be removed from the current collection.

#### Returns

A new array with elements not present in the provided array.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRemove = [3, 5];
const result = collection.minus(elementsToRemove);
// result is [1, 2, 4]
```

### minusAssign

Removes elements from the collection that are present in another array (mutates the collection).

#### Parameters

- `collection: T[]` - The array containing elements to be removed from the current collection.

#### Returns

A reference to the affected array.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRemove = [3, 5];
collection.minusAssign(elementsToRemove);
// collection is now [1, 2, 4]
```

### plusAssign

Appends elements from another array to the collection (mutates the collection).

#### Parameters

- `other: T[]` - The array containing elements to be added to the current collection.

#### Returns

A reference to the affected array.

#### Example

```javascript
const collection = [1, 2, 3];
const additionalElements = [4, 5, 6];
collection.plusAssign(additionalElements);
// collection is now [1, 2, 3, 4, 5, 6]
```

### count

Returns the number of elements in the collection.

#### Returns

The number of elements in the collection.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const count = collection.count();
// count is 5
```

### removeAll

Removes elements from the collection based on a predicate or a collection of elements.

#### Parameters

- `predicate: ((item: T) => boolean) | T[]` - The predicate function or collection of elements to remove.

#### Returns

A new array with elements removed based on the provided predicate or collection.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRemove = [3, 5];
const result = collection.removeAll(elementsToRemove);
// result is [1, 2, 4]
```

### retainAll

Retains only the elements in the collection that are present in another array.

#### Parameters

- `predicate: ((item: T) => boolean) | T[]` - The predicate function or collection of elements to retain.

#### Returns

A new array containing only the elements that satisfy the provided predicate or are present in the provided collection.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const elementsToRetain = [3, 5];
const result = collection.retainAll(elementsToRetain);
// result is [3, 5]
```

### last

Returns the last element in the collection.

#### Returns

The last element in the collection.

#### Throws

- `NoSuchElementError` - If the collection is empty.

#### Example

```javascript
const collection = [1, 2, 3];
const lastElement = collection.last();
// lastElement is 3
```

### getOrElse

Gets the element at the specified index or provides a default value if the index is out of bounds.

#### Parameters

- `index: number` - The index of the element to retrieve.
- `defaultValueProvider: () => T` - A function providing the default value.

#### Returns

The element at the specified index or the default value if the index is out of bounds.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const element = collection.getOrElse(2, () => 10);
// element is 3
```

### getOrEmpty

Gets an optional containing the element at the specified index.

#### Parameters

- `index: number` - The index of the element.

#### Returns

An optional containing the element if it exists, otherwise an empty optional.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
const optionalElement = collection.getOrEmpty(2);
// optionalElement contains the value Optional.of(3)
```

### shuffle

Shuffles the elements in the collection randomly.

#### Returns

A reference to the affected array.

#### Example

```javascript
const collection = [1, 2, 3, 4, 5];
collection.shuffle();
// collection is now shuffled randomly, e.g., [3, 1, 5, 2, 4]
