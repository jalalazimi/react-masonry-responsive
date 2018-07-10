import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Masonry, MasonryItem } from "../";

storiesOf("Masonry", module)
  .add("Example", () => {
    return <Masonry minColumnWidth={128} items={generateItems(50)} />;
  })
  .add("Custom gap", () => {
    return <Masonry gap={96} minColumnWidth={200} items={generateItems(50)} />;
  })
  .add("Wide column width", () => {
    return <Masonry minColumnWidth={400} items={generateItems(50)} />;
  })
  .add("Server-side rendering", () => {
    return (
      <div style={{ margin: "0 auto", maxWidth: 800 }}>
        <Masonry containerWidth={800} minColumnWidth={256} items={generateItems(50)} />
      </div>
    );
  })
  .add("Items changing", () => {
    interface State {
      items: MasonryItem[];
    }

    class Example extends React.PureComponent<{}, State> {
      public state: State = {
        items: generateItems(25)
      };

      public componentDidMount() {
        window.setInterval(() => {
          this.setState({ items: generateItems(25) });
        }, 1000);
      }

      public render() {
        return <Masonry minColumnWidth={256} items={this.state.items} />;
      }
    }

    return <Example />;
  })
  .add("Lots of items", () => {
    return <Masonry minColumnWidth={128} items={generateItems(1000)} />;
  });

function generateItems(count: number) {
  const items: MasonryItem[] = [];

  for (let step = 1; step < count + 1; step++) {
    items.push({ key: step, node: <Box id={step} /> });
  }

  return items;
}

function Box(props: { id: number }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "4px",
        boxShadow: "0 0 0 1px rgba(36, 18, 77, .1), 0 2px 4px -2px rgba(36, 18, 77, .2)",
        color: "#24124d",
        lineHeight: "24px",
        padding: "24px",
        width: "100%"
      }}
    >
      <p>
        <b>{props.id}</b>
      </p>
      <p>{randomSentence()}</p>
    </div>
  );
}

function randomSentence() {
  const words = [
    "the sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    "all",
    "this happened",
    "more or less",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    "it",
    "was",
    "a pleasure",
    "to",
    "burn"
  ];
  const text = [];

  let x = 0;
  while (x < 20) {
    text.push(words[Math.floor(Math.random() * words.length)]);
    x++;
  }

  return text.join(" ");
}
