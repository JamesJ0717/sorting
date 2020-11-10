import React, { useCallback, useState } from "react";

type BarProps = {
  height: number;
  width: number;
  index: number;
};

function App() {
  const [num, setNum] = useState(25);
  const [sortType, setSortType] = useState("");

  const Header = () => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNum(parseInt(event.target.value));
    };
    const slider = (
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="num">
          Bars:
          <input
            className="mx-2 w-3/4"
            type="number"
            name="bars"
            id="bars"
            value={num}
            onChange={handleChange}
            min={10}
            max={150}
          />
        </label>
      </form>
    );
    return (
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
            </div>
          </div>
          <div className="flex-col">{slider}</div>
          <div className="">
            <a href="/about">About</a>
          </div>
        </div>
      </header>
    );
  };

  const Cols = (): JSX.Element => {
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

    let quickSort = useCallback((array: BarProps[], left: number, right: number) => {
      let index;

      if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
          quickSort(array, left, index - 1);
        }

        if (index < right) {
          quickSort(array, index, right);
        }
      }

      return array;
    }, []);

    let bubbleSort = (inputArr: BarProps[]) => {
      let len = inputArr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
          if (inputArr[j].height > inputArr[j + 1].height) {
            let tmp = inputArr[j];
            inputArr[j] = inputArr[j + 1];
            inputArr[j + 1] = tmp;
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
        }
        inputArr[j + 1].height = key;
      }
      return inputArr;
    };

    switch (sortType) {
      case "":
        return <div className="flex flex-row justify-between">{tempArray.map((bar) => Bar(bar))}</div>;
      case "Quick":
        return (
          <div className="flex flex-row justify-between">{quickSort(tempArray, 0, num - 1).map((bar) => Bar(bar))}</div>
        );
      case "Bubble":
        return <div className="flex flex-row justify-between">{bubbleSort(tempArray).map((bar) => Bar(bar))}</div>;
      case "Insertion":
        return <div className="flex flex-row justify-between">{insertionSort(tempArray).map((bar) => Bar(bar))}</div>;
      default:
        return <div className="flex flex-row justify-between">{tempArray.map((bar) => Bar(bar))}</div>;
    }
  };

  const Bar = ({ height, width, index }: BarProps) => (
    <div
      style={{
        width: `${width * 12}vw`,
        height: `${height}vh`,
      }}
      className={`flex-col bg-green-900 border-green-900 mr-1 text-center text-white`}
      key={index}
    >
      <div id="index">{index}</div>
      <div id="height">{height}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-400">
      <Header />
      <div className="container">
        <p className=""></p>
        <Cols />
      </div>
    </div>
  );
}

export default App;
