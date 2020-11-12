import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BarProps = {
  height: number;
  width: number;
  index: number;
};

function App() {
  useEffect(() => {});

  const [sortType, setSortType] = useState("None");
  const [num, setNum] = useState(25);
  let renders = 0;

  let renderArray: BarProps[] = [];
  let tempArray: BarProps[] = [];

  for (let index = 0; index < num; index++) {
    let height = Math.floor(Math.random() * 80) + 1;
    let width = num / 12;
    let bar = {
      height: height,
      width: width,
      index: index,
    };
    tempArray.push(bar);
  }

  let partition = (array: BarProps[], left: number, right: number) => {
    const pivot = array[Math.floor((right + left) / 2)].height;
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i].height < pivot) {
        i++;
      }

      while (array[j].height > pivot) {
        j--;
      }

      if (i <= j) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        j--;
      }
    }

    return i;
  };

  let quickSort = useCallback(
    (array: BarProps[], left: number, right: number) => {
      let index;

      if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
          quickSort(array, left, index - 1);
        }

        if (index < right) {
          quickSort(array, index, right);
        }
        renders++;
      }

      return array;
    },
    [renders]
  );

  let bubbleSort = (inputArr: BarProps[]) => {
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (inputArr[j].height > inputArr[j + 1].height) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
          renders++;
        }
      }
    }
    return inputArr;
  };

  let insertionSort = (inputArr: BarProps[]) => {
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
      let key = inputArr[i].height;
      let j = i - 1;
      while (j >= 0 && inputArr[j].height > key) {
        inputArr[j + 1].height = inputArr[j].height;
        j = j - 1;
        renders++;
      }
      inputArr[j + 1].height = key;
    }
    return inputArr;
  };

  switch (sortType) {
    case "":
      renderArray = tempArray;
      break;
    case "Quick":
      renderArray = quickSort(tempArray, 0, num - 1);
      break;
    case "Bubble":
      renderArray = bubbleSort(tempArray);
      break;
    case "Insertion":
      renderArray = insertionSort(tempArray);
      break;
    case "JS":
      renderArray = tempArray.sort((a, b) => {
        renders++;
        if (a.height >= b.height) return 0;
        else if (b.height > a.height) return -1;
        else return 1;
      });
      break;
    default:
      renderArray = tempArray;
      break;
  }

  let Bar = ({ height, width, index }: BarProps) => (
    <div
      style={{
        width: `${width * 12}vw`,
        height: `${height}vh`,
      }}
      className={`flex-col bg-green-900 mr-1 px-1 text-center text-white`}
      key={index}
    >
      <div id="index">{index + 1}</div>
      <div id="height">{height}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-400">
      <header className="py-4 px-8 mb-8 bg-gray-500">
        <div className="flex flex-row justify-between">
          <div className="flex-col">
            <a href="/">Home</a>
          </div>
          <div className="flex-col">
            <div className="flex flex-row space-x-4">
              <div className="px-1">
                <button
                  className="border border-black active:bg-blue-500 rounded-2xl px-4"
                  onClick={() => setSortType("None")}
                >
                  None
                </button>
              </div>
              <div className="px-1">
                <button
                  className="border border-black active:bg-blue-500 rounded-2xl px-4"
                  onClick={() => setSortType("Bubble")}
                >
                  Bubble
                </button>
              </div>
              <div className="px-1">
                <button
                  className="border border-black active:bg-blue-500 rounded-2xl px-4"
                  onClick={() => setSortType("Insertion")}
                >
                  Insertion
                </button>
              </div>
              <div className="px-1">
                <button
                  className="border border-black active:bg-blue-500 rounded-2xl px-4"
                  onClick={() => setSortType("Quick")}
                >
                  Quick
                </button>
              </div>
              <div className="px-1">
                <button
                  className="border border-black active:bg-blue-500 rounded-2xl px-4"
                  onClick={() => setSortType("JS")}
                >
                  JS
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="flex-col py-4">
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="num">
              Bars:
              <input
                className="mx-2 px-4 bg-gray-300 rounded-lg"
                type="number"
                name="bars"
                id="bars"
                step={1}
                value={num}
                onChange={(event) => setNum(parseInt(event.target.value))}
                min={10}
                max={150}
              />
            </label>
          </form>
        </div>

        <div className="flex flex-row justify-between">{renderArray?.map((bar) => Bar(bar))}</div>
        {sortType !== "None" && (
          <p>
            {sortType} Sort would take {renders} iterations to sort.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
