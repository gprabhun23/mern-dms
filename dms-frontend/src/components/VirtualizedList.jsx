import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => {
  return (
    <List height={400} width="100%" itemSize={35} itemCount={items.length}>
      {({ index, style }) => (
        <div style={style}>
          {items[index].title}
        </div>
      )}
    </List>
  );
};

export default VirtualizedList;
