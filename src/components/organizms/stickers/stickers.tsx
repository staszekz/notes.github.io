export const Stickers = ({ data, Component }) => {
  return data.map(note => {
    return <Component data={note} />;
  });
};
